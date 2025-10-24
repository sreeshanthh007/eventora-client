
import { useState } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { AddServiceForm , type  ServiceFormData } from "@/components/forms/AddServiceForm"
import { Button } from "@/components/pages/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAddServiceMutation } from "@/hooks/vendor/service/UseAddService"

export default function AddServicePage() {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const {mutateAsync:addService} = useAddServiceMutation()


  
  const handleSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true)
    try {
      if(data){
        console.log("data for submit",data)
      await addService(data)
      navigate("/vendor/services")
    }
    } catch (error) {
      console.log("error to add service ",error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    
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
