
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary"
import { WorkSampleForm } from "../../forms/vendor/WorkSamplesForm"
import { VendorLayout } from "../../layouts/VendorLayout"
import { useAddWorkSampleMutation } from "@/hooks/vendor/UseAddWorkSample"
import { useToast } from "@/hooks/ui/UseToaster"
import { useNavigate } from "react-router-dom"

interface IWorkSampleData {
  title: string
  description: string
  images: File[]
}

export default function WorkSamplePage() {


  const {mutate:addWorksample} = useAddWorkSampleMutation()
  const {showToast} = useToast()
  const navigate = useNavigate()
  const handleWorksample = async(data: IWorkSampleData) => {

    
    let uploadedImageUrls: string[] = []
    if(data.images && data.images.length>0){
        for(let each of data.images){
            const url = await uploadImageToCloudinarySigned(each,"work-sample-images")

            if(url){
              uploadedImageUrls.push(url)
            }else{
              showToast("Failed to upload image","error")
            }
        }
    }
    const processedData = {
      ...data,
      images: uploadedImageUrls,
    }

    addWorksample(processedData)
    navigate("/vendor/profile")
  }

  return (
    <VendorLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-foreground text-balance">Work Samples</h2>
          <p className="text-sm text-muted-foreground">
            Showcase your best projects. Add a title, a descriptive summary, and one or more images.
          </p>
        </div>
        <WorkSampleForm onSubmit={handleWorksample} />
      </div>
    </VendorLayout>
  )
}