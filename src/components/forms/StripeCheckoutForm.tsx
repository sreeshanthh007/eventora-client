import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CLIENT_ROUTES } from "@/utils/constants/api.routes"
import { axiosInstance } from "@/api/interceptor"
import { useToast } from "@/hooks/ui/UseToaster"

interface TicketItem {
  ticketType: string
  pricePerTicket: number
  quantity: number
}

interface CheckoutFormProps {
  eventId: string
  vendorId:string
  purchaseData: {
    email: string
    name: string
    tickets: TicketItem[]
    totalAmount: number
    currency: string
  }
  onClose: () => void
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)
const CheckoutFormInner: React.FC<CheckoutFormProps> = ({ vendorId,eventId, purchaseData, onClose }) => {
  console.log("checkout data",purchaseData)
  const {showToast} = useToast()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    try {
   
      const selectedTickets = purchaseData.tickets.filter(t => t.quantity > 0)

      if (selectedTickets.length === 0) {
        showToast("No tickets selected", "error")
        setLoading(false)
        return
      }

      const res = await axiosInstance.post(CLIENT_ROUTES.CREATE_BOOKING, {
        eventId,
        vendorId,
        tickets: selectedTickets.map(t => ({
          ticketType: t.ticketType,
          quantity: t.quantity,
          pricePerTicket: t.pricePerTicket
        })),
        amount: purchaseData.totalAmount,
        currency: purchaseData.currency,
      })

      const clientSecret = res.data.clientSecret

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: purchaseData.name,
            email: purchaseData.email,
          },
        },
        receipt_email: purchaseData.email,
      })

      if (result.error) {
        console.log("result error",result.error)
        showToast(result.error.message || "Payment failed", "error")
      } else if (result.paymentIntent?.status === "succeeded") {
        showToast("Payment Successful", "success")
        onClose()
      }
    } catch (err: any) {
      console.error("Payment error:", err)
      if(err.response?.data?.message){
        showToast(err.response?.data?.message, "error");
       onClose()
      } else {
        showToast(err.message || "An error occurred during payment", "error")
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2 rounded"
      >
        {loading ? "Processing..." : `Pay ${purchaseData.currency} ${purchaseData.totalAmount}`}
      </button>
    </form>
  )
}

export const CheckoutForm: React.FC<CheckoutFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutFormInner {...props} />
  </Elements>
)