
import { Card , CardContent } from "../pages/ui/card"
import { Star } from "lucide-react"

import React from 'react'

export const TestimonialsSection : React.FC = () => {
  return (
   <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Your Events, Their Stories of Success</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 border-2 border-gray-200 hover:border-black transition-colors bg-white">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <img
                        src={ "/placeholder.svg"}
                        className="object-cover rounded-full filter grayscale"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 fill-black text-black" />
                      </div>
                      <p className="text-gray-700 mb-3 italic">nice</p>
                      <div>
                        <h4 className="font-semibold text-black">- sarah</h4>
                        <p className="text-sm text-gray-600">manager</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>
  )
}
