// ChatWindowHeader.tsx
import { useContext, useEffect, useState } from "react";
import { socketContext } from "@/contexts/SocketContext";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  online?: boolean; // optional for now
}

interface ChatWindowHeaderProps {
  chat: Chat;
}

export default function ChatWindowHeader({ chat }: ChatWindowHeaderProps) {
  const socketio = useContext(socketContext);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const handler = (users: string[][]) => {
      const onlineIds = new Set(users.map(([userId]) => userId));
      setIsOnline(onlineIds.has(chat.id));
    };

    socketio.on("online-users", handler);

    // Optional: trigger once on mount
    socketio.emit("get-online-users");

    return () => {
      socketio.off("online-users", handler);
    };
  }, [socketio, chat.id]);

  return (
    <div className="p-4 border-b border-border flex items-center justify-between bg-background">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-foreground">{chat.name}</h2>
          <p className="text-sm text-muted-foreground">
            {isOnline ? "Active now" : "Away"}
          </p>
        </div>
      </div>
    </div>
  );
}