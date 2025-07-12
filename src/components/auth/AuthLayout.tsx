import React from 'react'
import { Calendar, Users, MapPin, Clock, Star, Ticket, Music, Camera } from "lucide-react"
import { motion } from "framer-motion"
interface AuthLayoutProps {
    children:React.ReactNode;
    imageSrc:string,
    heading:string,
    subHeading:string
}
export const AuthLayout = ({ children, imageSrc, heading, subHeading }: AuthLayoutProps) => {
     const floatingIcons = [
    { Icon: Calendar, size: 28, position: "top-16 left-10", delay: 0 },
    { Icon: Users, size: 24, position: "top-32 right-16", delay: 0.1 },
    { Icon: MapPin, size: 26, position: "top-48 left-20", delay: 0.2 },
    { Icon: Clock, size: 22, position: "top-64 right-12", delay: 0.3 },
    { Icon: Star, size: 20, position: "top-80 left-16", delay: 0.4 },
    { Icon: Ticket, size: 24, position: "top-96 right-20", delay: 0.5 },
    { Icon: Music, size: 22, position: "bottom-80 left-12", delay: 0.6 },
    { Icon: Camera, size: 20, position: "bottom-64 right-16", delay: 0.7 },
    { Icon: Star, size: 18, position: "bottom-48 left-24", delay: 0.8 },
    { Icon: Ticket, size: 16, position: "bottom-32 right-8", delay: 0.9 },
    { Icon: Music, size: 20, position: "bottom-16 left-8", delay: 1.0 },
    { Icon: Camera, size: 18, position: "top-20 right-32", delay: 1.1 },
    { Icon: MapPin, size: 16, position: "top-40 left-32", delay: 1.2 },
    { Icon: Clock, size: 18, position: "top-60 right-8", delay: 1.3 },
    { Icon: Users, size: 22, position: "bottom-40 left-32", delay: 1.4 },
    { Icon: Calendar, size: 20, position: "bottom-60 right-32", delay: 1.5 },
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-black">

      <motion.div
        className="absolute inset-0 bg-black z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />


      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-black z-40 pointer-events-none"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 right-0 w-full h-full bg-black z-40 pointer-events-none"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
      />

    
      <motion.div
        className="lg:w-1/2 relative min-h-[50vh] lg:min-h-screen"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={imageSrc || "/placeholder.svg?height=1080&width=800"}
          alt="Event illustration"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>

     
      <motion.div
        className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent relative"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 1, type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="w-2 h-2 bg-gradient-to-r from-gray-800 to-black rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative flex items-center justify-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {floatingIcons.map(({ Icon, size, position, delay }, index) => (
            <motion.div
              key={index}
              className={`absolute ${position} text-gray-400/70`}
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                y: [0, -10, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                delay: delay, 
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Icon size={size} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="w-full max-w-md mx-8 space-y-8 relative z-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-black/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
            />

            <motion.div
              className="text-center mb-8 relative z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.h1
                className="text-3xl lg:text-4xl  bg-gradient-to-r from-gray-900 to-black bg-clip-text text-transparent mb-4 font-thin"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {heading}
              </motion.h1>
              <motion.p
                className="text-base text-gray-600 tracking-wide leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {subHeading}
              </motion.p>
            </motion.div>
            <motion.div
              className="relative z-10"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
