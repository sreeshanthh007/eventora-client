
export interface QRPDFData {
  eventId: string;
  eventTitle: string;
  qrCodeUrl: string;
}

export async function generateEventQRPDF(data: QRPDFData, filename: string = 'event-qr-code.pdf') {
  const { jsPDF: PDF } = await import('jspdf');
  const doc = new PDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const qrSize = 100; 

  // Event Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(data.eventTitle, margin, 30);

  // Event ID
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Event ID: ${data.eventId}`, margin, 50);

  // Instructions
  doc.setFontSize(12);
  doc.text('Scan this QR code to check-in attendees', margin, 70);

  // Center QR code
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = 90;

  try {
    const qrResponse = await fetch(data.qrCodeUrl);
    const qrBlob = await qrResponse.blob();
    
    return new Promise<void>((resolve, reject) => {
      const qrImg = new Image();
      
      qrImg.onload = () => {
        try {
          doc.addImage(qrImg, 'PNG', qrX, qrY, qrSize, qrSize);
          
          // Add scan area guide
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(1);
          doc.rect(qrX - 5, qrY - 5, qrSize + 10, qrSize + 10);
          
          // Footer
          doc.setFontSize(10);
          doc.setFont('helvetica', 'italic');
          const footerY = qrY + qrSize + 20;
          doc.text('Print and display this QR code at event entrance', margin, footerY);
          
          doc.save(filename);
          resolve();
        } catch (error) {
          console.error('Error adding QR code to PDF:', error);
          doc.text('QR Code Image Unavailable', qrX + qrSize/4, qrY + qrSize/2);
          doc.save(filename);
          resolve();
        }
      };
      
      qrImg.onerror = () => {
        console.error('Error loading QR code image');
        doc.text('QR Code Image Unavailable', qrX + qrSize/4, qrY + qrSize/2);
        doc.save(filename);
        resolve();
      };
      
      qrImg.src = URL.createObjectURL(qrBlob);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    doc.text('QR Code Unavailable', qrX + qrSize/4, qrY + qrSize/2);
    doc.save(filename);
    throw error;
  }
}

export function downloadEventQRPDF(data: QRPDFData) {
  const cleanTitle = data.eventTitle.replace(/[^a-z0-9]/gi, '_').substring(0, 50);
  const filename = `Event-QR-${data.eventId}-${cleanTitle}.pdf`;
  return generateEventQRPDF(data, filename);
}