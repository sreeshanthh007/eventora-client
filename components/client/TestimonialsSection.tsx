
import { Card , CardContent } from "../pages/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

import React, { useState } from 'react'


const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    image: "/placeholder.svg?height=80&width=80&text=Sarah",
    rating: 5,
    text: "Eventora made our corporate event planning seamless! The attention to detail and professional service exceeded our expectations. Highly recommended!",
  },
  {
    name: "Michael Chen",
    role: "Wedding Planner",
    image: "/placeholder.svg?height=80&width=80&text=Michael",
    rating: 5,
    text: "Working with Eventora was a dream come true. They transformed our vision into reality and made our special day absolutely perfect!",
  },
  {
    name: "Emily Davis",
    role: "Event Coordinator",
    image: "/placeholder.svg?height=80&width=80&text=Emily",
    rating: 5,
    text: "The team at Eventora is incredibly talented and professional. They handled every aspect of our festival with precision and creativity.",
  },
  {
    name: "David Rodriguez",
    role: "CEO",
    image: "/placeholder.svg?height=80&width=80&text=David",
    rating: 5,
    text: "Outstanding service! Eventora delivered an exceptional conference that impressed all our attendees. Will definitely work with them again.",
  },
]
export const TestimonialsSection : React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Your Events, Their Stories of Success</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(currentTestimonial, currentTestimonial + 2).map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-300 group-hover:text-purple-500 transition-colors duration-300" />

                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-20 h-20 object-cover rounded-full border-4 border-purple-200 group-hover:border-purple-400 transition-all duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                          <Star className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        <p className="text-gray-700 mb-6 italic leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                          "{testimonial.text}"
                        </p>

                        <div>
                          <h4 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                            - {testimonial.name}
                          </h4>
                          <p className="text-sm text-purple-600 font-semibold">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              onClick={prevTestimonial}
              className="bg-white hover:bg-gray-50 border-2 border-purple-200 hover:border-purple-400 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </button>

            <div className="flex space-x-2">
              {[...Array(Math.ceil(testimonials.length / 2))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index * 2)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentTestimonial / 2) === index
                      ? "bg-purple-500 scale-125"
                      : "bg-purple-200 hover:bg-purple-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="bg-white hover:bg-gray-50 border-2 border-purple-200 hover:border-purple-400 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
