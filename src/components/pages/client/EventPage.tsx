import { Filters } from "@/components/client/EventFilters";
import { EventsGrid } from "@/components/client/EventGrid";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Footer } from "@/components/mainComponents/Footer";
import { useState, useEffect } from "react";
import { useGetAllEventsForEventsPage } from "@/hooks/client/UseGetAllEventsForEventsPage";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/services/UseDebounce";

export default function EventsPage() {
  const [location, setLocation] = useState("all");
  const [sort, setSort] = useState("date-asc");
  const [search, setSearch] = useState(""); 
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300); 


  const locationRequiresCoords = ["near-me", "10-20km", "30-40km"].includes(location);

  const { data, isLoading } = useGetAllEventsForEventsPage({
    page: currentPage,
    limit: 6, 
    search: debouncedSearch, 
    location,
    sort,
    
    ...(locationRequiresCoords && lat && lng ? { lat, lng } : {}),
  });

  const totalPages = data?.total || 1; 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80 flex-shrink-0">
              <Filters
                type="event"
                clearFilters={() => {
                  setSort("date-asc");
                  setLocation("all");
                  setSearch(""); 
                  setCurrentPage(1);
                  setLat(null); 
                  setLng(null); 
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
              {isLoading ? (
                <p>Loading events...</p>
              ) : data && data.events && data.events.length > 0 ? (
                <EventsGrid
                  events={data.events}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}