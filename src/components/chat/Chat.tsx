import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";
import ChatSidebar from "@/components/chat/ChatSideBar";
import ChatWindow, { type Message } from "@/components/chat/ChatWindow";
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs";
import { useGetClientChatByChatId } from "@/hooks/client/UseGetClientChatByChatId";
import type { UserRole } from "@/types/UserRoles";
import { socketContext } from "@/contexts/SocketContext";

interface ChatProps {
  queryData: any;
  chatsIsLoading: boolean;
  role: UserRole;
}

export default function Chat({ queryData, chatsIsLoading, role }: ChatProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const socketio = useContext(socketContext)
  const [messages, setMessages] = useState<Message[]>([]);
  console.log("query data ", queryData);

  const chats =
    !chatsIsLoading && queryData?.success && queryData.chats
      ? queryData.chats.map((chat) => ({
          roomId: chat.chatRoomId,
          id: role === "client" ? chat.vendorId : chat.clientId,
          name:
            role === "client"
              ? chat.vendorDetails.name
              : chat.clientDetails.name,
          avatar: getCloudinaryImageUrl(
            role === "client"
              ? chat.vendorDetails.profilePicture
              : chat.clientDetails.profileImage
          ),
          lastMessage: "",
          timestamp: new Date(chat.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          unread: 0,
          online: false,
        }))
      : [];

  const userIdFromUrl = searchParams.get("userId");
  const { data } = useGetClientChatByChatId(userIdFromUrl!, role);

  useEffect(() => {
    setMessages(data?.chat?.messages || []);
  }, [data]);

  useEffect(() => {
    if (userIdFromUrl && userIdFromUrl !== selectedChatId) {
      setSelectedChatId(userIdFromUrl);
  
    }
  }, [userIdFromUrl, selectedChatId]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);



  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

      useEffect(() => {
      const handler = (onlineUsers: string[]) => {
      
      };
    
      socketio.on("online-users", handler);
    
      return () => {
        socketio.off("online-users", handler);
      };
    }, []);

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setSearchParams({ userId: id });
  };

  

return (
  <div className="flex flex-col h-screen bg-background">
    <div className="px-6 py-4 border-b border-border flex-shrink-0">
      <Breadcrumbs role={role} />
    </div>

    <div className="flex flex-1 overflow-hidden">
      <ChatSidebar
        chats={chatsIsLoading ? [] : filteredChats}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {selectedChat && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow chat={selectedChat} message={messages} />
        </div>
      )}
    </div>
  </div>
);
}