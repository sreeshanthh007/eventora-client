 
 import { Instagram , Facebook , Linkedin } from "lucide-react"

 import React from 'react'
 
 export const Footer : React.FC = () => {
   return (
     <footer className="bg-gray-900 text-white py-12 border-t-4 border-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EVENTORA</h3>
              <p className="text-gray-400 mb-4">
                Your ultimate party planning platform. Making events memorable since 2020.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Become Provider
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Event Planning
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Download App</h4>
              <p className="text-gray-400 mb-4">Get our mobile app for the best experience</p>
              <div className="space-y-2">
                <div className="bg-white text-black rounded-lg p-2 text-center border-2 border-white">
                  <p className="text-xs">Download on</p>
                  <p className="font-semibold">App Store</p>
                </div>
                <div className="bg-white text-black rounded-lg p-2 text-center border-2 border-white">
                  <p className="text-xs">Get it on</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Eventora. All rights reserved.</p>
          </div>
        </div>
      </footer>
   )
 }
 