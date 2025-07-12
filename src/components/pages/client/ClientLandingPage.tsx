
import {motion} from "framer-motion"

import { ClientLanding } from '@/components/client/ClientLanding'
export const ClientLandingPage = () => {
  return (
         <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <ClientLanding />
    </motion.div>
  )
}
