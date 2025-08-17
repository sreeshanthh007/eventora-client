import React from "react";
import { Card, CardContent } from "../pages/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { UseGetAllCategories } from "@/hooks/client/UseGetAllCategories";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";

export const CategoriesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;


  const { data, isLoading, error } = UseGetAllCategories();
  console.log("data", data);


  const categories = data?.categories || [];

  const nextSlide = () => {
    if (categories) {
      setCurrentIndex((prev) => (prev + itemsPerView >= categories.length ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (categories) {
      setCurrentIndex((prev) => (prev === 0 ? Math.max(0, categories.length - itemsPerView) : prev - 1));
    }
  };


  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">Popular Categories</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">Loading categories...</p>
          </div>
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }


  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">Popular Categories</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-red-600 mt-4 text-lg">Failed to load categories. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">Popular Categories</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">No categories available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">Popular Categories</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Discover amazing events across different categories</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {categories.map((category, index) => (
                <div key={category.categoryId || index} className="w-1/5 flex-shrink-0 px-3">
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white hover:border-blue-300">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={category.image ? getCloudinaryImageUrl(category.image) : "/placeholder.svg?height=200&width=200&text=Category"}
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg?height=200&width=200&text=Category";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <div className="p-6 text-center bg-white">
                        <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-600 transition-colors duration-300">
                          {category.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {categories.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-blue-400 rounded-full p-3 shadow-md transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 border border-gray-300 hover:border-blue-400 rounded-full p-3 shadow-md transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};