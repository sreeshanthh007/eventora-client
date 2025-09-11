
import type React from "react";
import { useFormik } from "formik";
import { Calendar, Clock, MapPin, Upload, DollarSign, Users, FileText, ImageIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { Label } from "@/components/pages/ui/label";
import { Textarea } from "@/components/pages/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { eventSchema } from "@/utils/validations/addEventValidator";
import { useState, useEffect } from "react";
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage";
import LocationPicker from "../map/MapPicker";

export interface IEventFormData {
  title: string;
  description: string;
  eventSchedule: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  pricePerTicket: number;
  totalTicket: number;
  maxTicketPerUser: number;
  tickets: Array<{
    ticketType: string;
    price: number;
    totalTickets: number;
    maxTicketsPerUser: number;
  }>;
  eventLocation: string;
  location: [number, number] | null;
  Images: File[] | string[];
  eventType?: "row" | "normal";
}

interface EditEventFormProps {
  initialData?: Partial<IEventFormData>;
  onSubmit: (data: IEventFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function EditEventForm({ initialData, onSubmit, onCancel, isSubmitting }: EditEventFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const formik = useFormik<IEventFormData>({
    enableReinitialize: true,
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      eventSchedule: initialData?.eventSchedule!,
      pricePerTicket: initialData?.pricePerTicket || 0,
      totalTicket: initialData?.totalTicket || 0,
      maxTicketPerUser: initialData?.maxTicketPerUser || 0,
      tickets: initialData?.tickets || [],
      eventLocation: initialData?.eventLocation || "",
      location: initialData?.location || null,
      Images: initialData?.Images || [],
      eventType: initialData?.eventType || "normal",
    },
    validationSchema: eventSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    if (initialData?.Images) {
      setPreviewImages(
        initialData.Images.map((img) => (typeof img === "string" ? getCloudinaryImageUrl(img) : URL.createObjectURL(img))),
      );
    }
  }, [initialData]);

  const handleLocationSelect = (lat: number, lng: number) => {
    formik.setFieldValue("location", [lng, lat]);
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
      formik.values.Images.filter((_, i) => i !== index),
    );
  };

  const addSchedule = () => {
    formik.setFieldValue("eventSchedule", [
      ...formik.values.eventSchedule,
      { date: "", startTime: "", endTime: "" },
    ]);
  };

  const removeSchedule = (index: number) => {
    formik.setFieldValue(
      "eventSchedule",
      formik.values.eventSchedule.filter((_, i) => i !== index),
    );
  };

  const addTicket = () => {
    formik.setFieldValue("tickets", [
      ...formik.values.tickets,
      { ticketType: "", price: 0, totalTickets: 0, maxTicketsPerUser: 0 },
    ]);
  };

  const removeTicket = (index: number) => {
    formik.setFieldValue(
      "tickets",
      formik.values.tickets.filter((_, i) => i !== index),
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Basic Information */}
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
              <Label htmlFor="title">Event Name *</Label>
              <Input
                id="title"
                placeholder="Enter event name"
                {...formik.getFieldProps("title")}
                disabled={isSubmitting}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-sm text-red-500">{formik.errors.title}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your event in detail..."
              className="min-h-[120px]"
              {...formik.getFieldProps("description")}
              disabled={isSubmitting}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Event Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Event Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formik.values.eventSchedule.map((schedule, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`eventSchedule[${index}].date`}>Event Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`eventSchedule[${index}].date`}
                    type="date"
                    className="pl-10"
                    {...formik.getFieldProps(`eventSchedule[${index}].date`)}
                    disabled={isSubmitting}
                  />
                  {formik.touched.eventSchedule?.[index]?.date && formik.errors.eventSchedule?.[index]?.date && (
                    <p className="text-sm text-red-500">{formik.errors.eventSchedule[index].date}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`eventSchedule[${index}].startTime`}>Start Time *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={`eventSchedule[${index}].startTime`}
                    type="time"
                    className="pl-10"
                    {...formik.getFieldProps(`eventSchedule[${index}].startTime`)}
                    disabled={isSubmitting}
                  />
                  {formik.touched.eventSchedule?.[index]?.startTime && formik.errors.eventSchedule?.[index]?.startTime && (
                    <p className="text-sm text-red-500">{formik.errors.eventSchedule[index].startTime}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`eventSchedule[${index}].endTime`}>End Time *</Label>
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={`eventSchedule[${index}].endTime`}
                      type="time"
                      className="pl-10"
                      {...formik.getFieldProps(`eventSchedule[${index}].endTime`)}
                      disabled={isSubmitting}
                    />
                  </div>
                  {formik.values.eventSchedule.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSchedule(index)}
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {formik.touched.eventSchedule?.[index]?.endTime && formik.errors.eventSchedule?.[index]?.endTime && (
                  <p className="text-sm text-red-500">{formik.errors.eventSchedule[index].endTime}</p>
                )}
              </div>
            </div>
          ))}
          {formik.values.eventType === "row" && (
            <Button
              type="button"
              variant="outline"
              onClick={addSchedule}
              disabled={isSubmitting}
              className="mt-4"
            >
              Add Another Schedule
            </Button>
          )}
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
        <CardContent className="space-y-4">
          {formik.values.eventType === "row" ? (
            <>
              {formik.values.tickets.map((ticket, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`tickets[${index}].ticketType`}>Ticket Type *</Label>
                    <Input
                      id={`tickets[${index}].ticketType`}
                      placeholder="e.g., General Admission"
                      {...formik.getFieldProps(`tickets[${index}].ticketType`)}
                      disabled={isSubmitting}
                    />
                    {formik.touched.tickets?.[index]?.ticketType && formik.errors.tickets?.[index]?.ticketType && (
                      <p className="text-sm text-red-500">{formik.errors.tickets[index].ticketType}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`tickets[${index}].price`}>Price *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`tickets[${index}].price`}
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        {...formik.getFieldProps(`tickets[${index}].pricePerTicket`)}
                        disabled={isSubmitting}
                      />
                      {formik.touched.tickets?.[index]?.pricePerTicket && formik.errors.tickets?.[index]?.pricePerTicket && (
                        <p className="text-sm text-red-500">{formik.errors.tickets[index].pricePerTicket}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`tickets[${index}].totalTickets`}>Total Tickets *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`tickets[${index}].totalTickets`}
                        type="number"
                        placeholder="100"
                        className="pl-10"
                        {...formik.getFieldProps(`tickets[${index}].totalTickets`)}
                        disabled={isSubmitting}
                      />
                      {formik.touched.tickets?.[index]?.totalTickets && formik.errors.tickets?.[index]?.totalTickets && (
                        <p className="text-sm text-red-500">{formik.errors.tickets[index].totalTickets}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`tickets[${index}].maxTicketsPerUser`}>Max Tickets Per User *</Label>
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id={`tickets[${index}].maxTicketsPerUser`}
                          type="number"
                          placeholder="10"
                          className="pl-10"
                          {...formik.getFieldProps(`tickets[${index}].maxTicketsPerUser`)}
                          disabled={isSubmitting}
                        />
                      </div>
                      {formik.values.tickets.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeTicket(index)}
                          disabled={isSubmitting}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {formik.touched.tickets?.[index]?.maxTicketsPerUser && formik.errors.tickets?.[index]?.maxTicketsPerUser && (
                      <p className="text-sm text-red-500">{formik.errors.tickets[index].maxTicketsPerUser}</p>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addTicket}
                disabled={isSubmitting}
                className="mt-4"
              >
                Add Ticket Type
              </Button>
            </>
          ) : (
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
                    disabled={isSubmitting}
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
                    id="totalTicket"
                    type="number"
                    placeholder="100"
                    className="pl-10"
                    {...formik.getFieldProps("totalTicket")}
                    disabled={isSubmitting}
                  />
                  {formik.touched.totalTicket && formik.errors.totalTicket && (
                    <p className="text-sm text-red-500">{formik.errors.totalTicket}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxTicketPerUser">Max Tickets Per User *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="maxTicketPerUser"
                    type="number"
                    placeholder="10"
                    className="pl-10"
                    {...formik.getFieldProps("maxTicketPerUser")}
                    disabled={isSubmitting}
                  />
                  {formik.touched.maxTicketPerUser && formik.errors.maxTicketPerUser && (
                    <p className="text-sm text-red-500">{formik.errors.maxTicketPerUser}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Event Location */}
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
                    disabled={isSubmitting}
                  />
                  {formik.touched.eventLocation && formik.errors.eventLocation && (
                    <p className="text-sm text-red-500">{String(formik.errors.eventLocation)}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Map Location</Label>
                <div className="rounded-lg border overflow-hidden">
                  <LocationPicker
                    onLocationSelect={handleLocationSelect}
                    initialLocation={formik.values.location}
                  />
                </div>
              </div>
            </div>
            {formik.values.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  Selected Coordinates: [{formik.values.location[0]}, {formik.values.location[1]}]
                </span>
              </div>
            )}
            {formik.touched.location && formik.errors.location && (
              <p className="text-sm text-red-500">{String(formik.errors.location)}</p>
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
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Updating...
            </div>
          ) : (
            "Update Event"
          )}
        </Button>
      </div>
    </form>
  );
}
