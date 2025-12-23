// File: src/components/common/skeletons/ServicesByVendorsSkeleton.tsx
import { Card } from '@/components/pages/ui/card';
import { Skeleton } from '@/components/pages/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/pages/ui/avatar';

interface ServicesByVendorsSkeletonProps {
  limit?: number;
}

export function ServicesByVendorsSkeleton({ limit = 6 }: ServicesByVendorsSkeletonProps) {
  const skeletonRows = Array.from({ length: limit }, (_, i) => i);

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
                {skeletonRows.map((key) => (
                  <tr key={key} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-4 w-56" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback />
                        </Avatar>
                        <Skeleton className="h-5 w-32" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Skeleton className="h-5 w-20 ml-auto" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-7 w-20 rounded-full" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-9 w-20" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-border">
            {skeletonRows.map((key) => (
              <div key={key} className="p-4 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Vendor</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback />
                      </Avatar>
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Price</p>
                    <Skeleton className="h-5 w-24 mt-1" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium">Status</p>
                    <Skeleton className="h-7 w-20 rounded-full mt-1" />
                  </div>

                  <div className="col-span-2">
                    <p className="text-muted-foreground text-xs font-medium mb-2">Action</p>
                    <Skeleton className="h-9 w-full" />
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