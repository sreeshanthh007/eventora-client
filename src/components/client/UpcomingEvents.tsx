   import { Calendar , MapPin } from "lucide-react"
import { CardContent , Card } from "../pages/ui/card"
import { ChevronLeft , ChevronRight, Star , Users } from "lucide-react"
import { Button } from "../pages/ui/button"



import React, { useState } from 'react'


const upcomingEvents = [
  {
    title: "Travis Scott Live",
    date: "Dec 25, 2024",
    location: "Madison Square Garden",
    price: "$150",
    image: "/placeholder.svg?height=400&width=600&text=Travis+Scott",
    rating: 4.9,
    attendees: "15K+",
  },
  {
    title: "Ariana Grande Concert",
    date: "Jan 15, 2025",
    location: "Staples Center",
    price: "$200",
    image: "/placeholder.svg?height=400&width=600&text=Ariana+Grande",
    rating: 4.8,
    attendees: "20K+",
  },
  {
    title: "Ed Sheeran World Tour",
    date: "Feb 10, 2025",
    location: "Wembley Stadium",
    price: "$180",
    image: "/placeholder.svg?height=400&width=600&text=Ed+Sheeran",
    rating: 4.9,
    attendees: "50K+",
  },
]


export const UpcomingEvents : React.FC = () => {
 const [currentEvent, setCurrentEvent] = useState(0)

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % upcomingEvents.length)
  }

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length)
  }

  const event = upcomingEvents[currentEvent]

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-4 text-lg">Don't miss out on these amazing events</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg">
              <CardContent className="p-0">
                <div className="relative h-96 md:h-[500px] overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{event.rating}</span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-purple-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                        FEATURED
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-6 mb-6 text-sm md:text-base">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Calendar className="w-5 h-5 text-yellow-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <MapPin className="w-5 h-5 text-pink-400" />
                        <span>{event.location}</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">{event.price}</div>
                    </div>

                    <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      BOOK TICKET
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <button
            onClick={prevEvent}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextEvent}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {upcomingEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEvent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentEvent ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
