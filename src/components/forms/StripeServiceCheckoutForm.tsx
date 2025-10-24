import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { axiosInstance } from "@/api/interceptor"
import { useToast } from "@/hooks/ui/UseToaster"
import { CLIENT_ROUTES } from "@/utils/constants/api.routes"

interface ServiceBookingData {
  serviceId: string
  vendorId: string
  serviceName: string
  amount: number
  currency: string
  slotStart: string
  slotEnd: string
  name: string
  email: string
  phone: string
}

interface ServiceCheckoutFormProps {
  bookingData: ServiceBookingData
  onClose: () => void
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY)

const ServiceCheckoutFormInner: React.FC<ServiceCheckoutFormProps> = ({ bookingData, onClose }) => {
    console.log("checkot data",bookingData)
  const { showToast } = useToast()
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    try {
   
      const res = await axiosInstance.post(CLIENT_ROUTES.CREATE_SERVICE_BOOKING, {
       vendorId: bookingData.vendorId,
       serviceId: bookingData.serviceId,
       bookingData:{
        slotStart: bookingData.slotStart,
        slotEnd: bookingData.slotEnd,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
       },
       amount: bookingData.amount,
       currency: bookingData.currency,
    })

      const clientSecret = res.data.clientSecret

    
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: bookingData.name,
            email: bookingData.email,
            phone: bookingData.phone,
          },
        },
        receipt_email: bookingData.email,
      })

      if (result.error) {
        showToast(result.error.message || "Payment failed", "error")
      } else if (result.paymentIntent?.status === "succeeded") {
        showToast("Payment Successful", "success")
        onClose()
      }
    } catch (err: any) {
      console.error("Payment error:", err)
      if (err.response?.data?.message) {
        showToast(err.response?.data?.message, "error")
      }
      onClose()
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
        {loading ? "Processing..." : `Pay ${bookingData.currency} ${bookingData.amount}`}
      </button>
    </form>
  )
}


const ServiceCheckoutForm: React.FC<ServiceCheckoutFormProps> = (props) => (
  <Elements stripe={stripePromise}>
    <ServiceCheckoutFormInner {...props} />
  </Elements>
)

export default ServiceCheckoutForm