
import { Bell } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { SidebarTrigger } from "@/components/pages/ui/sidebar"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"

export function VendorHeader() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const notifications = [
    {
      id: 1,
      title: "New Event Booking",
      message: "You have a new booking for Wedding Photography",
      time: "2 hours ago",
      unread: true,
    },

  ]

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl text-primary">EVENTORA</h1>
        </div>
        <div className="relative" ref={notificationRef}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 relative"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-4 w-4" />
            {notifications.filter((n) => n.unread).length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.filter((n) => n.unread).length}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>

          {isNotificationOpen && (
            <Card className="absolute right-0 top-12 w-80 shadow-lg border z-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer ${
                          notification.unread ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2"></div>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </header>
  )
}
