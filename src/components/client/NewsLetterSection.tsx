  
  import { Input } from "../pages/ui/input"
  import { Button } from "../pages/ui/button"
import type React from "react"


export const NewsLetterSection : React.FC = () => {
  return (
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest updates on upcoming events, exclusive offers, and event planning tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white text-black border-2 border-gray-300 focus:border-white"
            />
            <Button className="bg-white text-black hover:bg-gray-200 font-semibold">Subscribe</Button>
          </div>
        </div>
      </section>

  )
}
