
import { CardContent  , Card  } from "../pages/ui/card"


import React from 'react'

export const PopularCategorySection : React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Popular Categories</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
       
              <Card
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-black"
              >
                <CardContent className="p-0">
                  <div className="relative h-40 overflow-hidden rounded-t-lg">
                    <img
                      src={"/placeholder.svg"}
                      className="object-cover group-hover:scale-105 transition-transform duration-300 filter grayscale"
                    />
                  </div>
                  <div className="p-4 text-center bg-white">
                    <h3 className="font-semibold text-black text-sm">wedding</h3>
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>
  )
}
