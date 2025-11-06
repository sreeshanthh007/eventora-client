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

  const handleSend = () => {
    if (inputValue.trim()) {
      const message: Message = {
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
      socketio.emit("direct-chat:send-message", message);
      setMessages((prev) => [...prev, message]);
      setInputValue("");
    }
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
        const message: Message = {
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
        socketio.emit("direct-chat:send-message", message);
        setMessages((prev) => [...prev, message]);
      } else {
        alert("Failed to upload file");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    setMessages([...message]);
  }, [message]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    socketio.emit("direct-chat:join-room", chat.roomId);
    socketio.on("direct-chat:receive-message", (data: Message) => {
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-background overflow-scroll sm:flex">
      {/* Header */}
      <ChatWindowHeader chat={chat} />
      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.messageId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MessageBubble message={message} />
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
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
            className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
          >
            {uploading ? "..." : "+"}
          </Button>
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-full bg-muted text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-semibold transition-colors"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}