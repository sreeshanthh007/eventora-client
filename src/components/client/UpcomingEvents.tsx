   import { Calendar , MapPin } from "lucide-react"
import { CardContent , Card } from "../pages/ui/card"
import { ChevronLeft , ChevronRight } from "lucide-react"
import { Button } from "../pages/ui/button"



import React from 'react'

export const UpcomingEvents : React.FC = () => {
  return (
          <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Upcoming Events</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <Card className="border-2 border-black shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative h-80 md:h-96">
                    <img
                      src={"/placeholder.svg"}
                      className="object-cover filter grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">travis scoot</h3>
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                        
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                      
                        </div>
                        <div className="font-bold text-lg">1000</div>
                      </div>
                      <Button className="bg-white text-black hover:bg-gray-200 font-semibold">BOOK TICKET</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 border-2 border-black rounded-full p-2 shadow-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 border-2 border-black rounded-full p-2 shadow-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </section>
  )
}
