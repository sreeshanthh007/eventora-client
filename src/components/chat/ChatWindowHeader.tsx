

interface Chat {
  id: number
  name: string
  avatar: string
  online: boolean
}

interface ChatWindowHeaderProps {
  chat: Chat
}

export default function ChatWindowHeader({ chat }: ChatWindowHeaderProps) {
  return (
    <div className="p-4 border-b border-border flex items-center justify-between bg-background">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={chat.avatar}  
            alt={chat.name}    
            className="w-10 h-10 rounded-full object-cover"  
          />
          {chat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>
        <div>
          <h2 className="font-semibold text-foreground">{chat.name}</h2>
          <p className="text-sm text-muted-foreground">{chat.online ? "Active now" : "Away"}</p>
        </div>
      </div>
    </div>
  );
}