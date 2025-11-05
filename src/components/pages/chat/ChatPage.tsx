import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import ChatSidebar from "@/components/chat/ChatSideBar"
import ChatWindow from "@/components/chat/ChatWindow"
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { GetAllChatsOfClients } from "@/hooks/client/UseGetChatsOfClient"
import { useGetClientChatByChatId } from "@/hooks/client/UseGetClientChatByChatId"

const mockMessages = [
  {
    id: 1,
    text: "Hey! How are you doing?",
    sent: false,
    timestamp: "2:10 PM",
  },
  {
    id: 2,
    text: "I'm doing great! Just finished the project.",
    sent: true,
    timestamp: "2:11 PM",
  },
  {
    id: 3,
    text: "That sounds great! See you soon 😊",
    sent: false,
    timestamp: "2:15 PM",
  },
]

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState(mockMessages)
  const [searchQuery, setSearchQuery] = useState("")

  const { data: queryData, isLoading: chatsIsLoading } = GetAllChatsOfClients() 

  
  const chats = !chatsIsLoading && queryData?.success && queryData.chats ? queryData.chats.map((chat) => ({
    id: chat.vendorId,
    name: chat.vendorDetails.name,
    avatar: getCloudinaryImageUrl(chat.vendorDetails.profilePicture),
    lastMessage: "", 
    timestamp: new Date(chat.createdAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    unread: 0, 
    online: false, 
  })) : []
  

  const userIdFromUrl = searchParams.get("userId")
  useEffect(() => {
    if (userIdFromUrl && userIdFromUrl !== selectedChatId) {
      setSelectedChatId(userIdFromUrl)
    }
  }, [userIdFromUrl, selectedChatId])
  
  const selectedChat = chats.find((chat) => chat.id === selectedChatId)
  
  const {data} = useGetClientChatByChatId(userIdFromUrl!);
  
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id)
    setSearchParams({ userId: id })
  }

  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sent: true,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }
    setMessages([...messages, newMessage])
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="px-6 py-4 border-b border-border flex-shrink-0">
        <Breadcrumbs />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          chats={chatsIsLoading ? [] : filteredChats}
          selectedChatId={selectedChatId}
          onSelectChat={handleSelectChat}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {selectedChat && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatWindow chat={selectedChat} messages={messages} onSendMessage={handleSendMessage} />
          </div>
        )}
      </div>
    </div>
  )
}