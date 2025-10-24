import { Filters } from "@/components/client/EventFilters";
import { ClientHeader } from "@/components/client/ClientHeader";
import { Footer } from "@/components/mainComponents/Footer";
import { useState, useEffect } from "react";
import { UseGetAllServiceForServicePage } from "@/hooks/client/UseGetAllServiceForServicePage";
import { useGetCategoriesForFilter } from "@/hooks/client/UseGetCategoriesForFilter"; // Add this import
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/services/UseDebounce";
import { ServicesGrid } from "@/components/client/ServiceGrid";

export default function ServicesPage() {
  const [sort, setSort] = useState("name-asc");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);


  const { 
    data: categoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useGetCategoriesForFilter();

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading: servicesLoading } = UseGetAllServiceForServicePage({
    page: currentPage,
    limit: 6,
    search: debouncedSearch,
    sort,
    categoryId: category !== "all" ? category : "",
  });

  const totalPages = data?.total || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sort, category]);

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80 flex-shrink-0">
              <Filters
                type="service"
                clearFilters={() => {
                  setSort("name-asc");
                  setSearch("");
                  setCategory("all");
                  setCurrentPage(1);
                }}
                sort={sort}
                setSort={setSort}
                location=""
                setLocation={() => {}}
                setLat={() => {}}
                setLng={() => {}}
                category={category}
                setCategory={setCategory}
                categoriesData={categoriesData}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
              />
            </aside>
            <div className="flex-1">
              {servicesLoading ? (
                <p>Loading services...</p>
              ) : data && data.services && data.services.length > 0 ? (
                <ServicesGrid
                  services={data.services}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <p>No services found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}