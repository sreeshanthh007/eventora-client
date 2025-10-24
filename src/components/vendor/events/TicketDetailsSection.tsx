import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Button } from "@/components/pages/ui/button"
import { Badge } from "@/components/pages/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface Ticket {
  name: string;
  email: string;
  qrCode: string;
  ticketId: string;
  ticketType: string;
  isCheckedIn: boolean;
}

interface TicketDetailsSectionProps {
  tickets: Ticket[];
  onOpenModal: (ticket: Ticket) => void;
}

export function VerifyAttendiesTicketDetailsSection({ 
  tickets, 
  onOpenModal 
}: TicketDetailsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket Details</CardTitle>
        <CardDescription>Manage and verify attendee tickets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Ticket Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => {
                const status = ticket.isCheckedIn ? "verified" : "pending";
                return (
                  <tr key={ticket.ticketId} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground">{ticket.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{ticket.email}</td>
                    <td className="py-3 px-4 text-foreground">{ticket.ticketType}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={status === "verified" ? "default" : "secondary"}
                        className="flex w-fit items-center gap-1"
                      >
                        {status === "verified" && <CheckCircle2 className="h-3 w-3" />}
                        <span className="capitalize">{status}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {ticket.isCheckedIn ? (
                        <span className="text-sm text-muted-foreground">Verified</span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => onOpenModal(ticket)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Verify Ticket
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}