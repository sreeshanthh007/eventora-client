import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { CLIENT_ROUTES } from "@/utils/constants/api.routes"
import { axiosInstance } from "@/api/interceptor"
import { useToast } from "@/hooks/ui/UseToaster"

interface CheckoutFormProps {
  eventId: string
  purchaseData: {
    email: string
    name: string
    ticketType: string
    quantity: number
    amount: number
    currency: string 
  }
  onClose: () => void
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)
const CheckoutFormInner: React.FC<CheckoutFormProps> = ({ eventId, purchaseData, onClose }) => {
  console.log("CheckoutForm purchaseData:", purchaseData)
  const {showToast} = useToast()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    try {
      const res = await axiosInstance.post(CLIENT_ROUTES.CREATE_BOOKING, {
        eventId,
        ticketType: purchaseData.ticketType,
        amount: purchaseData.amount,
        currency: purchaseData.currency,
        quantity: purchaseData.quantity,
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
      })

      if (result.error) {
        console.log("result error",result.error)
        alert(result.error.message)
      } else if (result.paymentIntent?.status === "succeeded") {
        showToast("payment Successfull","success")
        onClose()
      }
    } catch (err: any) {
      console.error("Payment error:", err)
      if(err.response?.data?.message){
        showToast(err.response?.data?.message,"error");
       onClose()
      }
      showToast(err.message,"error")
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
        {loading ? "Processing..." : `Pay ${purchaseData.currency} ${purchaseData.amount}`}
      </button>
    </form>
  )
}

export const CheckoutForm: React.FC<CheckoutFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutFormInner {...props} />
  </Elements>
)