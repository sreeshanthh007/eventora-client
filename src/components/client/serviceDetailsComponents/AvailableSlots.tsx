import { useEffect, useState } from "react"
import { Card } from "@/components/pages/ui/card"
import { Calendar, Clock } from "lucide-react"


interface Slot {
  startDateTime: string
  endDateTime: string
  capacity: number
}

interface AvailableSlotsProps {
  slots?: Slot[] // Allow undefined
  duration: number
  onSlotSelect?: (selectedStartTime: string | null) => void  
}

export default function AvailableSlots({ slots, onSlotSelect }: AvailableSlotsProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)  
  console.log(selectedDate,selectedSlotId)
  const dates = (slots || []).reduce((acc: { date: string; day: string }[], slot) => {
    const startDate = new Date(slot.startDateTime)
    const dateStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const dayStr = startDate.toLocaleDateString('en-US', { weekday: 'short' })
    if (!acc.find(d => d.date === dateStr)) {
      acc.push({ date: dateStr, day: dayStr })
    }
    return acc
  }, [])

  const getTimeSlotsForDate = (dateStr: string | null) => {
    if (!dateStr) return []
    return (slots || [])
      .filter(slot => {
        const startDate = new Date(slot.startDateTime)
        const slotDateStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        return slotDateStr === dateStr
      })
      .map(slot => {
        const start = new Date(slot.startDateTime).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        })
        const end = new Date(slot.endDateTime).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        })
        const slotDurationMs = new Date(slot.endDateTime).getTime() - new Date(slot.startDateTime).getTime()
        const slotDurationHours = Math.round(slotDurationMs / (1000 * 60 * 60))
        return {
          display: `${start} - ${end}`,
          capacity: slot.capacity,
          duration: slotDurationHours,
          slotId: slot.startDateTime  
        }
      })
  }

  const timeSlotsForSelectedDate = getTimeSlotsForDate(selectedDate)

  
  useEffect(() => {
    onSlotSelect?.(selectedSlotId)
  }, [selectedSlotId, onSlotSelect])

  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar size={24} className="text-accent" />
          Available Slots
        </h2>


        {dates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm font-semibold text-foreground mb-3">No Slots Available</p>
            <p className="text-sm text-muted-foreground">There are no slots available currently. Please check back later or contact the vendor for custom scheduling.</p>
          </div>
        ) : (
          <>
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Select Date</p>
              <div className="grid grid-cols-5 gap-2">
                {dates.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(item.date)
                      setSelectedSlotId(null)  // Reset time selection
                      onSlotSelect?.(null)
                    }}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedDate === item.date ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <p className="text-xs font-semibold text-foreground">{item.day}</p>
                    <p className="text-sm font-bold text-foreground">{item.date}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedDate ? (
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock size={16} />
                  Select Time Slot for {selectedDate}
                </p>
                {timeSlotsForSelectedDate.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {timeSlotsForSelectedDate.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSlotId(slot.slotId)  
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-center ${
                          selectedSlotId === slot.slotId ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                        }`}
                      >
                        <p className="text-sm font-semibold text-foreground">{slot.display}</p>
                        <p className="text-xs text-foreground/60 mt-1">
                          {slot.duration} hour{slot.duration !== 1 ? 's' : ''} • Capacity: {slot.capacity}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No available time slots for this date.</p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock size={16} />
                  Select Time Slot
                </p>
                <p className="text-sm text-muted-foreground">Please select a date to view available times.</p>
              </div>
            )}

            {selectedDate && selectedSlotId && (
              <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Service scheduled for:</span> {selectedDate} at{' '}
                  {new Date(selectedSlotId).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit', 
                    hour12: true 
                  })}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  )
}