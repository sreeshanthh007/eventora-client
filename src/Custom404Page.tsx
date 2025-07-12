

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/pages/ui/button"
import { Card, CardContent } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Home, Search, Calendar, Users, ArrowLeft, Sparkles, Star, Music, PartyPopper, Ticket } from "lucide-react"

export  function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; x: number; y: number; delay: number }>>(
    [],
  )

  // Generate floating elements for animation
  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setFloatingElements(elements)
  }, [])

  const quickLinks = [
    { icon: Home, label: "Home", href: "/", description: "Back to homepage" },
    { icon: Calendar, label: "Events", href: "/events", description: "Browse all events" },
    { icon: Users, label: "Providers", href: "/providers", description: "Find event providers" },
    { icon: Ticket, label: "My Tickets", href: "/tickets", description: "View your bookings" },
  ]

  const popularSearches = [
    "Concerts",
    "Weddings",
    "Corporate Events",
    "Birthday Parties",
    "Conferences",
    "Food Festivals",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute opacity-10"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
            }}
          >
            {element.id % 4 === 0 && <Music className="w-8 h-8 text-black animate-bounce" />}
            {element.id % 4 === 1 && <PartyPopper className="w-6 h-6 text-gray-600 animate-pulse" />}
            {element.id % 4 === 2 && <Star className="w-5 h-5 text-gray-500 animate-spin" />}
            {element.id % 4 === 3 && <Sparkles className="w-7 h-7 text-gray-400 animate-bounce" />}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-black tracking-wider text-black hover:text-gray-700 transition-colors"
            >
              EVENTORA
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-12 relative">
            <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-black/5 rounded-full animate-pulse flex items-center justify-center">
                <PartyPopper className="w-16 h-16 md:w-20 md:h-20 text-gray-400 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">Oops! Party Not Found</h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Looks like this page decided to skip the party! Don't worry, we've got plenty of other amazing events
              waiting for you.
            </p>
            <p className="text-gray-500">
              The page you're looking for might have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-12 border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-black mb-4">Find What You're Looking For</h2>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search events, providers, or venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-2 border-gray-300 focus:border-black"
                  />
                </div>
                <Button className="bg-black text-white hover:bg-gray-800 px-6">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>

              {/* Popular Searches */}
              <div className="text-sm text-gray-600 mb-4">Popular searches:</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs border-gray-300 hover:border-black hover:bg-black hover:text-white bg-transparent"
                    onClick={() => setSearchQuery(search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-8">Where Would You Like to Go?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.href}>
                  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-black h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                        <link.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-black mb-2 group-hover:text-gray-700">{link.label}</h3>
                      <p className="text-sm text-gray-600">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <Card className="border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-black mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our support team is here to help you find exactly what you're looking for. Get in touch and we'll get
                you back to planning amazing events!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                >
                  Contact Support
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800">Browse All Events</Button>
              </div>
            </CardContent>
          </Card>

          {/* Fun Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">10K+</div>
              <div className="text-sm text-gray-600">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">50K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">1K+</div>
              <div className="text-sm text-gray-600">Event Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl font-bold mb-4">EVENTORA</div>
          <p className="text-gray-400 mb-4">Making every event memorable since 2020</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
            <Link to="/help" className="hover:text-white transition-colors">
              Help Center
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
