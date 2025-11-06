import Chat from "@/components/chat/Chat";
import { GetAllChatsOfClients } from "@/hooks/client/UseGetChatsOfClient";

  function ChatPage() {
    const { data: queryData, isLoading: chatsIsLoading } = GetAllChatsOfClients()

    return <Chat chatsIsLoading={chatsIsLoading} queryData={queryData} role="client"/>;
  }

  export default ChatPage;
