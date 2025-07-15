 
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react"

 import React from 'react'
 
 export const Footer : React.FC = () => {
   return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white py-16 border-t-4 border-gradient-to-r from-purple-500 to-pink-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                EVENTORA
              </span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your ultimate party planning platform. Making events memorable since 2020.
              <span className="text-purple-400 font-semibold"> Creating magic, one event at a time.</span>
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-12" />
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-purple-300">Support</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-purple-300">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  Browse Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  Become Provider
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  Event Planning
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & App Section */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-purple-300">Get In Touch</h4>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-sm">hello@eventora.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-purple-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>

            {/* App Download */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg p-3 text-center border border-purple-400 cursor-pointer transition-all duration-300 hover:scale-105">
                <p className="text-xs text-purple-200">Download on</p>
                <p className="font-bold">App Store</p>
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg p-3 text-center border border-purple-400 cursor-pointer transition-all duration-300 hover:scale-105">
                <p className="text-xs text-purple-200">Get it on</p>
                <p className="font-bold">Google Play</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">&copy; 2024 Eventora. All rights reserved.</p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400">Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span className="text-gray-400">for amazing events</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
 }
 