

import Chat from '@/components/chat/Chat'
import { GetChatsOfVendor } from '@/hooks/vendor/UseGetChatsOfVendor'

const ChatPage = () => {
      const { data: queryData, isLoading: chatsIsLoading } = GetChatsOfVendor()
  console.log("vendor chat data",queryData)
  return (
    <Chat queryData={queryData} chatsIsLoading={chatsIsLoading}role='vendor'/>
  )
}

export default ChatPage