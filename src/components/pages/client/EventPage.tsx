
import { EventsFilters } from "@/components/client/EventFilters"
import { EventsGrid } from "@/components/client/EventGrid"
import { ClientHeader } from "@/components/client/ClientHeader"
import { Footer } from "@/components/mainComponents/Footer"
import { useState } from "react"
import { useGetAllEventsForEventsPage } from "@/hooks/client/UseGetAllEventsForEventsPage"

export default function EventsPage() {

  const [location,setLocation] = useState("all")
  const [sort,setSort] = useState("date-asc")
  const [lat, setLat] = useState<number | null>(null)
const [lng, setLng] = useState<number | null>(null)

  const {data,isLoading} = useGetAllEventsForEventsPage({
    page:1,
    limit:6,
    search:"",
    location,
    sort,
    ...(location === "near-me" && lat && lng ? { lat, lng } : {}) 
  })
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <aside className="lg:w-80 flex-shrink-0">
              <EventsFilters
                clearFilters={() => {
                  setSort("date-asc")
                  setLocation("all")
                }}
                location={location}
                setLocation={setLocation}
                setSort={setSort}
                sort={sort}
                setLat={setLat}
                setLng={setLng}
              />
            </aside>
            <div className="flex-1">
              <EventsGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
