"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Button } from "@/components/pages/ui/button";
import { Input } from "@/components/pages/ui/input";
import { Label } from "@/components/pages/ui/label";
import { Textarea } from "@/components/pages/ui/textarea";
import { Calendar } from "@/components/pages/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/pages/ui/popover";
import { Separator } from "@/components/pages/ui/separator";
import { CalendarIcon, Clock, IndianRupee, Award } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Service {
  _id: string;
  serviceTitle: string;
  yearsOfExperience: number;
  serviceDescription: string;
  servicePrice: number;
  additionalHourPrice: number;
  serviceDuration: number;
  termsAndConditions: string[];
  cancellationPolicies: string[];
}

interface ServiceDetailsProps {
  service: Service;
  onBookService: (bookingData: {
    serviceId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    date?: Date;
  }) => void;
}

export function ServiceDetails({ service, onBookService }: ServiceDetailsProps) {
  console.log("service is", service);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      date: undefined as Date | undefined,
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
      date: Yup.date()
        .min(new Date(new Date().setHours(0, 0, 0, 0)), "Date must be today or later")
        .required("Service date is required"),
      message: Yup.string(),
    }),
    onSubmit: (values) => {
      onBookService({
        serviceId: service._id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        date: values.date,
        message: values.message,
      });
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="space-y-6">
          {/* Service Details */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 mb-2">{service.serviceTitle}</CardTitle>
              <p className="text-gray-600 leading-relaxed">{service.serviceDescription}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pricing */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-blue-500" />
                    Pricing
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{service.servicePrice.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-600">Base Price</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{service.additionalHourPrice.toLocaleString("en-IN")}/hr
                    </p>
                    <p className="text-sm text-gray-600">Additional Hours</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {service.serviceDuration} hours</span>
                </div>
              </div>
              {/* Years of Experience */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Experience</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span>{service.yearsOfExperience} years of experience</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Booking Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Book This Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your full name"
                      required
                      className={cn(formik.touched.name && formik.errors.name ? "border-red-500" : "")}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm text-red-600">{formik.errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email"
                      required
                      className={cn(formik.touched.email && formik.errors.email ? "border-red-500" : "")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-sm text-red-600">{formik.errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your phone number"
                      required
                      className={cn(formik.touched.phone && formik.errors.phone ? "border-red-500" : "")}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-sm text-red-600">{formik.errors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Service Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formik.values.date && "text-muted-foreground",
                            formik.touched.date && formik.errors.date ? "border-red-500" : "",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formik.values.date ? format(formik.values.date, "PPP") : "Select service date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formik.values.date}
                          onSelect={(date) => formik.setFieldValue("date", date)}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {formik.touched.date && formik.errors.date && (
                      <p className="text-sm text-red-600">{formik.errors.date}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Tell us more about your service needs, special requirements, or questions..."
                    rows={4}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-sm text-red-600">{formik.errors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  size="lg"
                >
                  Book Service Now
                </Button>
              </form>
            </CardContent>
          </Card>
          {/* Terms and Policies */}
          <Card className="shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {service.termsAndConditions.map((term, index) => (
                    <li key={index}>• {term}</li>
                  ))}
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {service.cancellationPolicies.map((policy, index) => (
                    <li key={index}>• {policy}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}