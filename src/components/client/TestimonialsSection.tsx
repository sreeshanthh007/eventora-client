import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardContent } from '../pages/ui/card'

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=80&h=80&fit=crop&crop=face",
    text: "We booked Eventora for our annual company gala (350 guests) and they were incredible from start to finish. The team handled venue sourcing, catering, AV, and décor — everything ran perfectly. Our CEO said it was the best event we’ve ever had!",
  },
  {
    name: "Michael & Lisa Chen",
    role: "Newlyweds",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    text: "We hired Eventora for our wedding and it was the best decision we made. They brought our dream garden wedding to life — flowers, lighting, music, timeline — everything was flawless. We got to enjoy our day stress-free while they took care of every detail.",
  },
  {
    name: "Emily Davis",
    role: "Festival Organizer, CityFest 2024",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b612?w=80&h=80&fit=crop&crop=face",
    text: "Eventora managed our 3-day music & food festival for 8,000+ attendees. Logistics, permits, vendor coordination, stage setup — they nailed it all. Even when it rained on day two, they had contingency plans ready. Already booked them for next year!",
  },
  {
    name: "David Rodriguez",
    role: "CEO, Apex Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    text: "We trusted Eventora with our global leadership summit in Dubai. Flights, 5-star hotel block, keynote staging, simultaneous translation — executed perfectly for 200 executives. Professional, responsive, and worth every penny. Highly recommend!",
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
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900 font-serif">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg font-serif">
            Real events. Real people. Real happiness.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials
              .slice(currentTestimonial, currentTestimonial + 2)
              .map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-8 border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-10 h-10 text-gray-200 group-hover:text-blue-500 transition-colors duration-300" />
                      <div className="flex items-start gap-6">
                        <div className="relative flex-shrink-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-md group-hover:border-blue-500 transition-all duration-300"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1.5 shadow-lg">
                            <Star className="w-5 h-5 text-white fill-current" />
                          </div>
                        </div>

                        <div className="flex-1">
                         

                          <p className="text-gray-700 mb-6 italic leading-relaxed text-base">
                            "{testimonial.text}"
                          </p>

                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              — {testimonial.name}
                            </h4>
                            <p className="text-sm text-blue-600 font-medium mt-1">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-12 space-x-6">
            <button
              onClick={prevTestimonial}
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-500 rounded-full p-3 shadow-lg transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-7 h-7 text-gray-700" />
            </button>

            <div className="flex space-x-3">
              {[...Array(Math.ceil(testimonials.length / 2))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i * 2)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentTestimonial / 2) === i
                      ? "bg-blue-600 w-10"
                      : "bg-gray-300 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-500 rounded-full p-3 shadow-lg transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-7 h-7 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}