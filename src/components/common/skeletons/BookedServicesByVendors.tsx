import { Card } from "@/components/pages/ui/card";
import { Skeleton } from "@/components/pages/ui/skeleton";

export function BookedServicesByVendorsSkeleton({limit}:{limit:number}) {
  const fakeRows = Array.from({ length: limit });

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <Card className="overflow-hidden border border-border">
          {/* Desktop Table Skeleton */}
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
                    Vendor
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {fakeRows.map((_, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-48" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-36" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Skeleton */}
          <div className="md:hidden divide-y divide-border">
            {fakeRows.map((_, i) => (
              <div key={i} className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-20 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div>
                    <Skeleton className="h-3 w-14 mb-1" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-3 w-14 mb-1" />
                    <Skeleton className="h-4 w-16 font-medium" />
                  </div>
                  <div className="col-span-2">
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-6 w-24 rounded-full mt-1" />
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