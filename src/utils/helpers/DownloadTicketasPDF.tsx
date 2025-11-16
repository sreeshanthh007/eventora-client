
import jsPDF from 'jspdf';
import { formatDateForInput } from './FormatDate';

interface EventSchedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface TicketData {
  ticketId: string;
  eventId: string;
  email: string;
  amount: number;
  qrCodeLink: string;
  paymentStatus: string;
  ticketStatus: string;
  ticketType: string;
  quantity: number;
  title: string;
  eventSchedule?: EventSchedule[];
  Images: string[];
}

const formatTime = (timeString: string) => {
  try {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  } catch {
    return timeString;
  }
};

export const downloadTicketPDF = async (ticket: TicketData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Colors
  const primaryColor = [37, 99, 235]; // Blue-600
  const secondaryColor = [243, 244, 246]; // Gray-100
  const textColor = [31, 41, 55]; // Gray-800
  const lightText = [107, 114, 128]; // Gray-500

  // Header Background
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 0, pageWidth, 50, 'F');

  // Logo/Brand Area (optional - you can add your logo here)
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EVENT TICKET', pageWidth / 2, 20, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Your Digital Pass', pageWidth / 2, 30, { align: 'center' });

  // Event Title
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  const titleLines = pdf.splitTextToSize(ticket.title, pageWidth - 40);
  pdf.text(titleLines, pageWidth / 2, 65, { align: 'center' });

  let yPos = 75 + (titleLines.length * 7);

  // Status Badges
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  
  // Ticket Status Badge
  const statusX = (pageWidth / 2) - 25;
  pdf.setFillColor(34, 197, 94); // Green for active
  pdf.roundedRect(statusX, yPos, 24, 8, 2, 2, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text(ticket.ticketStatus.toUpperCase(), statusX + 12, yPos + 5.5, { align: 'center' });

  // Ticket Type Badge
  const typeX = (pageWidth / 2) + 1;
  pdf.setFillColor(59, 130, 246); // Blue
  pdf.roundedRect(typeX, yPos, 24, 8, 2, 2, 'F');
  pdf.text(ticket.ticketType.toUpperCase(), typeX + 12, yPos + 5.5, { align: 'center' });

  yPos += 20;

  // Decorative Line
  pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.setLineWidth(0.5);
  pdf.line(20, yPos, pageWidth - 20, yPos);

  yPos += 15;

  // Event Schedule Section
  if (ticket.eventSchedule && ticket.eventSchedule.length > 0) {
    pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.roundedRect(20, yPos, pageWidth - 40, 10 + (ticket.eventSchedule.length * 10), 3, 3, 'F');
    
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('📅 EVENT SCHEDULE', 25, yPos + 7);

    yPos += 15;
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');

    ticket.eventSchedule.forEach((schedule) => {
      const dateText = formatDateForInput(schedule.date);
      const timeText = `${formatTime(schedule.startTime)} - ${formatTime(schedule.endTime)}`;
      pdf.text(`${dateText}  •  ${timeText}`, 25, yPos);
      yPos += 8;
    });

    yPos += 10;
  }

  // Ticket Information Grid
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'F');
  pdf.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'S');

  // Left Column
  let leftX = 25;
  let rightX = pageWidth / 2 + 5;
  let infoY = yPos + 10;

  pdf.setTextColor(lightText[0], lightText[1], lightText[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Ticket ID', leftX, infoY);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text(ticket.ticketId, leftX, infoY + 5);

  infoY += 15;
  pdf.setTextColor(lightText[0], lightText[1], lightText[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Email', leftX, infoY);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const emailLines = pdf.splitTextToSize(ticket.email, (pageWidth / 2) - 35);
  pdf.text(emailLines, leftX, infoY + 5);

  infoY += 15;
  pdf.setTextColor(lightText[0], lightText[1], lightText[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Quantity', leftX, infoY);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${ticket.quantity} Ticket${ticket.quantity > 1 ? 's' : ''}`, leftX, infoY + 5);

  // Right Column
  infoY = yPos + 10;
  pdf.setTextColor(lightText[0], lightText[1], lightText[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Amount Paid', rightX, infoY);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`₹${ticket.amount.toFixed(2)}`, rightX, infoY + 5);

  infoY += 15;
  pdf.setTextColor(lightText[0], lightText[1], lightText[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Payment Status', rightX, infoY);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text(ticket.paymentStatus.toUpperCase(), rightX, infoY + 5);

  infoY += 15;
  pdf.setTextColor(lightText[0], lightText[1], lightText[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Event ID', rightX, infoY);
  pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(ticket.eventId, rightX, infoY + 5);

  yPos += 65;

  // QR Code Section
  if (ticket.qrCodeLink) {
    try {
      // Center the QR code
      const qrSize = 50;
      const qrX = (pageWidth - qrSize) / 2;
      
      pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.roundedRect(qrX - 5, yPos, qrSize + 10, qrSize + 15, 3, 3, 'F');
      
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SCAN TO VERIFY', pageWidth / 2, yPos + 7, { align: 'center' });
      
      // Add QR code image
      pdf.addImage(ticket.qrCodeLink, 'PNG', qrX, yPos + 10, qrSize, qrSize);
    } catch (error) {
      console.error('Error adding QR code:', error);
    }
  }

  // Footer
  const footerY = pageHeight - 25;
  pdf.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  pdf.setLineWidth(0.3);
  pdf.line(20, footerY, pageWidth - 20, footerY);

  pdf.setTextColor(lightText[0], lightText[1], lightText[2]);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Please present this ticket at the venue entrance', pageWidth / 2, footerY + 5, { align: 'center' });
  pdf.text('Keep this ticket safe and do not share with others', pageWidth / 2, footerY + 10, { align: 'center' });
  
  pdf.setFontSize(7);
  pdf.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, pageWidth / 2, footerY + 15, { align: 'center' });

  // Save the PDF
  pdf.save(`ticket-${ticket.ticketId}.pdf`);
};