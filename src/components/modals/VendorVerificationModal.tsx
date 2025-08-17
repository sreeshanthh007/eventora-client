
import { CheckCircle, Hourglass } from 'lucide-react'
import { useState, useEffect } from "react"

import { Button } from "@/components/pages/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/pages/ui/dialog"



export default function VerificationModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="
          sm:max-w-[425px] p-6
          flex flex-col items-center text-center
        "
      >
    
          <>
            <DialogHeader className="items-center space-y-4">
              <Hourglass className="h-16 w-16 text-yellow-500" />
              <DialogTitle className="text-3xl font-bold">Verification in Progress</DialogTitle>
              <DialogDescription className="text-lg text-gray-600 dark:text-gray-400">
                Thank you for submitting your ID proof. We are currently verifying your details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-base text-gray-700 dark:text-gray-300">
                During this period, you will not be able to access our services.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We will notify you via email once your verification is complete. This typically takes 24-48 hours.
              </p>
            </div>
            <DialogFooter className="flex justify-center pt-4">
              <Button className="w-full max-w-xs">
                Done
              </Button>
            </DialogFooter>
          </>

          // Verification Completed Modal
          <>
            <DialogHeader className="items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <DialogTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
                Verification Complete!
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-600 dark:text-gray-400">
                Congratulations! Your identity has been successfully verified.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-base text-green-800 dark:text-green-200 font-medium">
                  ✓ Identity verification successful
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  You now have full access to all our services and features.
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your account is now fully activated. You can start using all premium features immediately.
              </p>
            </div>
            <DialogFooter className="flex justify-center pt-4">
              <Button 
                // onClick={handleClose}
                className="w-full max-w-xs bg-green-600 hover:bg-green-700 text-white"
              >
                Get Started
              </Button>
            </DialogFooter>
          </>
      </DialogContent>
    </Dialog>
  )
}
