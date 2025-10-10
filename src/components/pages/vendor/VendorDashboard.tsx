import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { Button } from "@/components/pages/ui/button"
import { Calendar, Clock, CheckCircle, XCircle, BarChart3, Settings, FileText, User } from "lucide-react"

export function VendorDashboard() {

  const eventMetrics = {
    total: 156,
    ongoing: 23,
    completed: 118,
    cancelled: 15,
  }

  const recentEvents = [
    { id: 1, name: "Tech Conference 2024", status: "ongoing", date: "2024-01-15" },
    { id: 2, name: "Marketing Summit", status: "completed", date: "2024-01-10" },
    { id: 3, name: "Product Launch", status: "cancelled", date: "2024-01-20" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">VendorHub</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">John Vendor</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Manage Events
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-3xl font-bold text-foreground text-balance">Event Dashboard</h2>
              <p className="text-muted-foreground mt-2">Monitor and manage your event portfolio</p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Events */}
              <Card className="hover:shadow-md transition-shadow border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-chart-1" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-1">{eventMetrics.total}</div>
                  <p className="text-xs text-muted-foreground">All time events</p>
                </CardContent>
              </Card>

              {/* Ongoing Events */}
              <Card className="hover:shadow-md transition-shadow border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Ongoing Events</CardTitle>
                  <Clock className="h-4 w-4 text-chart-2" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-2">{eventMetrics.ongoing}</div>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>

              {/* Completed Events */}
              <Card className="hover:shadow-md transition-shadow border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Completed Events</CardTitle>
                  <CheckCircle className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">{eventMetrics.completed}</div>
                  <p className="text-xs text-muted-foreground">Successfully finished</p>
                </CardContent>
              </Card>

              {/* Cancelled Events */}
              <Card className="hover:shadow-md transition-shadow border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Cancelled Events</CardTitle>
                  <XCircle className="h-4 w-4 text-chart-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-4">{eventMetrics.cancelled}</div>
                  <p className="text-xs text-muted-foreground">Cancelled or postponed</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Events */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-card flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{event.name}</h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          event.status === "ongoing"
                            ? "default"
                            : event.status === "completed"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          event.status === "ongoing"
                            ? "bg-chart-2 text-white"
                            : event.status === "completed"
                              ? "bg-chart-3 text-white"
                              : "bg-chart-4 text-white"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Calendar className="h-4 w-4 mr-2" />
                    Create New Event
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
