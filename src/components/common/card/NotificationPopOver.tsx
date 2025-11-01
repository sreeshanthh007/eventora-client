

import { Popover , PopoverTrigger,PopoverContent } from "@/components/pages/ui/popover"
import { Button } from "@/components/pages/ui/button"
import { Bell } from "lucide-react"
import { useState } from "react"
import { useGetClientNotificaton } from "@/hooks/client/UseGetClientNotifications"
import { formatNotificaionTime } from "@/utils/helpers/ConvertNotificationTIme"



export const NotificationPopover: React.FC = () => {
  const [notificationOpen, setNotificationOpen] = useState(false)

 
const { data: queryData, isLoading, error } = useGetClientNotificaton()



  const notifications = queryData?.notification?.map((notif: any) => ({
    id: notif.notificationId,
    message: notif.message, 
    time: formatNotificaionTime(notif.createdAt),
    isRead: notif.isRead,
  })) || []

  const unreadCount = notifications.filter((n: any) => !n.isRead).length

  return (
    <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-gray-200">
        <div className="bg-white rounded-md">
          <div className="border-b border-gray-200 px-4 py-3">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500">Loading notifications...</p>
              </div>
            ) : error ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500">Failed to load notifications</p>
              </div>
            ) : notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification: any) => (
                  <li
                    key={notification.id}
                    className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  >
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-500">No notifications</p>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}