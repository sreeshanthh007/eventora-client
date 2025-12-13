// Updated TicketDetailsModal.tsx (with Retry Payment button for failed payments)

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/pages/ui/dialog"
import { Button } from "@/components/pages/ui/button"
import { X, Calendar, Clock, Ticket, Mail, IndianRupee, AlertCircle, CreditCard } from "lucide-react"
import { formatDateForInput } from "@/utils/helpers/FormatDate"
import { formatTime } from "@/utils/helpers/FormatTIme"
import { TicketCancellationPolicyModal } from "../modals/TicketCancellationPolicyModal"
import { useCancelTicketMutation } from "@/hooks/client/UseCancelTicket"
// If you have a hook for retrying payment, import it here:
// import { useRetryPaymentMutation } from "@/hooks/client/UseRetryPayment"

interface EventSchedule {
  date: string
  startTime: string
  endTime: string
}

interface EventDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  schedule: EventSchedule[]
  ticketId: string
  eventId: string
  email: string
  amount: number
  ticketStatus: string
  paymentStatus: string
  onTicketCancelled?: () => void 
  // Optional: callback after successful retry if needed
  // onPaymentRetried?: () => void
}

export function TicketDetailsModal({
  isOpen,
  onClose,
  title,
  schedule,
  ticketId,
  eventId,
  email,
  amount,
  ticketStatus,
  paymentStatus,
  onTicketCancelled,
}: EventDetailsModalProps) {
  const [isCancellationOpen, setIsCancellationOpen] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isRetrying, setIsRetrying] = useState(false)
  const {mutate:cancelSelectedTicket}  = useCancelTicketMutation()

  // Add your retry payment mutation here if available
  // const { mutate: retryPayment } = useRetryPaymentMutation()

  const isCancellable = ticketStatus !== "refunded" && ticketStatus !== "used" && paymentStatus !== "failed"
  const isRetryable = paymentStatus === "failed"

  const cancelTicket = async (ticketId: string, eventId: string) => {
    setIsCancelling(true)
    try {
        cancelSelectedTicket({ticketId:ticketId,eventId:eventId})
      if (onTicketCancelled) {
        onTicketCancelled()
      }
      onClose()
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsCancelling(false)
    }
  }

  const handleCancelTicket = () => {
    setIsCancellationOpen(true)
  }

  const handleCancellationConfirm = async () => {
    await cancelTicket(ticketId, eventId)
    setIsCancellationOpen(false)
  }

  const handleCancellationClose = () => {
    setIsCancellationOpen(false)
  }

  // Placeholder for retry payment logic
  const handleRetryPayment = async () => {
    setIsRetrying(true)
    try {
      // Example: await retryPayment({ ticketId, eventId })
      // Or redirect to payment gateway, etc.
      console.log("Retrying payment for ticket:", ticketId)
      // If successful, you might close modal or refresh data
      // onClose()
    } catch (error) {
      // Handle error (e.g., show toast)
    } finally {
      setIsRetrying(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md border border-gray-200 bg-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="mt-1 text-sm text-gray-500">Event Ticket Details</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 text-gray-500 hover:text-gray-900">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Ticket Content */}
          <div className="space-y-5">
            <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 uppercase tracking-wide">
                <Ticket className="h-4 w-4" />
                <span className="font-semibold">Ticket ID</span>
              </div>
              <p className="font-mono text-sm font-semibold text-gray-900 break-all">{ticketId}</p>
            </div>

            {/* Event Schedule */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-700" />
                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Event Schedule</h3>
              </div>
              <div className="space-y-2 pl-7">
                {schedule.map((item, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-3 border border-gray-200">
                    <p className="font-medium text-gray-900 text-sm">{formatDateForInput(item.date)}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatTime(item.startTime)} - {formatTime(item.endTime)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 uppercase tracking-wide">
                <Mail className="h-4 w-4" />
                <span className="font-semibold">Email</span>
              </div>
              <p className="text-sm text-gray-900 break-all">{email}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2 uppercase tracking-wide">
                <IndianRupee className="h-4 w-4" />
                <span className="font-semibold">Amount Paid</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">₹{amount.toFixed(2)}</p>
            </div>
          </div>

          {/* Warning for non-cancellable tickets */}
          {!isCancellable && !isRetryable && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800">
                  This ticket cannot be cancelled.
                </p>
              </div>
            </div>
          )}

          {/* Specific message for failed payment */}
          {isRetryable && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">
                  Payment for this ticket has failed. Please retry to secure your booking.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {isRetryable && (
              <Button 
                onClick={handleRetryPayment}
                variant="default"
                className="flex-1 font-semibold h-9 bg-orange-600 hover:bg-orange-700"
                disabled={isRetrying}
              >
                {isRetrying ? (
                  <>Retrying...</>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Retry Payment
                  </>
                )}
              </Button>
            )}

            {isCancellable && (
              <Button 
                onClick={handleCancelTicket} 
                variant="destructive" 
                className="flex-1 font-semibold h-9"
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Ticket'}
              </Button>
            )}

            <Button 
              onClick={onClose} 
              className="flex-1 font-semibold h-9 bg-gray-900 hover:bg-black text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TicketCancellationPolicyModal
        isOpen={isCancellationOpen}
        onClose={handleCancellationClose}
        onConfirm={handleCancellationConfirm}
        ticketId={ticketId}
      />
    </>
  )
}