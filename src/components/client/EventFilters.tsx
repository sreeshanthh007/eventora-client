
import { useState } from "react"
import { ChevronDown, MapPin, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/pages/ui/collapsible"
import { RadioGroup, RadioGroupItem } from "@/components/pages/ui/radio-group"
import { Label } from "@/components/pages/ui/label"
import { Separator } from "@/components/pages/ui/separator"



interface EventsFiltersProps {
  sort: string
  setSort: (value: string) => void
  location: string
  setLocation: (value: string) => void
  clearFilters: () => void
  setLat: (lat: number | null) => void
  setLng: (lng: number | null) => void
}


export function EventsFilters({
  sort,
  setSort,
  location,
  setLocation,
  clearFilters,
  setLat,
  setLng
}: EventsFiltersProps) {
  const [sortOpen, setSortOpen] = useState(true)
  const [locationOpen, setLocationOpen] = useState(true)



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
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <RadioGroup value={sort} onValueChange={setSort} className="space-y-3">
              <RadioGroupItem value="date-asc" id="date-asc" />
              <Label htmlFor="date-asc">Date: Earliest First</Label>

              <RadioGroupItem value="date-desc" id="date-desc" />
              <Label htmlFor="date-desc">Date: Latest First</Label>

              <RadioGroupItem value="price-low" id="price-low" />
              <Label htmlFor="price-low">Price: Low to High</Label>

              <RadioGroupItem value="price-high" id="price-high" />
              <Label htmlFor="price-high">Price: High to Low</Label>

              <RadioGroupItem value="name-asc" id="name-asc" />
              <Label htmlFor="name-asc">Name: A to Z</Label>

              <RadioGroupItem value="name-desc" id="name-desc" />
              <Label htmlFor="name-desc">Name: Z to A</Label>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

      
        <Collapsible open={locationOpen} onOpenChange={setLocationOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  locationOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
           <RadioGroup
            value={location}
            onValueChange={(value) => {
              setLocation(value)

              if (value === "near-me") {
                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    setLat(pos.coords.latitude)
                    setLng(pos.coords.longitude)
                  },
                  (err) => {
                    console.error("Error getting location:", err)
                  }
                )
              } else {
                setLat(null)
                setLng(null)
              }
            }}
            className="space-y-3"
          >
              <RadioGroupItem value="all" id="all-locations" />
              <Label htmlFor="all-locations">All Locations</Label>

              <RadioGroupItem value="near-me" id="near-me" />
              <Label htmlFor="near-me">Events Near Me</Label>

              <RadioGroupItem value="10-20km" id="within-10km" />
              <Label htmlFor="within-10km">Within 10 - 20 km</Label>

              <RadioGroupItem value="30-40km" id="within-20km" />
              <Label htmlFor="within-20km">Within 30 - 40 km</Label>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Clear */}
        <div className="pt-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
