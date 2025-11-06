import { useSelector } from "react-redux";
import { getCurrentUserDetails } from "@/utils/helpers/get-current-user";
import type { IClient, IVendor } from "@/types/User";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";

interface MessageBubbleProps {
  message: {
    senderId: string;
    content: string;
    messageType: "text" | "image" | "video";
    mediaUrl: string;
    timestamp?: Date;
    createdAt?: Date | string;
  };
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const user: IClient | IVendor | null = useSelector(getCurrentUserDetails);
  const senderId = user?._id;
  const isOwn = message.senderId === senderId;

  const timestamp = message.timestamp || message.createdAt;
  const timestampDate = timestamp ? new Date(timestamp) : new Date();

  if (message.messageType === "image" && message.mediaUrl) {
    return (
      <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
        <div className="max-w-md">
          <img
            src={getCloudinaryImageUrl(message.mediaUrl)}
            alt={message.content || "Image"}
            className={`rounded-lg max-w-full h-auto ${isOwn ? "rounded-br-none" : "rounded-bl-none"}`}
          />
          <p
            className={`text-xs text-muted-foreground mt-1 ${
              isOwn ? "text-left" : "text-right"
            }`}
          >
            {timestampDate.toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div className="max-w-xs lg:max-w-md">
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-foreground rounded-bl-none"
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
        <p
          className={`text-xs text-muted-foreground mt-1 ${
            isOwn ? "text-right" : "text-left"
          }`}
        >
          {timestampDate.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}