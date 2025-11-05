import { useFormik } from "formik"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/pages/ui/dialog"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Button } from "@/components/pages/ui/button"
import { serviceBookingModalSchema } from "@/utils/validations/serviceBookingModal.validator"
import ServiceCheckoutForm from "../forms/StripeServiceCheckoutForm"
import { Card } from "@/components/pages/ui/card"

interface SelectedSlot {
  date: string
  time: string
}

interface BookingForm {
  name: string
  email: string
  phone: string
}

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSlot: SelectedSlot | null
  serviceDuration: number
  onBook: (bookingData: { selectedSlotTime: string; selectedDate: string;  name: string; email: string; phone: string }) => void
  bookingData: {
    selectedSlotTime: string;
    selectedDate: string;
    name: string;
    email: string;
    phone: string;
  } | null
  serviceId: string
  vendorId: string
  serviceName: string
  amount: number
  currency: string
}

export default function BookingModal({ 
  open, 
  onOpenChange, 
  selectedSlot, 
  serviceDuration, 
  onBook,
  bookingData,
  serviceId,
  vendorId,
  serviceName,
  amount,
  currency,
}: BookingModalProps) {
  const formik = useFormik<BookingForm>({
    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validationSchema:serviceBookingModalSchema,
    onSubmit: (values) => {
      if (!selectedSlot) return



      onBook({
        selectedSlotTime: selectedSlot.time,
        selectedDate: selectedSlot.date,
        ...values
      })
    }
  })

  const slotDate = selectedSlot ? new Date(selectedSlot.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }) : ''
  const slotTime = selectedSlot ? selectedSlot.time : ''

  // Determine if we are in payment step
  const isPaymentStep = !!bookingData

  if (isPaymentStep) {
    const fullBookingData = {
      serviceId,
      vendorId,
      serviceName,
      amount,
      currency,
      selectedSlotTime: bookingData!.selectedSlotTime,
      selectedDate: bookingData!.selectedDate,
      name: bookingData!.name,
      email: bookingData!.email,
      phone: bookingData!.phone,
    }

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ready to Pay</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="text-lg font-semibold">Booking Summary</h3>
              <p className="text-sm">Service: {serviceName}</p>
              <p className="text-sm">Date: {slotDate}</p>
              <p className="text-sm">Time: {slotTime}</p>
              <p className="text-sm font-bold">Total: {currency} {amount}</p>
            </Card>
            <ServiceCheckoutForm 
              bookingData={fullBookingData} 
              onClose={() => {
                onOpenChange(false)
              }} 
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {selectedSlot && (
            <div className="space-y-2 p-4 bg-accent/10 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground">Selected Slot</h3>
              <p className="text-sm text-foreground">{slotDate}</p>
              <p className="text-sm text-foreground">{slotTime}</p>
              <p className="text-sm text-muted-foreground">Duration: {serviceDuration} hour{serviceDuration !== 1 ? 's' : ''}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-sm text-destructive">{formik.errors.name}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-sm text-destructive">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-sm text-destructive">{formik.errors.phone}</p>
            ) : null}
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full" disabled={formik.isSubmitting || !formik.isValid}>
              Proceed to Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}