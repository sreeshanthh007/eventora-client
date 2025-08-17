"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Label } from "@/components/pages/ui/label"
import { Textarea } from "@/components/pages/ui/textarea"
import { Button } from "@/components/pages/ui/button"
import { Calendar, Clock, MapPin, Ticket, Upload, X } from "lucide-react"
import LocationPicker from "../common/LocationPicker"

export function EventPageComponent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    pricePerTicket: "",
    totalTickets: "",
    ticketLimit: "",
    eventLocation: "",
  })

  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed")
      return
    }

    const newImages = [...images, ...files]
    setImages(newImages)

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleLocationSelect = (location: any) => {
    setFormData((prev) => ({ ...prev, eventLocation: location.address || location.name }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Event Data:", formData)
    console.log("Images:", images)
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Event</h1>
        <p className="text-gray-600">Fill in the details to create your event</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your event"
                rows={4}
                required
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Date & Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div>
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
                required
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Pricing & Tickets
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div>
              <Label htmlFor="pricePerTicket">Price per Ticket ($)</Label>
              <Input
                id="pricePerTicket"
                name="pricePerTicket"
                type="number"
                min="0"
                step="0.01"
                value={formData.pricePerTicket}
                onChange={handleInputChange}
                placeholder="0.00"
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="totalTickets">Total Tickets</Label>
              <Input
                id="totalTickets"
                name="totalTickets"
                type="number"
                min="1"
                value={formData.totalTickets}
                onChange={handleInputChange}
                placeholder="100"
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="ticketLimit">Ticket Limit per Person</Label>
              <Input
                id="ticketLimit"
                name="ticketLimit"
                type="number"
                min="1"
                value={formData.ticketLimit}
                onChange={handleInputChange}
                placeholder="5"
                required
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Event Location
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <LocationPicker onLocationSelect={handleLocationSelect} />
            {formData.eventLocation && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Selected Location:</p>
                <p className="font-medium">{formData.eventLocation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Event Images
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="images">Upload Images (Max 5)</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={images.length >= 5}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">{images.length}/5 images uploaded</p>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" className="px-12 py-3 text-lg">
            Create Event
          </Button>
        </div>
      </form>
    </div>
  )
}
