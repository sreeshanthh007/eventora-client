
import { useState } from "react"
import { Button } from "@/components/pages/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/pages/ui/dialog"
import { AlertCircle } from "lucide-react"

interface CancellationPolicyModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  ticketId?: string
}

export function TicketCancellationPolicyModal({ isOpen, onClose, onConfirm, ticketId }: CancellationPolicyModalProps) {
  const [isAgreed, setIsAgreed] = useState(false)

  const handleConfirm = () => {
    if (isAgreed) {
      onConfirm()
      setIsAgreed(false)
    }
  }

  const handleClose = () => {
    setIsAgreed(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <DialogTitle>Cancellation Policy</DialogTitle>
          </div>
          <DialogDescription>Please review the cancellation policy before proceeding</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-semibold text-foreground mb-3">Refund Policy Details:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>50% Refund:</strong> Only 50% of the ticket price will be credited back to your account
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>Processing Time:</strong> Refunds will be processed within 5-7 business days
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>Non-Refundable Fees:</strong> ticket Booking fees are non-refundable
                </span>
              </li>
              {/* <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>Cancellation Deadline:</strong> Cancellations must be made at least 24 hours before the event
                </span>
              </li> */}
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>No Re-booking:</strong> Cancelled tickets cannot be re-booked for the same event
                </span>
              </li>
            </ul>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
            <input
              type="checkbox"
              id="agree"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer"
            />
            <label htmlFor="agree" className="text-sm cursor-pointer">
              I understand and agree to the cancellation policy. I confirm that I want to cancel this ticket.
            </label>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={!isAgreed}>
            Yes, I Agree
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
