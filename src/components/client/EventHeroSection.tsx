import React from "react"
import { useState, useEffect } from "react"
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'

import landingPageCarosel1 from "../../assets/common/landingPageCarosel 1-wendywei-1190297.png"
import landingPageCarosel2 from "../../assets/common/landingPage Carosel 2-44912-167636.jpg"
import landingPageCarosel3 from  "../../assets/common/landing Page Carosel 3 37502588.jpg"
import { Button } from "../pages/ui/button"

const heroImages = [
  landingPageCarosel1,
  landingPageCarosel2,
  landingPageCarosel3
 
]
const EventHeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section className="relative h-[80vh] overflow-hidden bg-gray-900">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image || "/placeholder.svg"} alt={`Hero ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Ultimate
            <br />
            <span className="text-blue-400">Party Planner</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Effortlessly plan, organize, and celebrate your events with style.
            <span className="text-blue-400 font-semibold"> Let the good times roll!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-semibold text-lg rounded-lg shadow-lg transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Explore Events
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-white" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default EventHeroSection
