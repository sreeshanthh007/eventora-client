// components/chat/ChatWindow.tsx
import type React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { ScrollArea } from "@/components/pages/ui/scroll-area";
import ChatWindowHeader from "./ChatWindowHeader";
import MessageBubble from "./MessageBubble";
import { motion } from "framer-motion";
import { socketContext } from "@/contexts/SocketContext";
import { generateUniqueId } from "@/utils/helpers/generate-unique-id";
import { useSelector } from "react-redux";
import { getCurrentUserDetails } from "@/utils/helpers/get-current-user";
import type { IClient, IVendor } from "@/types/User";
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary";

interface Chat {
  id: string;
  name: string;
  roomId: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

export interface Message {
  messageId: string;
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  messageType: "text" | "image" | "video";
  content: string;
  mediaUrl: string;
  status: "sent" | "delivered" | "read";
  timestamp: Date;
  createdAt?: Date;
}

interface ChatWindowProps {
  chat: Chat;
  message: Message[];
}

export default function ChatWindow({ chat, message }: ChatWindowProps) {
  const user: IClient | IVendor | null = useSelector(getCurrentUserDetails);
  const senderId = user?._id;
  const [inputValue, setInputValue] = useState("");
  const socketio = useContext(socketContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load initial messages
  useEffect(() => {
    setMessages([...message]);
  }, [message]);

  // Join room & listen for new messages
  useEffect(() => {
    socketio.emit("direct-chat:join-room", chat.roomId);

    const handleNewMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    socketio.on("direct-chat:receive-message", handleNewMessage);

    return () => {
      socketio.off("direct-chat:receive-message", handleNewMessage);
      socketio.emit("direct-chat:leave-room", chat.roomId);
    };
  }, [chat.roomId, socketio]);


  useEffect(() => {
  const handler = (onlineUsers: string[]) => {
  
  };

  socketio.on("online-users", handler);

  return () => {
    socketio.off("online-users", handler);
  };
}, []);


  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      chatRoomId: chat.roomId,
      content: inputValue,
      mediaUrl: "",
      messageId: generateUniqueId("direct-message"),
      messageType: "text",
      receiverId: chat.id,
      senderId: senderId!,
      status: "sent",
      timestamp: new Date(),
    };

    socketio.emit("direct-chat:send-message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      alert("Please select an image or video file");
      return;
    }

    setUploading(true);
    try {
      const folder = "chat-media";
      const publicId = await uploadImageToCloudinarySigned(file, folder);

      if (publicId) {
        const newMessage: Message = {
          chatRoomId: chat.roomId,
          content: "",
          mediaUrl: publicId,
          messageId: generateUniqueId("direct-message"),
          messageType: isImage ? "image" : "video",
          receiverId: chat.id,
          senderId: senderId!,
          status: "sent",
          timestamp: new Date(),
        };

        socketio.emit("direct-chat:send-message", newMessage);
        setMessages((prev) => [...prev, newMessage]);
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <ChatWindowHeader chat={chat} />
      </div>

      {/* Scrollable Messages */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto w-full">
          {messages.map((msg) => (
            <motion.div
              key={msg.messageId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageBubble message={msg} />
            </motion.div>
          ))}
          {/* Anchor for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            variant="outline"
            size="icon"
            className="rounded-full shrink-0"
          >
            {uploading ? (
              <span className="text-xs">...</span>
            ) : (
              <span className="text-2xl">+</span>
            )}
          </Button>

          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 rounded-full bg-muted"
          />

          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || uploading}
            className="rounded-full px-6 font-semibold"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}