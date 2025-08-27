
import { Shield } from "lucide-react"

export const AdminHeader = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Portal</h1>
          </div>
        </div>
      </div>
    </header>
  )
}
