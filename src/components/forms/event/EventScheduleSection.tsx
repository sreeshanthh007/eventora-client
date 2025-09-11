
import { Calendar, Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"

interface EventScheduleSectionProps {
  formik: any
}

export function EventScheduleSection({ formik }: EventScheduleSectionProps) {
  const addScheduleEntry = () => {
    const newSchedule = [...formik.values.eventSchedule, { date: "", startTime: "", endTime: "" }]
    formik.setFieldValue("eventSchedule", newSchedule)
  }

  const removeScheduleEntry = (index: number) => {
    if (formik.values.eventSchedule.length > 1) {
      const newSchedule = formik.values.eventSchedule.filter((_, i) => i !== index)
      formik.setFieldValue("eventSchedule", newSchedule)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Event Schedule
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addScheduleEntry}
            className="flex items-center gap-2 bg-transparent"
          >
            <Plus className="h-4 w-4" />
            Add Schedule
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {formik.values.eventSchedule.map((scheduleItem, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Schedule {index + 1}</h4>
              {formik.values.eventSchedule.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeScheduleEntry(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`eventSchedule.${index}.date`}>Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`eventSchedule.${index}.date`}
                    type="date"
                    className="pl-10"
                    {...formik.getFieldProps(`eventSchedule.${index}.date`)}
                  />
                </div>
                {formik.touched.eventSchedule?.[index]?.date && formik.errors.eventSchedule?.[index]?.date && (
                  <p className="text-sm text-red-500">{formik.errors.eventSchedule[index].date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`eventSchedule.${index}.startTime`}>Start Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`eventSchedule.${index}.startTime`}
                    type="time"
                    className="pl-10"
                    {...formik.getFieldProps(`eventSchedule.${index}.startTime`)}
                  />
                </div>
                {formik.touched.eventSchedule?.[index]?.startTime && formik.errors.eventSchedule?.[index]?.startTime && (
                  <p className="text-sm text-red-500">{formik.errors.eventSchedule[index].startTime}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor={`eventSchedule.${index}.endTime`}>End Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`eventSchedule.${index}.endTime`}
                    type="time"
                    className="pl-10"
                    {...formik.getFieldProps(`eventSchedule.${index}.endTime`)}
                  />
                </div>
                {formik.touched.eventSchedule?.[index]?.endTime && formik.errors.eventSchedule?.[index]?.endTime && (
                  <p className="text-sm text-red-500">{formik.errors.eventSchedule[index].endTime}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {formik.touched.eventSchedule && typeof formik.errors.eventSchedule === "string" && (
          <p className="text-sm text-red-500">{formik.errors.eventSchedule}</p>
        )}
      </CardContent>
    </Card>
  )
}