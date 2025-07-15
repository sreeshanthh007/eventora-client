    
    import type React from "react"
import { Button } from "../pages/ui/button"
 import { useState , useEffect } from "react"
import { Play , ChevronLeft,ChevronRight  } from "lucide-react"
import landingPageCarosel1 from "../../assets/common/landingPageCarosel 1-wendywei-1190297.png"
import landingPageCarosel2 from "../../assets/common/landingPage Carosel 2-44912-167636.jpg"
import landingPageCarosel3 from  "../../assets/common/landing Page Carosel 3 37502588.jpg"

const heroImages = [
  landingPageCarosel1,
  landingPageCarosel2,
  landingPageCarosel3
 
]
 const EventHeroSection : React.FC = () => {

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
    <section className="relative h-[80vh] overflow-hidden">
 
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-blue-900/60 to-pink-900/80" />
      </div>

    
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

  
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
              Your Ultimate
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">Party Planner</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Effortlessly plan, organize, and celebrate your events with style.
            <span className="text-yellow-400 font-semibold"> Let the good times roll!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 font-semibold text-lg rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Explore Events
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

 
      <button
        onClick={prevImage}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

  
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  )
 }
 
 export default EventHeroSection