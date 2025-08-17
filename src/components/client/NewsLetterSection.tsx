
import React from "react"
import { Mail, Gift, Bell, Star } from 'lucide-react'
import { useState } from "react"
import { Input } from "../pages/ui/input"
import { Button } from "../pages/ui/button"

export const NewsLetterSection: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail("")
    }
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-8 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          
          <p className="text-gray-300 mb-8 text-lg md:text-xl leading-relaxed">
            Get the latest updates on upcoming events, exclusive offers, and event planning tips.
            <span className="text-blue-400 font-semibold"> Join 50,000+ event enthusiasts!</span>
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Gift className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm">Exclusive Offers</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm">Early Access</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm">VIP Events</span>
            </div>
          </div>
          
          {/* Subscription Form */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:border-blue-400 placeholder:text-gray-300 rounded-lg px-6 py-3 text-lg"
            />
            <Button
              onClick={handleSubscribe}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              {isSubscribed ? "Subscribed! ✨" : "Subscribe"}
            </Button>
          </div>
          
          {isSubscribed && (
            <div className="mt-6 p-4 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-lg text-green-300 font-semibold">
              🎉 Welcome to the Eventora family! Check your email for a special welcome gift.
            </div>
          )}
          
          <p className="text-gray-400 text-sm mt-6">No spam, unsubscribe at any time. We respect your privacy.</p>
        </div>
      </div>
    </section>
  )
}
