import { useState, useEffect } from "react"
import { VendorLayout } from "@/components/layouts/VendorLayout"
import { EditServiceForm, type ServiceFormData } from "@/components/forms/EditServiceForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/pages/ui/button"

import { Link, useNavigate, useParams } from "react-router-dom"
import { UseGetServiceById } from "@/hooks/vendor/service/UseGetserviceById"
import { useToast } from "@/hooks/ui/UseToaster"
import { useEditServiceMutation } from "@/hooks/vendor/service/UseEditService"

export default function EditServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>()

  const navigate = useNavigate()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  
  const { data: serviceResponse, isLoading, isError, error } = UseGetServiceById(serviceId ?? "")
  const {mutateAsync:editService}  = useEditServiceMutation()

  const service = serviceResponse?.service



  useEffect(() => {
    if (isError) {
      showToast(error?.message || "Failed to fetch service details", "error")
    }
  }, [isError, error, showToast])



  const handleSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true)
    try {
   


      await editService({serviceId:serviceId!,data:data})

      navigate("/vendor/services")
    } catch (error) {
    
      showToast("Failed to update service", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    navigate("/vendor/services")
  }


  

  if (isLoading) {
    return (
      <VendorLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading service details...</span>
          </div>
        </div>
      </VendorLayout>
    )
  }

  if (isError || !service) {
    return (
      <VendorLayout>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {isError 
                  ? "There was an error loading the service details." 
                  : "The service you're looking for could not be found."}
              </p>
              <Link to="/vendor/services">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Services
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </VendorLayout>
    )
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Link to="/vendor/services">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Service</h1>
            <p className="text-muted-foreground">Update your service details and pricing</p>
          </div>
        </div>

        {/* Edit Service Form */}
        <EditServiceForm
          service={service}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </VendorLayout>
  )
}