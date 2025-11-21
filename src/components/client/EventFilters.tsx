import { useState } from "react"

import { ChevronDown, MapPin, Calendar, Filter, Tag } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/pages/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/pages/ui/radio-group"
import { Label } from "@/components/pages/ui/label"
import { Separator } from "@/components/pages/ui/separator"


interface FiltersProps {
  type: "event" | "service"
  sort: string
  setSort: (value: string) => void
  location: string
  setLocation: (value: string) => void
  category?: string
  setCategory?: (value: string) => void
  clearFilters: () => void
  setLat: (lat: number | null) => void
  setLng: (lng: number | null) => void

  categoriesData?: any 
  categoriesLoading?: boolean
  categoriesError?: any
}

export function Filters({
  type,
  sort,
  setSort,
  location,
  setLocation,
  clearFilters,
  setLat,
  setLng,
  category,
  setCategory,
  categoriesData,
  categoriesError,
  categoriesLoading
}: FiltersProps) {
  const [sortOpen, setSortOpen] = useState(true)
  const [locationOpen, setLocationOpen] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(true)

  const [internalCategory, setInternalCategory] = useState("all")
  const categoryValue = category ?? internalCategory
  const setCategoryValue = setCategory ?? setInternalCategory




  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters & Sort
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort */}
        <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Sort By
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <RadioGroup value={sort} onValueChange={setSort} className="space-y-3">
              {type === "event" ? (
                <>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="date-asc" id="date-asc" />
                    <Label htmlFor="date-asc">Date: Earliest First</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="date-desc" id="date-desc" />
                    <Label htmlFor="date-desc">Date: Latest First</Label>
                  </div>
                </>
              ) : null}
              <div className="flex items-center gap-2">
                <RadioGroupItem value="price-low" id="price-low" />
                <Label htmlFor="price-low">Price: Low to High</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="price-high" id="price-high" />
                <Label htmlFor="price-high">Price: High to Low</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="name-asc" id="name-asc" />
                <Label htmlFor="name-asc">Name: A to Z</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="name-desc" id="name-desc" />
                <Label htmlFor="name-desc">Name: Z to A</Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

         {/* Service-only: Category filter */}
              {type === "service" && (
                <>
                  <Separator />
                  <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Filter By Category
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      {categoriesLoading ? (
                        <div className="flex items-center gap-2 py-4">
                          <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                          <span>Loading categories...</span>
                        </div>
                      ) : categoriesError ? (
                        <div className="text-destructive py-4">
                          Error loading categories. Showing default options.
                        </div>
                      ) : (
                        <RadioGroup value={categoryValue} onValueChange={setCategoryValue} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="all" id="cat-all" />
                            <Label htmlFor="cat-all">All Categories</Label>
                          </div>
                          {categoriesData?.categories?.length > 0 ? (
                            categoriesData.categories.map((categoryObj: any) => {
                              const categoryId = categoryObj.categoryId;
                              return (
                                <div key={categoryObj.categoryId} className="flex items-center gap-2">
                                  <RadioGroupItem value={categoryId} id={categoryObj.categoryId} />
                                  <Label htmlFor={categoryObj.categoryId}>{categoryObj.title}</Label>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-muted-foreground py-2">
                              No categories available
                            </div>
                          )}
                        </RadioGroup>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </>
              )}
        {type === "event" && (
          <>
            <Separator />
            <Collapsible open={locationOpen} onOpenChange={setLocationOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${locationOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <RadioGroup
                  value={location}
                  onValueChange={(value) => {
                    setLocation(value)
                    if (["near-me", "10-20km", "30-40km"].includes(value)) {
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          setLat(pos.coords.latitude)
                          setLng(pos.coords.longitude)
                        },
                        (err) => {
                          alert("Unable to get your location. Please enable location access.",err)
                        },
                      )
                    } else {
                      setLat(null)
                      setLng(null)
                    }
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all" id="all-locations" />
                    <Label htmlFor="all-locations">All Locations</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="near-me" id="near-me" />
                    <Label htmlFor="near-me">Events Near Me (within 5km)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="10-20km" id="within-10km" />
                    <Label htmlFor="within-10km">Within 10 - 20 km</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="30-40km" id="within-20km" />
                    <Label htmlFor="within-20km">Within 30 - 40 km</Label>
                  </div>
                </RadioGroup>
              </CollapsibleContent>
            </Collapsible>
          </>
        )}

        <Separator />

        <div className="pt-2">
          <Button
            variant="outline"
            onClick={() => {
              clearFilters()
              if (!setCategory) setInternalCategory("all")
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}