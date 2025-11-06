import type React from "react"

import { useState } from "react"
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { ScrollArea } from "@/components/pages/ui/scroll-area"
import ChatWindowHeader from "./ChatWindowHeader"
import MessageBubble from "./MessageBubble"
import { motion } from "framer-motion"

interface Chat {
  id: string // Updated to string to match vendorId
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

interface Message {
  id: number
  text: string
  sent: boolean
  timestamp: string
}

interface ChatWindowProps {
  chat: Chat
  messages: Message[]
  onSendMessage: (text: string) => void
}

export default function ChatWindow({ chat, messages, onSendMessage }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-background hidden sm:flex">
      {/* Header */}
      <ChatWindowHeader chat={chat} />

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
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
  )
}