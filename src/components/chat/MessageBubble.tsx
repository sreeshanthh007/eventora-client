"use client"

interface Message {
  id: number
  text: string
  sent: boolean
  timestamp: string
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs lg:max-w-md`}>
        <div
          className={`rounded-2xl px-4 py-2 ${
            message.sent
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-foreground rounded-bl-none"
          }`}
        >
          <p className="text-sm break-words">{message.text}</p>
        </div>
        <p className={`text-xs text-muted-foreground mt-1 ${message.sent ? "text-right" : "text-left"}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  )
}
