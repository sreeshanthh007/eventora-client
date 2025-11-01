
import { Button } from "@/components/pages/ui/button"
import { Download } from "lucide-react"
import { downloadEventQRPDF , type QRPDFData } from "@/utils/helpers/DownloadQrPdf"
import { useState } from "react"
import { toast } from "sonner"

interface DownloadQRPDFButtonProps {
  eventId: string
  eventTitle: string
  qrCodeUrl: string
  disabled?: boolean
}

export function DownloadQRPDFButton({ 
  eventId,
  eventTitle,
  qrCodeUrl,
  disabled = false 
}: DownloadQRPDFButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (disabled || isDownloading) return
    
    setIsDownloading(true)
    try {
      const pdfData: QRPDFData = {
        eventId,
        eventTitle,
        qrCodeUrl
      }
      await downloadEventQRPDF(pdfData)
      toast.success("QR Code PDF downloaded successfully!")
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled || isDownloading}
      variant="outline"
      size="sm"
      className="w-full flex items-center gap-2"
    >
      {isDownloading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
          Generating...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  )
}