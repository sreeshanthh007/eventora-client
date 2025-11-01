import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/pages/ui/dialog";
import { Button } from "@/components/pages/ui/button";

interface Ticket {
  name: string;
  qrCode: string;
}

interface VerifyTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTicket: Ticket | null;
  onConfirmCheckIn: () => void;
}

export function VerifyTicketModal({
  isOpen,
  onClose,
  selectedTicket,
  onConfirmCheckIn,
}: VerifyTicketModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Ticket for {selectedTicket?.name}</DialogTitle>
          <DialogDescription>
            Scan the QR code to confirm attendance for this ticket.
          </DialogDescription>
        </DialogHeader>
        {selectedTicket && (
          <div className="flex justify-center my-4">
            <img 
              src={selectedTicket.qrCode} 
              alt="QR Code" 
              className="max-w-full h-auto border rounded-md" 
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirmCheckIn} 
          >
            Scan Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}