import { MapPin } from "lucide-react"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import LocationPicker from "@/components/map/MapPicker"

interface EventLocationSectionProps {
  formik: any
}

export function EventLocationSection({ formik }: EventLocationSectionProps) {
  const handleLocationSelect = (lat: number, lng: number) => {
    formik.setFieldValue("coordinates", [lng, lat])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Event Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventLocation">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="eventLocation"
                  placeholder="Enter event location (e.g., 123 Main St, City, Country)"
                  className="pl-10"
                  {...formik.getFieldProps("eventLocation")}
                />
                {formik.touched.eventLocation && formik.errors.eventLocation && (
                  <p className="text-sm text-red-500">{String(formik.errors.eventLocation)}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Map Location</Label>
              <div className="rounded-lg border overflow-hidden">
                <LocationPicker onLocationSelect={handleLocationSelect} />
              </div>
            </div>
          </div>
          {formik.values.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                Selected Coordinates: [{formik.values.location[0].toFixed(6)}, {formik.values.location[1].toFixed(6)}]
              </span>
            </div>
          )}
          {formik.touched.location && formik.errors.location && (
            <p className="text-sm text-red-500">{String(formik.errors.location)}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}