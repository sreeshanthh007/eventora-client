import { Popover, PopoverTrigger, PopoverContent } from "@/components/pages/ui/popover"

import { useAdminNotification } from "@/hooks/admin/UseGetAdminNotification"
import { formatNotificaionTime } from "@/utils/helpers/ConvertNotificationTIme"

interface AdminNotificationPopoverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const AdminNotificationPopover: React.FC<AdminNotificationPopoverProps> = ({
  open,
  onOpenChange
}) => {
  const { data: queryData, isLoading, error } = useAdminNotification()



  const notifications = queryData?.notification?.map((notif: any) => ({
    id: notif.notificationId,
    message: notif.message, 
    time: formatNotificaionTime(notif.createdAt),
    isRead: notif.isRead,
  })) || []

  const unreadCount = notifications.filter((n: any) => !n.isRead).length

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
  
        <button className="hidden" />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 border-gray-200">
        <div className="bg-white rounded-md">
          <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
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
                    className={`px-4 py-3 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
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