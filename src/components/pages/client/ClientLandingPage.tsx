"use client"
import { motion } from "framer-motion"
import { ClientLayout } from "@/components/layouts/ClientLayout"
import { ClientLanding } from "@/components/client/ClientLanding"

export const ClientLandingPage = () => {
  return (
    <ClientLayout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          type: "spring",
          damping: 15,
        }}
      >
        <ClientLanding />
      </motion.div>
    </ClientLayout>
  )
}
