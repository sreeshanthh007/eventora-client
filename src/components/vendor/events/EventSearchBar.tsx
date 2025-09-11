import { Card, CardContent } from "@/components/pages/ui/card";
import { Input } from "@/components/pages/ui/input";
import { Search } from "lucide-react";

interface EventsSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function EventsSearchBar({ 
  searchTerm, 
  onSearchChange, 
  onSearchKeyPress 
}: EventsSearchBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="md:col-span-2">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={onSearchKeyPress}
              className="h-12 pl-10 bg-gray-50/80 border-gray-300 focus:border-gray-600 focus:ring-gray-600/20 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}