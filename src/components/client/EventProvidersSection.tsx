import { Star } from "lucide-react"
import { CardContent , Card } from "../pages/ui/card"


export const EventProvidersSection : React.FC = () => {
  return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Event Providers</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
                <Card
                  className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-black bg-white"
                >
                  <CardContent className="p-6">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <img
                        src={ "/placeholder.svg"}
                        className="object-cover rounded-full filter grayscale"
                      />
                    </div>
                    <h3 className="font-semibold text-black mb-1">zain</h3>
                    <p className="text-sm text-gray-600 mb-2">main</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-black text-black" />
                      <span className="text-sm font-medium text-black">5</span>
                    </div>
                  </CardContent>
                </Card>
        
            </div>
          </div>
        </div>
      </section>
  )
}
