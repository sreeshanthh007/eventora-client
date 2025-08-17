
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { Card,CardContent } from '../pages/ui/card'

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

export const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
            Success Stories
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Your Events, Their Stories of Success</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.slice(currentTestimonial, currentTestimonial + 2).map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-300 group-hover:text-blue-400 transition-colors duration-300" />
                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-20 h-20 object-cover rounded-full border-2 border-gray-200 group-hover:border-blue-400 transition-all duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1">
                          <Star className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-6 italic leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div>
                          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            - {testimonial.name}
                          </h4>
                          <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
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
              className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-blue-400 rounded-full p-3 shadow-md transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex space-x-2">
              {[...Array(Math.ceil(testimonials.length / 2))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index * 2)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentTestimonial / 2) === index
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="bg-white hover:bg-gray-50 border border-gray-300 hover:border-blue-400 rounded-full p-3 shadow-md transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
