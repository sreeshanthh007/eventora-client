import { useState, useEffect } from "react"
import { ClientLayout } from "@/components/layouts/ClientLayout"
import { useGetBookedEventsQuery } from "@/hooks/client/UseGetBookedEvents"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { BookedEvents } from "@/components/client/BookedEvents"



export default function BookedEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const { data: bookedEventsData, isLoading, isError } = useGetBookedEventsQuery({ 
    page: currentPage, 
    limit: 6, 
    search: debouncedSearchTerm 
  })

  const totalPages = bookedEventsData?.total || 0

  return (
    <ClientLayout>
      <BookedEvents
        bookedEvents={bookedEventsData?.bookedEvents || []}
        isLoading={isLoading}
        isError={isError}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </ClientLayout>
  )
}