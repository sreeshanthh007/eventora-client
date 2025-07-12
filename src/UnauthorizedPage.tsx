

import { Button } from "@/components/pages/ui/button"
import { Card , CardContent } from "./components/pages/ui/card"
import { ShieldX, ArrowLeft, LogIn, Home } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function UnauthorizedPage() {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="pt-8 pb-8 px-6 text-center">
       
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
            <ShieldX className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>

          
          <div className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-2">401</div>

         
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Unauthorized Access</h1>

     
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Sorry, you don't have permission to access this page. Please sign in with the appropriate credentials or
            contact your administrator.
          </p>

       
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/login">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>

              <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Contact{"EVENORA@gmail.com"}
              <Link to="/support" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>   
    </div>
  )
}
