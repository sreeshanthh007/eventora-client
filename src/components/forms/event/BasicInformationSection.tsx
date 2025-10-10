
import { FileText } from "lucide-react"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Textarea } from "@/components/pages/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"

interface BasicInformationSectionProps {
  formik: any
}

export function BasicInformationSection({ formik }: BasicInformationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="eventName">Event Name *</Label>
          <Input id="eventName" placeholder="Enter event name" {...formik.getFieldProps("title")} />
          {formik.touched.title && formik.errors.title && (
            <p className="text-sm text-red-500">{formik.errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your event in detail..."
            className="min-h-[120px]"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-sm text-red-500">{formik.errors.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}