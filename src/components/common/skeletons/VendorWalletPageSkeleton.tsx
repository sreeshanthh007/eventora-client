// src/components/skeletons/VendorWalletPageSkeleton.tsx

import { VendorLayout } from "@/components/layouts/VendorLayout";
import { Card, CardContent } from "@/components/pages/ui/card";
import { Skeleton } from "@/components/pages/ui/skeleton";
import { Button } from "@/components/pages/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/pages/ui/table";

export function VendorWalletPageSkeleton() {
  return (
    <VendorLayout>
      <div className="space-y-6">
        {/* Page Title & Subtitle - Exact same spacing */}
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" /> {/* "My Wallet" */}
          <Skeleton className="h-5 w-80" /> {/* Description */}
        </div>

        {/* Wallet Card - Exact gradient, padding, and structure */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-lg">
          <CardContent className="pt-6 pb-8"> {/* Matches your real card padding */}
            <div className="space-y-8">
              {/* Balance Section */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-36 opacity-80" />
                <Skeleton className="h-14 w-72 rounded-lg" /> {/* Big balance text */}
              </div>

              {/* Account Type Row */}
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-primary-foreground/20">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-28 opacity-80" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
                <div /> {/* Empty column to match grid */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Table Card */}
        <Card className="overflow-hidden">
          {/* Header with Filter Buttons */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <Skeleton className="h-8 w-56" /> {/* "Transaction History" */}

            <div className="flex gap-3">
              {["All", "Credit", "Debit"].map((label) => (
                <Button key={label} variant="outline" size="sm" disabled className="px-4">
                  <Skeleton className="h-5 w-16" />
                </Button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {["Date", "Description", "Amount", "Currency", "Payment Type", "Payment For", "Status"].map((header) => (
                    <TableHead key={header} className="text-foreground font-medium">
                      <Skeleton className="h-5 w-20 mx-auto" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="py-4">
                      <Skeleton className="h-4 w-28" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-5 w-24 font-semibold" />
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-4 w-36" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="h-7 w-20 rounded-full mx-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 py-4 border-t bg-muted/20">
            <Skeleton className="h-9 w-20 rounded-md" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-9 w-9 rounded-md" />
            ))}
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </Card>
      </div>
    </VendorLayout>
  );
}