
import { useState } from "react"
import { ClientLayout } from "@/components/layouts/ClientLayout"
BookedEvents
import { useGetBookedEventsQuery } from "@/hooks/client/UseGetBookedEvents"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { BookedEvents } from "@/components/client/BookedEvents"

export default function BookedEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { data: bookedEvents, isLoading, isError } = useGetBookedEventsQuery({ page: 1, limit: 6, search: debouncedSearchTerm })

  return (
    <ClientLayout>
      <BookedEvents
        bookedEvents={bookedEvents?.bookedEvents || []}
        isLoading={isLoading}
        isError={isError}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </ClientLayout>
  )
}
