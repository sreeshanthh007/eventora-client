

import { Button } from "@/components/pages/ui/button"
import { Badge } from "@/components/pages/ui/badge"
import { TableCell, TableRow } from "@/components/pages/ui/table"
import { Edit, Eye, EyeOff, QrCode } from "lucide-react"
import { getCloudinaryImageUrl } from "@/utils/helpers/GetCloudinaryImage"
import { EventStatusSelect } from "./EventStatusSelect"
import type { Event, EventStatus } from "@/types/event"
import { formatDateForInput } from "@/utils/helpers/FormatDate"
import { useState } from "react"
import { ScanQrModal } from "@/components/modals/ScanQrModal"
import QRScanner from "../QrScanner"

interface EventTableRowProps {
  event: Event
  onToggleStatus: (eventId: string, currentStatus: boolean) => void
  onStatusChange: (eventId: string, status: EventStatus) => void
  onEdit: (eventId: string) => void

  isLoading?: boolean
}

export function EventTableRow({ 
  event, 
  onToggleStatus, 
  onStatusChange, 
  onEdit, 

  isLoading 
}: EventTableRowProps) {
const [isScanOpen, setIsScanOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleStartScanning = () => {
  
    setShowScanner(true);
    setScanResult(null);
  };

  const handleScannerClose = () => {
    setShowScanner(false);
  };

  const handleScanSuccess = (message: string) => {
    setScanResult({ type: 'success', message });
    setTimeout(() => {
      setShowScanner(false);
      setScanResult(null);
    }, 2000);
  };

  const handleScanError = (message: string) => {
    setScanResult({ type: 'error', message });
    setTimeout(() => {
      setScanResult(null);
    }, 3000);
  };


const formattedDates = event.eventSchedule.map(item =>
  formatDateForInput(item.date)
);

const renderDates = (dates: string[]) => {
  return dates.length > 0 ? (
    <ul>
      {dates.map((date, index) => (
        <li key={index}>{date}</li>
      ))}
    </ul>
  ) : (
    "No dates"
  );
};
  const qrValue = event.qrCode

  

  return (
    <TableRow>
      <TableCell>
        <img
          src={event.image ? getCloudinaryImageUrl(event.image) : "/placeholder.svg"}
          alt={event.title}
          className="w-12 h-12 object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"
          }}
        />
      </TableCell>
      <TableCell className="font-medium">{event.title}</TableCell>
      <TableCell>
        {renderDates(formattedDates)}
      </TableCell>
      <TableCell>${event.pricePerTicket}</TableCell>
      <TableCell>{event.totalTicket}</TableCell>
      <TableCell>
        <Badge variant={event.isActive ? "default" : "destructive"}>{event.isActive ? "Active" : "Blocked"}</Badge>
      </TableCell>
      <TableCell>
        <EventStatusSelect value={event.status} onChange={(status) => onStatusChange(event._id, status)} />
      </TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-transparent"
          disabled={isLoading}
          onClick={() => setIsScanOpen(true)}
        >
          <QrCode className="h-4 w-4" />
          Scan QR
        </Button>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleStatus(event._id, event.isActive)}
            className={`flex items-center gap-1 ${
              event.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"
            }`}
            disabled={isLoading}
          >
            {event.isActive ? (
              <>
                <EyeOff className="h-4 w-4" />
                Block
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Unblock
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(event._id)}
            className="flex items-center gap-1"
            disabled={isLoading}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </div>
      </TableCell>
      
      <ScanQrModal 
        isOpen={isScanOpen} 
        onClose={() => setIsScanOpen(false)} 
        onStartScanning={handleStartScanning}
        eventId={event._id}
        eventTitle={event.title}
        qrValue={qrValue} 
      />

      <QRScanner
      scanningType="scan-event"
        eventId={event._id}
        isOpen={showScanner}
        onClose={handleScannerClose}
        onSuccess={handleScanSuccess}
        onError={handleScanError}
      />
    </TableRow>
  )
}