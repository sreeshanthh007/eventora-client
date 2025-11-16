// components/admin/BookedServicesByVendorsTable.tsx
import { Card } from '@/components/pages/ui/card';
import { Badge } from '@/components/pages/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/pages/ui/avatar';
import { Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import type { PaymentStatus } from '@/types/service';

interface BookedService {
  name: string;
  email: string;
  phone: string;
  bookingslot: {
    startDate: string;
    slotStartTime: string;
    slotEndTime: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: PaymentStatus;
  clientId: { name: string; email: string };
  vendorId: { name: string; email: string; profilePicture?: string };
  serviceId: { serviceTitle: string; servicePrice: number };
}

interface BookedServicesTableProps {
  services: BookedService[];
}

const serviceStatusConfig = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
};

const paymentStatusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  successfull: { label: 'Paid', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  failed: { label: 'Failed', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
};

export function BookedServicesByVendorsTable({ services }: BookedServicesTableProps) {
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Card className="overflow-hidden border border-border">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Booked Person</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Booking Slot</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Provider</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Service Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map((service, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    {/* Booked Person */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{service.name}</p>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <a href={`mailto:${service.email}`} className="text-xs text-blue-600 hover:underline">
                            {service.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <a href={`tel:${service.phone}`} className="text-xs text-blue-600 hover:underline">
                            {service.phone}
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Booking Slot */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          {formatDate(service.bookingslot.startDate)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(service.bookingslot.slotStartTime)} - {formatTime(service.bookingslot.slotEndTime)}
                        </p>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{service.serviceId.serviceTitle}</p>
                        <p className="text-sm font-semibold text-foreground">₹{service.serviceId.servicePrice}</p>
                      </div>
                    </td>

                    {/* Provider */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={service.vendorId.profilePicture ? `/uploads/${service.vendorId.profilePicture}` : "/placeholder.svg"}
                            alt={service.vendorId.name}
                          />
                          <AvatarFallback>{service.vendorId.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{service.vendorId.name}</p>
                          <a href={`mailto:${service.vendorId.email}`} className="text-xs text-blue-600 hover:underline truncate block">
                            {service.vendorId.email}
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{service.clientId.name}</p>
                        <a href={`mailto:${service.clientId.email}`} className="text-xs text-blue-600 hover:underline">
                          {service.clientId.email}
                        </a>
                      </div>
                    </td>

                    {/* Service Status */}
                    <td className="px-6 py-4">
                      <Badge className={serviceStatusConfig[service.status]?.className || ''}>
                        {serviceStatusConfig[service.status]?.label || service.status}
                      </Badge>
                    </td>

                    {/* Payment Status */}
                    <td className="px-6 py-4">
                      <Badge className={paymentStatusConfig[service.paymentStatus]?.className || ''}>
                        {paymentStatusConfig[service.paymentStatus]?.label || service.paymentStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-border">
            {services.map((service, index) => (
              <div key={index} className="p-4 space-y-4">
                {/* Service Title and Price */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{service.serviceId.serviceTitle}</h3>
                  <p className="text-sm font-bold text-foreground mt-1">₹{service.serviceId.servicePrice}</p>
                </div>

                {/* Booked Person */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">BOOKED PERSON</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{service.name}</p>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <a href={`mailto:${service.email}`} className="text-xs text-blue-600 hover:underline truncate">
                        {service.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <a href={`tel:${service.phone}`} className="text-xs text-blue-600 hover:underline">
                        {service.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Booking Slot */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">BOOKING SLOT</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(service.bookingslot.startDate)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(service.bookingslot.slotStartTime)} - {formatTime(service.bookingslot.slotEndTime)}
                    </p>
                  </div>
                </div>

                {/* Provider */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">PROVIDER</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={service.vendorId.profilePicture ? `/uploads/${service.vendorId.profilePicture}` : "/placeholder.svg"}
                        alt={service.vendorId.name}
                      />
                      <AvatarFallback>{service.vendorId.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{service.vendorId.name}</p>
                      <a href={`mailto:${service.vendorId.email}`} className="text-xs text-blue-600 hover:underline truncate block">
                        {service.vendorId.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Client */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">CLIENT</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{service.clientId.name}</p>
                    <a href={`mailto:${service.clientId.email}`} className="text-xs text-blue-600 hover:underline">
                      {service.clientId.email}
                    </a>
                  </div>
                </div>

                {/* Statuses */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">SERVICE STATUS</p>
                    <Badge className={`${serviceStatusConfig[service.status]?.className} text-xs`}>
                      {serviceStatusConfig[service.status]?.label || service.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">PAYMENT STATUS</p>
                    <Badge className={`${paymentStatusConfig[service.paymentStatus]?.className} text-xs`}>
                      {paymentStatusConfig[service.paymentStatus]?.label || service.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}