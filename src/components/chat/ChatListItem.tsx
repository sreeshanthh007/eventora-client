import { motion } from "framer-motion"
import { useState } from "react"

interface Chat {
  id: string
  name: string
  avatar?: string | null
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
  const [imgError, setImgError] = useState(false)

  const hasValidAvatar = chat.avatar && !imgError

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  return (
    <motion.button
      onClick={onSelect}
      className={`w-full p-3 rounded-lg mb-1 transition-all text-left flex items-center gap-3 ${
        isSelected 
          ? "bg-blue-50 hover:bg-blue-100 border border-blue-200" 
          : "hover:bg-muted border border-transparent"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
   
      <div className="relative flex-shrink-0">
        {hasValidAvatar ? (
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-background"
            onError={() => setImgError(true)}
          />
        ) : (
    
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-background shadow-md">
            {getInitials(chat.name)}
          </div>

 
        )}

        {chat.online && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-3 border-background shadow-lg" />
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground truncate pr-2">
            {chat.name}
          </h3>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {chat.timestamp}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {chat.lastMessage}
        </p>
      </div>

      {/* Unread Count Badge */}
      {chat.unread > 0 && (
        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-md">
          {chat.unread > 99 ? "99+" : chat.unread}
        </div>
      )}
    </motion.button>
  )
}