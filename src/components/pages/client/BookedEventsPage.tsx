// src/pages/client/BookedEventsPage.tsx
import { useState, useEffect } from "react"
import { Breadcrumbs } from "@/components/common/breadCrumbs/BreadCrumbs"
import { Footer } from "@/components/mainComponents/Footer"
import { ProfileSidebar } from "@/components/mainComponents/ProfileSidebar"
import { BookedEvents } from "@/components/client/BookedEvents"
import { useGetBookedEventsQuery } from "@/hooks/client/UseGetBookedEvents"
import { useDebounce } from "@/hooks/services/UseDebounce"
import { Input } from "@/components/pages/ui/input"
import { Search } from "lucide-react"

const LIMIT = 6

export default function BookedEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const { data, isLoading, isError } = useGetBookedEventsQuery({
    page: currentPage,
    limit: LIMIT,
    search: debouncedSearchTerm,
  })

  const bookings = data?.bookedEvents || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs role="client" />
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-6">
              <ProfileSidebar />
            </div>
          </aside>

          {/* Main Area */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-8">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Booked Events</h1>
                <p className="text-gray-600 mt-2">View and manage your event tickets</p>
              </div>

              {/* Search */}
              <div className="max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by event name, ticket ID, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Events List */}
              <BookedEvents
                bookedEvents={bookings}
                isLoading={isLoading}
                isError={isError}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}