export interface Slot {
  startDateTime: string
  endDateTime: string
  capacity: number
}

export const getDates = (slots: Slot[]) => {
  return slots.reduce((acc: { date: string; day: string }[], slot) => {
    const startDate = new Date(slot.startDateTime)
    const dateStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const dayStr = startDate.toLocaleDateString('en-US', { weekday: 'short' })
    if (!acc.find(d => d.date === dateStr)) {
      acc.push({ date: dateStr, day: dayStr })
    }
    return acc
  }, [])
}

export const getTimeSlotsForDate = (slots: Slot[], dateStr: string | null) => {
  if (!dateStr) return []
  return slots
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
