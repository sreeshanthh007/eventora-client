import { getClientChatbyChatId } from "@/services/client/ClientServices";
import { getVendorChatByChatId } from "@/services/vendor/VendorServices";
import type { UserRole } from "@/types/UserRoles";
import { useQuery } from "@tanstack/react-query";

export const useGetClientChatByChatId = (
  userId: string,
  role: UserRole,
  chatId?: string
) => {
  return useQuery({
    queryKey: ["get-client-chat-chatId", userId, chatId],
    queryFn: () =>
      role === "client"
        ? getClientChatbyChatId({ userId, chatId })
        : getVendorChatByChatId({ userId: userId, chatId: chatId }),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
