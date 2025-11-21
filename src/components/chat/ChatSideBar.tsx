import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/pages/ui/input";
import { ScrollArea } from "@/components/pages/ui/scroll-area";
import ChatListItem from "./ChatListItem";
import { motion } from "framer-motion";
import { socketContext } from "@/contexts/SocketContext";

// Define the types (you already have this somewhere, just make sure it's imported or defined)
interface Chat {
  roomId?: string;
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ChatSidebar({
  chats,
  selectedChatId,
  onSelectChat,
  searchQuery,
  onSearchChange,
}: ChatSidebarProps) {
  const socketio = useContext(socketContext);
  const [onlineUserIds, setOnlineUserIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handler = (users: string[][]) => {
      const ids = new Set(users.map(([userId]) => userId));
      setOnlineUserIds(ids);
    };

    socketio.on("online-users", handler);

    return () => {
      socketio.off("online-users", handler);
    };
  }, [socketio]);

  return (
    <div className="w-full sm:w-80 md:w-96 flex flex-col bg-background border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-muted text-foreground placeholder:text-muted-foreground rounded-full"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {chats.length > 0 ? (
            chats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ChatListItem
                  chat={{
                    ...chat,
                    online: onlineUserIds.has(chat.id), // Real-time online status
                  }}
                  isSelected={chat.id === selectedChatId}
                  onSelect={() => onSelectChat(chat.id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No conversations found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}