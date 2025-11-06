import { axiosInstance } from "@/api/interceptor";



export const useChatApi = (role: "client" | "vendor") => {
  const basePath = `/${role}`;

  return {
    getAllChats: async () => {
      const { data } = await axiosInstance.get(`${basePath}/chats`);
      return data.chats;
    },
    getChatById: async (chatId: string, userId: string) => {
      const { data } = await axiosInstance.get(`${basePath}/chat`, {
        params: { chatId, userId },
      });
      return data.chat;
    },
  };
};