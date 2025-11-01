
import { useState, useMemo } from "react"
import { Button } from "@/components/pages/ui/button"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Badge } from "@/components/pages/ui/badge"
import { Plus, X, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/pages/ui/select"

export interface ScheduleSlotConfig {
  frequency: "once" | "daily" | "weekly" | "monthly" | "yearly"
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  duration: number
  capacity: number
  workingDays: string[]
  holidays: string[]
}

interface ScheduleSlotConfigProps {
  value: ScheduleSlotConfig
  onChange: (config: ScheduleSlotConfig) => void
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const DAY_ABBREVIATIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function ScheduleSlotConfig({ value, onChange }: ScheduleSlotConfigProps) {
  const [holidayInput, setHolidayInput] = useState("")

  const handleAddHoliday = () => {
    if (holidayInput && !value.holidays.includes(holidayInput)) {
      onChange({ ...value, holidays: [...value.holidays, holidayInput] })
      setHolidayInput("")
    }
  }

  const handleRemoveHoliday = (holiday: string) => {
    onChange({ ...value, holidays: value.holidays.filter((h) => h !== holiday) })
  }

  const toggleWorkingDay = (day: string) => {
    const updated = value.workingDays.includes(day)
      ? value.workingDays.filter((d) => d !== day)
      : [...value.workingDays, day]
    onChange({ ...value, workingDays: updated })
  }

  const previewSlots = useMemo(() => {
    if (!value.startDate || !value.startTime || !value.endTime) return []

    const slots = []
    const startDateTime = new Date(`${value.startDate}T${value.startTime}`)
    const endDateTime = new Date(`${value.startDate}T${value.endTime}`)
    const dayDuration = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60)
    const slotsPerDay = Math.floor(dayDuration / value.duration)

    for (let i = 0; i < Math.min(slotsPerDay, 5); i++) {
      const slotStart = new Date(startDateTime.getTime() + i * value.duration * 60000)
      const slotEnd = new Date(slotStart.getTime() + value.duration * 60000)
      slots.push({
        start: slotStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        end: slotEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      })
    }

    return slots
  }, [value.startDate, value.startTime, value.endTime, value.duration])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Configuration */}
      <div className="lg:col-span-2 space-y-6">
        {/* Frequency Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Frequency</CardTitle>
            <CardDescription>Choose how often this service is available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency *</Label>
              <Select value={value.frequency} onValueChange={(freq: any) => onChange({ ...value, frequency: freq })}>
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">Once</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Date & Time Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Date & Time Settings</CardTitle>
            <CardDescription>Set the availability window for this service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={value.startDate}
                onChange={(e) => onChange({ ...value, startDate: e.target.value })}
              />
            </div>

            {value.frequency !== "once" && (
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={value.endDate}
                  onChange={(e) => onChange({ ...value, endDate: e.target.value })}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={value.startTime}
                  onChange={(e) => onChange({ ...value, startTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={value.endTime}
                  onChange={(e) => onChange({ ...value, endTime: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        
          {value.frequency=="monthly" || value.frequency=="yearly" || value.frequency=="weekly" ? 
        <Card>
            <CardHeader>
              <CardTitle>Working Days</CardTitle>
              <CardDescription>Select which days this service is available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DAYS_OF_WEEK.map((day, idx) => (
                  <label key={day} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value.workingDays.includes(day)}
                      onChange={() => toggleWorkingDay(day)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{DAY_ABBREVIATIONS[idx]}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        
       : "" }
   
        <Card>
          <CardHeader>
            <CardTitle>Slot Settings</CardTitle>
            <CardDescription>Configure how slots are divided and their capacity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slotDuration">Slot Duration (minutes) *</Label>
                <Input
                  id="slotDuration"
                  type="number"
                  min="15"
                  step="15"
                  value={value.duration}
                  onChange={(e) => onChange({ ...value, duration: Number.parseInt(e.target.value) || 30 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slotCapacity">Slot Capacity *</Label>
                <Input
                  id="slotCapacity"
                  type="number"
                  min="1"
                  value={value.capacity}
                  onChange={(e) => onChange({ ...value, capacity: Number.parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {value.frequency!="daily" && value.frequency!=="once" ?
        <Card>
          <CardHeader>
            <CardTitle>Holidays & Exceptions</CardTitle>
            <CardDescription>Add dates when this service is not available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="date"
                value={holidayInput}
                onChange={(e) => setHolidayInput(e.target.value)}
                placeholder="Select a date"
              />
              <Button type="button" onClick={handleAddHoliday} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {value.holidays.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {value.holidays.map((holiday) => (
                  <Badge key={holiday} variant="secondary" className="flex items-center gap-1 pr-1">
                    <span className="text-xs">{new Date(holiday).toLocaleDateString()}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleRemoveHoliday(holiday)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
    : ""  }
      
      </div>

      {/* Right Panel - Preview */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Preview
            </CardTitle>
            <CardDescription>Sample slots for selected date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Frequency:</span>
                <span className="ml-2 font-medium capitalize">{value.frequency}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2 font-medium">{value.startDate || "Not set"}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Time Window:</span>
                <span className="ml-2 font-medium">
                  {value.startTime} - {value.endTime}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Slot Duration:</span>
                <span className="ml-2 font-medium">{value.duration} min</span>
              </div>
              <div>
                <span className="text-muted-foreground">Capacity:</span>
                <span className="ml-2 font-medium">{value.capacity}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs font-medium text-muted-foreground mb-3">Sample Slots</p>
              {previewSlots.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {previewSlots.map((slot, idx) => (
                    <div key={idx} className="p-2 bg-muted rounded text-xs">
                      <div className="font-medium">
                        {slot.start} - {slot.end}
                      </div>
                      <div className="text-muted-foreground">Cap: {value.capacity}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-muted-foreground text-center py-4">
                  Configure the schedule to see preview
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}