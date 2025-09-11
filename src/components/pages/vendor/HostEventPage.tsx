import { VendorLayout } from "@/components/layouts/VendorLayout"
import { AddEventForm } from "@/components/forms/AddEventForm"
import { uploadImageToCloudinarySigned } from "@/services/cloudinary/cloudinary"
import { useToast } from "@/hooks/ui/UseToaster"
import { useAddEventMutation } from "@/hooks/vendor/UseAddEvent"


export default function HostEventPage() {

  const {showToast} = useToast()
  const {mutate:addEvent} = useAddEventMutation()

  const handleCreateEvent = async(data)=>{
    console.log("data after creating evet",data)
    let uploadImageUrl : string [] = []


      if (data.Images?.length > 0) {
  for (let file of data.Images) {
    const url = await uploadImageToCloudinarySigned(file, "event-images");
    console.log("tje uslr after ",url)
    if (url) { 
      uploadImageUrl.push(url);
    } else {
      showToast("Failed to upload image", "error");
    }
  }
}

        const processedData = {
          ...data,
          Images:uploadImageUrl,
            location: {
            type: "Point", 
          coordinates: [data.coordinates[0], data.coordinates[1]],
          },
        }
        console.log("procressed data",processedData)
        addEvent(processedData)
      
   
  }
  return (
    <VendorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Event</h1>

          </div>
        </div>
        <AddEventForm onSubmit={handleCreateEvent} />
      </div>
    </VendorLayout> 
  )
}
