


export interface IUserPreview {
  userId: string;
  name: string;
  profileImage?: string;
  role?: "client" | "vendor";
}

export interface IDirectChatPreview {
  chatRoomId: string;
  user: IUserPreview;
  lastMessage: {
    senderId: string;
    content: string | null;
    mediaUrl?: string;
    messageType: "text" | "image" | "video";
    timestamp: Date;
  };
  unreadCount: number;
}



export interface IDirectMessage{
  messageId: string;
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  messageType: "text" | "image" | "video";
  content: string | null;
  mediaUrl?: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}


export interface IDirectChat {
  chatRoomId: string;
  participant: IUserPreview;
  messages: IDirectMessage[];
}