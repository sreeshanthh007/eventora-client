import { Button } from "@/components/pages/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Badge } from "@/components/pages/ui/badge";
import { Clock, IndianRupee } from "lucide-react";
import { Pagination } from "../common/paginations/Pagination";
import { Link } from "react-router-dom";

interface Service {
  serviceTitle: string;
  yearsOfExperience: number;
  serviceDescription: string;
  servicePrice: number;
  categoryName: string;
}

interface ServicesGridProps {
  services: Service[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ServicesGrid({ services, currentPage, totalPages, onPageChange }: ServicesGridProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{services.length}</span> services
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-card"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-xl font-bold leading-tight text-balance group-hover:text-primary transition-colors">
                  {service.serviceTitle}
                </CardTitle>
                <Badge variant="secondary" className="shrink-0 font-medium">
                  {service.categoryName}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Experience Badge */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {service.yearsOfExperience} {service.yearsOfExperience === 1 ? "year" : "years"} experience
                </span>
              </div>
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{service.serviceDescription}</p>
              <div className="flex items-center justify-start pt-2 border-t border-border/50">
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">
                    {service.servicePrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              {/* Action Button */}
              <Link to={`/service/${service._id}`}>
              
              <Button
                className="w-full mt-4 font-semibold group-hover:bg-primary/90 transition-colors"
              >
                View Service
              </Button>
              
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
      <div className="flex justify-center mt-6"></div>
    </div>
  );
}