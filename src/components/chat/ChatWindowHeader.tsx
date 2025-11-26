
import { useContext, useEffect, useState } from "react";
import { socketContext } from "@/contexts/SocketContext";

interface Chat {
  id: string;
  name: string;
  avatar?: string | null; 
  online?: boolean;
}

interface ChatWindowHeaderProps {
  chat: Chat;
}

export default function ChatWindowHeader({ chat }: ChatWindowHeaderProps) {
  const socketio = useContext(socketContext);
  const [isOnline, setIsOnline] = useState(false);
  const [imageError, setImageError] = useState(false);


  useEffect(() => {
    const handler = (users: string[][]) => {
      const onlineIds = new Set(users.map(([userId]) => userId));
      setIsOnline(onlineIds.has(chat.id));
    };

    socketio.on("online-users", handler);

    return () => {
      socketio.off("online-users", handler);
    };
  }, [socketio, chat.id]);

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const hasValidAvatar = chat.avatar && !imageError;

  return (
    <div className="p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        {/* Avatar with Fallback */}
        <div className="relative flex-shrink-0">
          {hasValidAvatar ? (
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-background shadow-md"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ring-2 ring-background"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              {getInitials(chat.name)}
            </div>
          )}


          {isOnline && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-4 border-background shadow-lg animate-pulse" />
          )}
        </div>

    
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-foreground text-lg truncate">
            {chat.name}
          </h2>
          <p className="text-sm flex items-center gap-1.5">
            {isOnline ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-green-600 font-medium">Active now</span>
              </>
            ) : (
              <span className="text-muted-foreground">Away</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}