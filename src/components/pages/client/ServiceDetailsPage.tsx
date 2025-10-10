"use client";
import { ClientLayout } from "@/components/layouts/ClientLayout";
import { ServiceDetails } from "@/components/client/ServiceDetails";
import { useGetServiceDetails } from "@/hooks/client/UseGetServiceDetails";
import { Navigate, useParams } from "react-router-dom";
import { toast } from "sonner";

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

export default function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();

  console.log("Route ID:", id); // Debug: Log the route ID

  const {
    data: serviceData,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetServiceDetails(id || "");
  console.log("servfejrirfalkdfj",serviceData)
  if (serviceLoading) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600">Loading service details...</p>
          </div>
        </div>
      </ClientLayout>
    );
  }

  if (serviceError || !serviceData) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <p className="text-center text-red-600">{serviceError?.message || "Service not found."}</p>
          </div>
        </div>
      </ClientLayout>
    );
  }


  const handleBookService = (bookingData: {
    serviceId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    date?: Date;
  }) => {
 
    toast.success("bookeed successfully")
    Navigate("/service")
    
  };

  return (
    <ClientLayout>
      <ServiceDetails service={serviceData.service} onBookService={handleBookService} />
    </ClientLayout>
  );
}