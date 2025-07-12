    
    import type React from "react"
import { Button } from "../pages/ui/button"
 
 const EventHeroSection : React.FC = () => {
   return (
       <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={"/placeholder.svg"}
            alt="Event Hero"
            className="object-cover transition-opacity duration-1000 filter grayscale"
             />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Your Ultimate Party Planner</h1>
            <p className="text-xl mb-8 text-gray-200">
              Effortlessly plan, organize, and celebrate your events with style. Let the good times roll!
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-3 font-semibold">
              Explore Events
            </Button>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button
            />
        </div>
      </section>
   )
 }
 
 export default EventHeroSection