import { motion } from "framer-motion"

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

interface ChatListItemProps {
  chat: Chat
  isSelected: boolean
  onSelect: () => void
}

export default function ChatListItem({ chat, isSelected, onSelect }: ChatListItemProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={`w-full p-3 rounded-lg mb-1 transition-colors text-left ${
        isSelected ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-muted"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar with online indicator */}
        <div className="relative flex-shrink-0">
          <img 
            src={chat.avatar} 
            alt={chat.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {chat.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
          )}
        </div>

        {/* Chat info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{chat.timestamp}</span>
          </div>
          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
        </div>

        {/* Unread badge */}
        {chat.unread > 0 && (
          <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
            {chat.unread}
          </div>
        )}
      </div>
    </motion.button>
  )
}