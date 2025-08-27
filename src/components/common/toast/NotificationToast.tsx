
import {  type FC } from "react";

interface NotificationToastProps {
  title: string;
  body: string;
}

export const NotificationToast: FC<NotificationToastProps> = ({ title, body }) => {
  return (
    <div className="flex items-center space-x-3">
      <img src="/EVENRORA.png" alt="icon" className="w-8 h-8" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-600">{body}</p>
      </div>
    </div>
  );
};


