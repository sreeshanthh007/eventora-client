// components/vendor/VendorBookedServicesSkeleton.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card"
import { Input } from "@/components/pages/ui/input"
import { Search } from "lucide-react"
import { Skeleton } from "@/components/pages/ui/skeleton"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/pages/ui/pagination"

interface VendorBookedServicesSkeletonProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  limit?: number 
}

export function VendorBookedServicesSkeleton({
  searchTerm,
  onSearchChange,
  limit = 6,
}: VendorBookedServicesSkeletonProps) {
  const fakeRows = Array.from({ length: limit })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Booked Services</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all your service bookings
          </p>
        </div>
        <Skeleton className="h-6 w-48" /> 
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by customer name, email, or booking ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table Card with Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Your Beautiful Responsive Skeleton */}
          <div className="w-full overflow-x-auto -mx-6 px-6">
            <div className="inline-block min-w-full align-middle">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Service
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Date & Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {fakeRows.map((_, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-36" />
                              <Skeleton className="h-3 w-28" />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-4 w-48" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-7 w-20 rounded-full" />
                        </td>
                        <td className="px-6 py-4">
                          <Skeleton className="h-5 w-20 font-medium" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Skeleton className="h-9 w-20 rounded-md" />
                            <Skeleton className="h-9 w-20 rounded-md" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {fakeRows.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-card p-4 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-14" />
                        <Skeleton className="h-7 w-20 rounded-full" />
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-3 w-14" />
                        <Skeleton className="h-5 w-20 font-medium" />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Skeleton className="h-9 flex-1 rounded-md" />
                      <Skeleton className="h-9 flex-1 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Skeleton */}
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
                </PaginationItem>
                {[...Array(5)].map((_, i) => (
                  <PaginationItem key={i}>
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" className="pointer-events-none opacity-50" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}