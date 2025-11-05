import { useToast } from "@/hooks/ui/UseToaster";
import type { IDirectChat, IDirectChatPreview, IDirectMessage } from "@/types/chat";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSocket } from "./SocketContext";
import { generateUniqueId } from "@/utils/helpers/generate-unique-id";
import { useSelector } from "react-redux";
import { getCurrentUserDetails } from "@/utils/helpers/get-current-user";
import type { IClient, IVendor } from "@/types/User";



type ChatContextType = {
  currentChat: IDirectChat | null;
  messages: IDirectMessage[];
  allChats: IDirectChatPreview[];
  setCurrentChat: (chat: IDirectChat) => void;
  setAllChats: (chats: IDirectChatPreview[]) => void;
  sendMessage: (content: string, mediaUrl?: string, messageType?: "text" | "image" | "video") => void;
  markChatAsRead: (chatRoomId: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { showToast } = useToast();
  const socket = useSocket();
  const user: IClient | IVendor | null = useSelector(getCurrentUserDetails);

  const [currentChat, setCurrentChatData] = useState<IDirectChat | null>(null);
  const [messages, setMessages] = useState<IDirectMessage[]>([]);
  const [allChats, setAllChatsData] = useState<IDirectChatPreview[]>([]);

  const currentChatRef = useRef<IDirectChat | null>(null);
  const messagesRef = useRef<IDirectMessage[]>([]);
  const allChatsRef = useRef<IDirectChatPreview[]>([]);

  useEffect(() => { currentChatRef.current = currentChat }, [currentChat]);
  useEffect(() => { messagesRef.current = messages }, [messages]);
  useEffect(() => { allChatsRef.current = allChats }, [allChats]);

  // Socket event handlers  
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage: IDirectMessage) => {
      // Add to messages if current chat
      if (currentChatRef.current && newMessage.chatRoomId === currentChatRef.current.chatRoomId) {
        if (!messagesRef.current.find(msg => msg.messageId === newMessage.messageId)) {
          setMessages(prev => [...prev, newMessage]);
        }
      } else {
        showToast(`New message from ${newMessage.senderId}: ${newMessage.content}`, "success");
      }

      // Update allChats lastMessage and unread count
      if (allChatsRef.current.length > 0) {
        setAllChatsData(prevChats => {
          const chatsArray = [...prevChats];
          const chatIndex = chatsArray.findIndex(chat => chat.chatRoomId === newMessage.chatRoomId);
          if (chatIndex > -1) {
            const updatedChat = chatsArray.splice(chatIndex, 1)[0];
            const chatWithNewMessage: IDirectChatPreview = {
              ...updatedChat,
              lastMessage: {
                senderId: newMessage.senderId,
                content: newMessage.content,
                messageType: newMessage.messageType,
                timestamp: newMessage.timestamp,
                mediaUrl: newMessage.mediaUrl,
              },
              unreadCount: currentChatRef.current?.chatRoomId === newMessage.chatRoomId ? 0 : updatedChat.unreadCount + 1
            };
            return [chatWithNewMessage, ...chatsArray];
          }
          return chatsArray;
        });
      }
    };

    const handleMarkAsRead = (chatRoomId: string) => {
      if (currentChatRef.current && currentChatRef.current.chatRoomId === chatRoomId) {
        setAllChatsData(prevChats =>
          prevChats.map(chat =>
            chat.chatRoomId === chatRoomId ? { ...chat, unreadCount: 0 } : chat
          )
        );
      }
    };

    socket.on("direct-chat:receive-message", handleReceiveMessage);
    socket.on("direct-chat:mark-as-read", handleMarkAsRead);

    return () => {
      socket.off("direct-chat:receive-message", handleReceiveMessage);
      socket.off("direct-chat:mark-as-read", handleMarkAsRead);
    };
  }, [socket]);

  // Send message
  const sendMessage = (content: string, mediaUrl?: string, messageType: "text" | "image" | "video" = "text") => {
    if (!socket || !currentChat || !user) return;

    const newMessage: IDirectMessage = {
      messageId: generateUniqueId("direct-message"),
      chatRoomId: currentChat.chatRoomId,
      senderId: user._id!,
      receiverId: currentChat.participant.userId,
      content,
      messageType,
      mediaUrl,
      timestamp: new Date(),
      status: "sent"
    };

    socket.emit("direct-chat:send-message", newMessage);
    setMessages(prev => [...prev, newMessage]);
  };

  const setCurrentChat = (chat: IDirectChat) => {
    setCurrentChatData(chat);
    setMessages(chat.messages || []);
  };

  const setAllChats = (chats: IDirectChatPreview[]) => setAllChatsData(chats);

  const markChatAsRead = (chatRoomId: string) => {
    socket?.emit("direct-chat:mark-as-read", chatRoomId);
    setAllChatsData(prevChats =>
      prevChats.map(chat => chat.chatRoomId === chatRoomId ? { ...chat, unreadCount: 0 } : chat)
    );
  };

  return (
    <ChatContext.Provider value={{
      currentChat,
      messages,
      allChats,
      setCurrentChat,
      setAllChats,
      sendMessage,
      markChatAsRead
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used inside ChatProvider");
  return context;
};