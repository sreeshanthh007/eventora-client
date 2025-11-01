
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/pages/ui/dialog"
import { Button } from "@/components/pages/ui/button"
import { DownloadQRPDFButton } from "../common/button/DownloadQrButton"

interface ScanQrModalProps {
  isOpen: boolean
  onClose: () => void
  onStartScanning: () => void 
  eventId: string
  eventTitle: string
  qrValue: string
}

export function ScanQrModal({ 
  isOpen, 
  onClose, 
  onStartScanning, 
  eventId,
  eventTitle,
  qrValue 
}: ScanQrModalProps) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-balance">Scan to Track Attendees</DialogTitle>
          <DialogDescription>
            Use your scanner app to scan this QR code containing Event ID: {eventId}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          {/* QR Code Display */}
          <div className="rounded-lg p-4 bg-background border w-full">
            <div className="bg-white p-3 rounded-md flex justify-center">
              <img 
                src={qrValue} 
                alt="Event QR Code" 
                className="w-48 h-48" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <DownloadQRPDFButton 
              eventId={eventId}
              eventTitle={eventTitle}
              qrCodeUrl={qrValue}
            />
            
            <Button 
              onClick={onStartScanning}
              className="w-full"
              variant="default"
            >
              Start Scanning
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            This QR code contains only the Event ID for secure check-in
          </p>
        </div>
      </DialogContent>  
    </Dialog>
  )
}