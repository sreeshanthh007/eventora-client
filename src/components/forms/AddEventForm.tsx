import type React from "react";
import { useFormik } from "formik";
import { Calendar, Clock, MapPin, Upload, DollarSign, Users, FileText, ImageIcon } from "lucide-react";
import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { Label } from "@/components/pages/ui/label";
import { Textarea } from "@/components/pages/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import LocationPicker from "../map/MapPicker";
import { eventSchema } from "@/utils/validations/addEventValidator";
import { useState } from "react";

export interface IEventFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  pricePerTicket: string;
  totalTicket: string;
  ticketLimit: string;
  eventLocation: string;
  coordinates: [number, number] | null;
  Images: string[];
}

export function AddEventForm({ onSubmit }: { onSubmit: (data: IEventFormData) => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const formik = useFormik<IEventFormData>({
    initialValues: {
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      pricePerTicket: "",
      totalTicket: "",
      ticketLimit: "",
      eventLocation: "",
      coordinates: null,
      Images: [],
    },
    validationSchema: eventSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleLocationSelect = (lat: number, lng: number) => {
    formik.setFieldValue("coordinates", [lng, lat]);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews: string[] = [];

    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string);
            if (newPreviews.length === newFiles.length) {
              setPreviewImages((prev) => [...prev, ...newPreviews]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });

    formik.setFieldValue("Images", [...formik.values.Images, ...newFiles]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    formik.setFieldValue(
      "Images",
      formik.values.Images.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (data: IEventFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventName">Event Name *</Label>
              <Input
                id="eventName"
                placeholder="Enter event name"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-sm text-red-500">{formik.errors.title}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="eventDate"
                  type="date"
                  className="pl-10"
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date && (
                  <p className="text-sm text-red-500">{formik.errors.date}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your event in detail..."
              className="min-h-[120px]"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Time & Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Time & Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startTime"
                  type="time"
                  className="pl-10"
                  {...formik.getFieldProps("startTime")}
                />
                {formik.touched.startTime && formik.errors.startTime && (
                  <p className="text-sm text-red-500">{formik.errors.startTime}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endTime"
                  type="time"
                  className="pl-10"
                  {...formik.getFieldProps("endTime")}
                />
                {formik.touched.endTime && formik.errors.endTime && (
                  <p className="text-sm text-red-500">{formik.errors.endTime}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Pricing & Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricePerTicket">Price per Ticket *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pricePerTicket"
                  type="number"
                  placeholder="0.00"
                  className="pl-10"
                  {...formik.getFieldProps("pricePerTicket")}
                />
                {formik.touched.pricePerTicket && formik.errors.pricePerTicket && (
                  <p className="text-sm text-red-500">{formik.errors.pricePerTicket}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalTicket">Total Tickets *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="totalTickets"
                  type="number"
                  placeholder="100"
                  className="pl-10"
                  {...formik.getFieldProps("totalTicket")}
                />
                {formik.touched.totalTicket && formik.errors.totalTicket && (
                  <p className="text-sm text-red-500">{formik.errors.totalTicket}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticketLimit">Ticket Limit per Person</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="ticketLimit"
                  type="number"
                  placeholder="5"
                  className="pl-10"
                  {...formik.getFieldProps("ticketLimit")}
                />
                {formik.touched.ticketLimit && formik.errors.ticketLimit && (
                  <p className="text-sm text-red-500">{formik.errors.ticketLimit}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Event Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventLocation">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="eventLocation"
                    placeholder="Enter event location (e.g., 123 Main St, City, Country)"
                    className="pl-10"
                    {...formik.getFieldProps("eventLocation")}
                  />
                  {formik.touched.eventLocation && formik.errors.eventLocation && (
                    <p className="text-sm text-red-500">{String(formik.errors.eventLocation)}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Map Location</Label>
                <div className="rounded-lg border overflow-hidden">
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </div>
              </div>
            </div>
            {formik.values.coordinates && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  Selected Coordinates: [{formik.values.coordinates[0].toFixed(6)}, {formik.values.coordinates[1].toFixed(6)}]
                </span>
              </div>
            )}
            {formik.touched.coordinates && formik.errors.coordinates && (
              <p className="text-sm text-red-500">{String(formik.errors.coordinates)}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Event Images */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Event Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Drop images here or click to upload</p>
                <p className="text-sm text-muted-foreground">Support for JPG, PNG, GIF up to 10MB each</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={(e) => handleImageUpload(e.target.files)}
              />
              <Button
                type="button"
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                Choose Files
              </Button>
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {formik.touched.Images && formik.errors.Images && (
              <p className="text-sm text-red-500">{String(formik.errors.Images)}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          Create Event
        </Button>
      </div>
    </form>
  );
}