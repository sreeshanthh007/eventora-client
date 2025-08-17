import { Star, Award, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { CardContent , Card } from "../pages/ui/card"
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
export const EventProvidersSection : React.FC = () => {
   const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 5

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= providers.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, providers.length - itemsPerView) : prev - 1))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Our Event Providers
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
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
                  <Card className="text-center hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 group overflow-hidden">
                    <CardContent className="p-6">
                      <div className="relative w-28 h-28 mx-auto mb-6">
                        <img
                          src={provider.image || "/placeholder.svg"}
                          alt={provider.name}
                          className="w-full h-full object-cover rounded-full border-4 border-purple-200 group-hover:border-purple-400 transition-all duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                        {provider.name}
                      </h3>
                      <p className="text-sm text-purple-600 font-semibold mb-3">{provider.specialty}</p>

                      <div className="flex items-center justify-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{provider.location}</span>
                      </div>

                      <div className="flex items-center justify-center gap-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-gray-800">{provider.rating}</span>
                        <span className="text-xs text-gray-500">({provider.events} events)</span>
                      </div>

                      <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto transition-all duration-300"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 border-2 border-purple-200 hover:border-purple-400 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 border-2 border-purple-200 hover:border-purple-400 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
