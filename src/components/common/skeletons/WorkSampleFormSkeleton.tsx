
import { Card, CardContent, CardHeader, CardTitle } from "@/components/pages/ui/card";
import { Skeleton } from "@/components/pages/ui/skeleton";

export function WorkSampleFormSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-lg">
            <Skeleton className="h-7 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-4 w-80" />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" />

            {/* Dropzone */}
            <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-10 bg-muted/20">
              <div className="flex flex-col items-center gap-4 text-center">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-5 w-64" />
                <Skeleton className="h-10 w-40 rounded-md" />
                <Skeleton className="h-8 w-32 rounded-full" />
              </div>
            </div>

            {/* Image Previews Grid (3 placeholders) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative">
                  <Skeleton className="h-32 w-full rounded-lg" />
                  <Skeleton className="absolute top-2 right-2 h-7 w-7 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Skeleton className="h-11 w-full md:w-56 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}