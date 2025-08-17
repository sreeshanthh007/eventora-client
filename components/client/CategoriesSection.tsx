

import type React from "react"
import { Card , CardContent } from "../pages/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const categories = [
  { name: "Weddings", image: "/placeholder.svg?height=200&width=200&text=Wedding", color: "from-pink-400 to-rose-600" },
  {
    name: "Concerts",
    image: "/placeholder.svg?height=200&width=200&text=Concert",
    color: "from-purple-400 to-indigo-600",
  },
  {
    name: "Corporate",
    image: "/placeholder.svg?height=200&width=200&text=Corporate",
    color: "from-blue-400 to-cyan-600",
  },
  {
    name: "Birthdays",
    image: "/placeholder.svg?height=200&width=200&text=Birthday",
    color: "from-yellow-400 to-orange-600",
  },
  {
    name: "Festivals",
    image: "/placeholder.svg?height=200&width=200&text=Festival",
    color: "from-green-400 to-emerald-600",
  },
  { name: "Sports", image: "/placeholder.svg?height=200&width=200&text=Sports", color: "from-red-400 to-pink-600" },
  {
    name: "Conferences",
    image: "/placeholder.svg?height=200&width=200&text=Conference",
    color: "from-indigo-400 to-purple-600",
  },
  { name: "Parties", image: "/placeholder.svg?height=200&width=200&text=Party", color: "from-teal-400 to-blue-600" },
]

export const CategoriesSection : React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 5

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= categories.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, categories.length - itemsPerView) : prev - 1))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Popular Categories
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Discover amazing events across different categories</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {categories.map((category, index) => (
                <div key={index} className="w-1/5 flex-shrink-0 px-3">
                  <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:scale-105 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <div className="p-6 text-center bg-white">
                        <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 transition-all duration-300"></div>
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
