import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";
import { useScanAndVerifyAttendiesMutation } from "@/hooks/vendor/event/UseScanAndVerifyAttendies";
import { useToast } from "@/hooks/ui/UseToaster";
import { useNavigate } from "react-router-dom";
import { useVerifyTicketMutation } from "@/hooks/vendor/UseVerifyTicket";

interface QRScannerProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  scanningType:string
}

export default function QRScanner({ 
  eventId, 
  isOpen, 
  onClose, 
  onSuccess, 
  onError ,
  scanningType,
}: QRScannerProps) {
  const { mutate, isPending } = useScanAndVerifyAttendiesMutation();

  const {mutate:scanAndVerifyTicket} = useVerifyTicketMutation()
  const {showToast} = useToast()
  const navigate = useNavigate()
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
            qrbox: (viewfinderWidth, viewfinderHeight) => {
          const minEdgePercentage = 0.5;
          const edgeLength = Math.floor(
            Math.min(viewfinderWidth, viewfinderHeight) * minEdgePercentage
          );
          return { width: edgeLength, height: edgeLength };
        },
        rememberLastUsedCamera: true,
        showTorchButtonIfSupported: true,
      },
      false 
    );

    scannerRef.current = scanner;

    const onScanSuccess = (decodedText: string) => {
 
      console.log("decoded texxt",decodedText)
      if(!decodedText){
        showToast("qr scanned but  didnt catch !","error");
        return  
      }
      scanner.clear();
      onClose(); 
      
      if(scanningType=="scan-event"){
        mutate(
        {vendorId:decodedText,eventId:eventId},  
        {
          onSuccess: (res) => {
            showToast(res.message,"success");
            navigate("/vendor/verify-attendies", { 
              state: { eventData: res.response?.event} 
            });
          },
          onError: (err: any) => {
            showToast(err.response?.data?.message,"error")
          },
        }
      );
      }else if(scanningType=="verify-ticket"){
        const eventId = decodedText.split("|")[0]
        const ticketType = decodedText.split("|")[1]
        const ticketId = decodedText.split("|")[2]

        scanAndVerifyTicket(
          {eventId:eventId,ticketId:ticketId,ticketType:ticketType},
          {
            onSuccess:(res)=>{
              showToast(res.message,"success")
            },
            onError:(err)=>{
              showToast(err.response?.data?.message,"error")
            }
          }
        )
      }
    };

    const onScanError = (err: any) => {

      if (err && err !== "No MultiFormat Readers were able to detect the code.") {
        console.error("Scan error:", err);
      }
    };

    
    scanner.render(onScanSuccess, onScanError);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [isOpen, eventId, mutate, onClose, onSuccess, onError]);

  useEffect(() => {
    if (!isOpen) {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Scan Attendee QR Code</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div ref={containerRef} className="mb-4">
          <div 
            id="qr-reader" 
            className="w-full max-w-xs mx-auto h-64 border rounded-md"
          />
        </div>
        
        {isPending && (
          <div className="flex items-center justify-center py-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            <span className="text-sm">Verifying ticket...</span>
          </div>
        )}
        
        <div className="text-center text-sm text-muted-foreground">
          Position the QR code within the frame
        </div>
      </div>
    </div>  
  );
}