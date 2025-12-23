// src/components/admin/ServicesByVendors.tsx
import { Card } from '@/components/pages/ui/card';
import { Badge } from '@/components/pages/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/pages/ui/avatar';
import { Button } from '@/components/pages/ui/button';

interface Service {
  id: string;
  serviceTitle: string;
  description: string;
  servicePrice: number;
  status: 'active' | 'blocked';
  vendorName: string;
  profilePicture: string;
}

interface ServicesByVendorsProps {
  services: Service[];
  onToggleClick: (id: string, newStatus: 'active' | 'blocked', serviceTitle: string) => void;
  updatingServices: Set<string>;
}

const statusConfig = {
  active: { label: 'Active', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  blocked: { label: 'Blocked', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
};

export function ServicesByVendors({ services, onToggleClick, updatingServices }: ServicesByVendorsProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Card className="overflow-hidden border border-border">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Vendor</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map((service) => {
                  const isActive = service.status === "active";
                  const newStatus = isActive ? "blocked" : "active";

                  return (
                    <tr key={service.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate max-w-[220px]">
                            {service.serviceTitle}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2 max-w-[220px]">
                            {service.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={service.profilePicture} alt={service.vendorName} />
                            <AvatarFallback>{service.vendorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground truncate max-w-[120px]">
                            {service.vendorName}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-foreground">
                        ₹{service.servicePrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={statusConfig[service.status].className}>
                          {statusConfig[service.status].label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant={isActive ? "destructive" : "default"}
                          size="sm"
                          onClick={() => onToggleClick(service.id, newStatus, service.serviceTitle)}
                          disabled={updatingServices.has(service.id)}
                        >
                          {isActive ? "Block" : "Unblock"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-border">
            {services.map((service) => {
              const isActive = service.status === "active";
              const newStatus = isActive ? "blocked" : "active";

              return (
                <div key={service.id} className="p-4 space-y-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground">{service.serviceTitle}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Vendor</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={service.profilePicture} />
                          <AvatarFallback>{service.vendorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-foreground truncate">{service.vendorName}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Price</p>
                      <p className="text-foreground font-medium mt-1">₹{service.servicePrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium">Status</p>
                      <Badge className={`${statusConfig[service.status].className} text-xs mt-1`}>
                        {statusConfig[service.status].label}
                      </Badge>
                    </div>

                    <div className="col-span-2">
                      <p className="text-muted-foreground text-xs font-medium mb-2">Action</p>
                      <Button
                        variant={isActive ? "destructive" : "default"}
                        size="sm"
                        className="w-full"
                        onClick={() => onToggleClick(service.id, newStatus, service.serviceTitle)}
                        disabled={updatingServices.has(service.id)}
                      >
                        {isActive ? "Block" : "Unblock"}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}