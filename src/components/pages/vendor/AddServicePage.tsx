import { useState } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { AddServiceForm , type  ServiceFormData } from "@/components/forms/AddServiceForm"
import { Button } from "@/components/pages/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAddServiceMutation } from "@/hooks/vendor/service/UseAddService"


const dayToNumber: Record<string, number> = {
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
  "Sunday": 0,
}

export default function AddServicePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { mutateAsync: addService } = useAddServiceMutation()

  const handleSubmit = async (formData: ServiceFormData) => {
    setIsSubmitting(true)
    try {
      const scheduleConfig = formData.scheduleConfig
      const transformedSchedule = {
        frequency: scheduleConfig.frequency.toUpperCase(),
        startDate: scheduleConfig.startDate,
        endDate: scheduleConfig.frequency === "once" ? scheduleConfig.startDate : scheduleConfig.endDate,
        startTime: scheduleConfig.startTime,
        endTime: scheduleConfig.endTime,
        duration: scheduleConfig.slotDuration,
        capacity: scheduleConfig.slotCapacity,
        workingDays: scheduleConfig.workingDays.map((day) => dayToNumber[day])
            
      }

      const payload = {
        serviceTitle: formData.serviceTitle,
        yearsOfExperience: Number(formData.yearsOfExperience) || 0,
        serviceDescription: formData.serviceDescription,
        servicePrice: Number(formData.servicePrice) || 0,
        additionalHourPrice: Number(formData.additionalHourPrice) || 0,
        serviceDuration: formData.serviceDuration,
        cancellationPolicies: formData.cancellationPolicies,
        termsAndConditions: [formData.termsAndConditions],
        categoryId: formData.categoryId,
        schedule: transformedSchedule,
        holidays: scheduleConfig.holidays,
      }

      console.log("data for submit", payload)
      await addService(payload)
      navigate("/vendor/services")
    } catch (error) {
      console.log("error to add service ", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    // Handle cancel logic if needed
  }

  return (
    <VendorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/vendor/services">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Add New Service</h1>
            <p className="text-muted-foreground">Create a new service offering for your clients</p>
          </div>
        </div>

        <AddServiceForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
      </div>
    </VendorLayout>
  )
}