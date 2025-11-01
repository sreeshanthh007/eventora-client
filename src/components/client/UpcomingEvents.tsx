
import { Calendar, MapPin, Star, Users, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent } from "../pages/ui/card";
import { Button } from "../pages/ui/button";
import { UseGetAllEvents } from "@/hooks/client/UseGetAllEvents";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";
import { useNavigate } from "react-router-dom";

export interface IEvent {
  _id?: string;
  title: string;
  pricePerTicket: number;
  date: string;
  eventLocation: string;
  images?: string[];
  rating?: number;
  attendees?: string;
}

export const UpcomingEvents: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  const navigate = useNavigate();

  const { data, isLoading, error } = UseGetAllEvents();

  const events = data?.events || [];


  const formattedEvents = events.map((event: IEvent) => ({
    ...event,
    date: event.date ? event.date.split("T")[0] : "Date not available",
    price: event.pricePerTicket ? `$${event.pricePerTicket}` : "N/A",
    image: event.images?.[0]
      ? getCloudinaryImageUrl(event.images)
      : "/placeholder.svg?height=400&width=600&text=Event",
    rating: event.rating ?? 4.5,
    attendees: event.attendees ?? "TBC",
  }));

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900 font-serif">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">Loading events...</p>
          </div>
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-red-600 mt-4 text-lg">
              Failed to load events. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!formattedEvents || formattedEvents.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">
              No events available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const event = formattedEvents[currentEvent];

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % formattedEvents.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + formattedEvents.length) % formattedEvents.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900 font-serif">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">
            Don't miss out on these amazing events
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <Card className="border border-gray-200 shadow-lg bg-white">
              <CardContent className="p-0">
                <div className="relative h-96 md:h-[500px] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=400&width=600&text=Event";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Rating Badge */}
                  {/* <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-gray-900 font-semibold">{event.rating}</span>
                  </div> */}

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-blue-600 rounded-full px-3 py-1 text-sm font-semibold">
                        FEATURED
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{event.attendiesCount} attending</span>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      {event.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-6 mb-6 text-sm md:text-base">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <span>{event.eventLocation}</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">{event.pricePerTicket}</div>
                    </div>

                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                      onClick={() => navigate(`/event-details/${event.eventId}`)}
                    >
                      BOOK TICKET
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <button
            onClick={prevEvent}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-md transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextEvent}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-3 shadow-md transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {formattedEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEvent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentEvent ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};