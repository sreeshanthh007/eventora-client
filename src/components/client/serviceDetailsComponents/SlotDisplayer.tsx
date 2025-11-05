
import { useEffect, useState } from "react"
import { Card } from "@/components/pages/ui/card"
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"

interface SlotData {
  date: string 
  slots: string[] 
}

interface Schedule {
  startDate: string[]
  endDate: string[]
  holidays: string[]
  workingDays: number[][]
}

interface AvailableSlotsByMonthProps {
  slots?: SlotData[]
  schedule?: Schedule
  duration: number
  onSlotSelect?: (selectedSlot: { date: string; time: string } | null) => void
}

export default function SlotDisplayer({
  slots = [],
  duration,
  onSlotSelect,
}: AvailableSlotsByMonthProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)


  const slotsByMonth = new Map<string, SlotData[]>()
  slots.forEach((slot) => {
    const date = new Date(slot.date)
    const monthKey = date.toLocaleDateString("en-US", { year: "numeric", month: "numeric" })
    if (!slotsByMonth.has(monthKey)) {
      slotsByMonth.set(monthKey, [])
    }
    slotsByMonth.get(monthKey)!.push(slot)
  })

  const currentMonthKey = selectedMonth.toLocaleDateString("en-US", { year: "numeric", month: "numeric" })
  const monthSlots = slotsByMonth.get(currentMonthKey) || []
  const monthName = selectedMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })


  const availableDatesInMonth = monthSlots.map((slot) => slot.date).sort()

  // Get time slots for selected date
  const timeSlots = selectedDate ? monthSlots.find((slot) => slot.date === selectedDate)?.slots || [] : []

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))
    setSelectedDate(null)
    setSelectedTime(null)
  }

  useEffect(() => {
    if (selectedDate && selectedTime) {
      onSlotSelect?.({ date: selectedDate, time: selectedTime })
    } else {
      onSlotSelect?.(null)
    }
  }, [selectedDate, selectedTime, onSlotSelect])

  if (slots.length === 0) {
    return (
      <Card className="p-8 bg-card border border-border">
        <div className="text-center py-12">
          <Calendar size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-sm font-semibold text-foreground mb-2">No Slots Available</p>
          <p className="text-sm text-muted-foreground">
            There are no slots available currently. Please check back later.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 bg-card border border-border">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Calendar size={24} className="text-accent" />
          Available Slots
        </h2>

        {/* Month Navigation */}
        <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg border border-border">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <h3 className="text-lg font-semibold text-foreground">{monthName}</h3>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Select Date in {monthName}</p>
          {availableDatesInMonth.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {availableDatesInMonth.map((date) => {
                const dateObj = new Date(date)
                const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" })
                const dayNum = dateObj.getDate()
                const isSelected = selectedDate === date

                return (
                  <button
                    key={date}
                    onClick={() => {
                      setSelectedDate(date)
                      setSelectedTime(null)
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      isSelected ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <p className="text-xs font-semibold text-muted-foreground uppercase">{dayName}</p>
                    <p className="text-lg font-bold text-foreground">{dayNum}</p>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-muted/20 rounded-lg">
              <p className="text-sm text-muted-foreground">No available dates in {monthName}</p>
            </div>
          )}
        </div>


        {selectedDate && (
          <div>
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock size={16} />
              Select Time Slot for{" "}
              {new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </p>
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedTime === time ? "border-accent bg-accent/10" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground">{time}</p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No available time slots for this date.</p>
            )}
          </div>
        )}

        {/* Selection Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg">
            <p className="text-sm font-semibold text-foreground mb-2">Service Scheduled</p>
            <p className="text-sm text-foreground">
              {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}{" "}
              at {selectedTime}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Duration: {duration} hour{duration !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
