import { Star, Award, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { CardContent, Card } from "../pages/ui/card"
import { useState } from "react"

const providers = [
  {
    name: "Sarah Johnson",
    specialty: "Wedding Planner",
    rating: 4.9,
    image: "/placeholder.svg?height=150&width=150&text=Sarah",
    location: "New York",
    events: 150,
  },
  {
    name: "Mike Chen",
    specialty: "Concert Organizer",
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150&text=Mike",
    location: "Los Angeles",
    events: 200,
  },
  {
    name: "Emma Davis",
    specialty: "Corporate Events",
    rating: 4.9,
    image: "/placeholder.svg?height=150&width=150&text=Emma",
    location: "Chicago",
    events: 120,
  },
  {
    name: "Alex Rodriguez",
    specialty: "Birthday Parties",
    rating: 4.7,
    image: "/placeholder.svg?height=150&width=150&text=Alex",
    location: "Miami",
    events: 180,
  },
  {
    name: "Lisa Wang",
    specialty: "Festival Coordinator",
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150&text=Lisa",
    location: "Seattle",
    events: 90,
  },
  {
    name: "David Brown",
    specialty: "Sports Events",
    rating: 4.9,
    image: "/placeholder.svg?height=150&width=150&text=David",
    location: "Boston",
    events: 110,
  },
  {
    name: "Sophie Miller",
    specialty: "Art Exhibitions",
    rating: 4.8,
    image: "/placeholder.svg?height=150&width=150&text=Sophie",
    location: "San Francisco",
    events: 85,
  },
  {
    name: "James Wilson",
    specialty: "Tech Conferences",
    rating: 4.9,
    image: "/placeholder.svg?height=150&width=150&text=James",
    location: "Austin",
    events: 95,
  },
]

export const EventProvidersSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 5

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= providers.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, providers.length - itemsPerView) : prev - 1))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900 font-serif">
            Our Event Providers
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Meet our talented team of event professionals</p>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {providers.map((provider, index) => (
                <div key={index} className="w-1/5 flex-shrink-0 px-3">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white hover:border-blue-300 group">
                    <CardContent className="p-6">
                      <div className="relative w-28 h-28 mx-auto mb-6">
                        <img
                          src={provider.image || "/placeholder.svg"}
                          alt={provider.name}
                          className="w-full h-full object-cover rounded-full border-2 border-gray-200 group-hover:border-blue-400 transition-all duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-2">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mb-3">{provider.specialty}</p>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{provider.location}</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-800">{provider.rating}</span>
                        <span className="text-xs text-gray-500">({provider.events} events)</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-blue-400 rounded-full p-3 shadow-md transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-blue-400 rounded-full p-3 shadow-md transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
