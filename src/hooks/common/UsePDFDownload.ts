// hooks/usePDFDownload.ts
import { RefObject, useCallback } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface UsePDFDownloadProps {
  title: string
  filters?: {
    period: string
    startDate?: string
    endDate?: string
  }
  contentRef: RefObject<HTMLDivElement>
}

export const usePDFDownload = ({ title, filters, contentRef }: UsePDFDownloadProps) => {
  const handleDownload = useCallback(async () => {
    if (!contentRef.current) return

    // Scroll to top for clean capture
    if (contentRef.current.scrollIntoView) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    await new Promise(resolve => setTimeout(resolve, 1000)) // Wait for animations to settle

    try {
      // Create PDF with better fonts and styling
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      // Set beautiful fonts (using Helvetica for default beauty)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(24)
      pdf.setTextColor(31, 41, 55) // slate-900
      pdf.text(title, pageWidth / 2, 40, { align: 'center' })

      // Subtitle
      pdf.setFontSize(14)
      pdf.setTextColor(71, 85, 105) // slate-600
      pdf.text('Analytics Report', pageWidth / 2, 55, { align: 'center' })

      // Generation date
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      pdf.setFontSize(10)
      pdf.text(`Generated on: ${currentDate}`, pageWidth / 2, 70, { align: 'center' })

      // Filters info
      if (filters) {
        let yPos = 85
        pdf.setFontSize(10)
        pdf.setTextColor(107, 114, 128) // slate-700
        pdf.text('Filters Applied:', pageWidth / 2, yPos, { align: 'center' })
        yPos += 7
        pdf.text(`Period: ${filters.period}`, pageWidth / 2, yPos, { align: 'center' })
        yPos += 7
        if (filters.startDate) {
          pdf.text(`Start Date: ${new Date(filters.startDate).toLocaleDateString()}`, pageWidth / 2, yPos, { align: 'center' })
          yPos += 7
        }
        if (filters.endDate) {
          pdf.text(`End Date: ${new Date(filters.endDate).toLocaleDateString()}`, pageWidth / 2, yPos, { align: 'center' })
          yPos += 7
        }
      }

      // Decorative line
      pdf.setLineWidth(0.5)
      pdf.setDrawColor(59, 130, 246) // blue-500
      pdf.line(20, 90, pageWidth - 20, 90)

      // Add content page
      pdf.addPage()

      // Capture content with high resolution for beauty
      const canvas = await html2canvas(contentRef.current, {
        scale: 2, // Higher resolution for crisp text and charts
        useCORS: true,
        logging: false,
        width: contentRef.current.scrollWidth,
        height: contentRef.current.scrollHeight,
        backgroundColor: '#f8fafc', // light blue-50 background for beauty
        allowTaint: true,
        removeContainer: true,
      })

      const imgData = canvas.toDataURL('image/png', 1.0) // High quality
      const imgWidth = pageWidth - 20 // Margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      // Add first image segment
      pdf.addImage(imgData, 'PNG', 10, position + 20, imgWidth, imgHeight) // Offset for header space
      heightLeft -= (pageHeight - 20)

      // Paginate if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, Math.max(position, 20), imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Save with beautiful filename
      const filterStr = filters ? `_${filters.period}` : ''
      pdf.save(`${title.replace(/\s+/g, '_').toLowerCase()}${filterStr}_${currentDate.replace(/ /g, '_')}.pdf`)

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }, [contentRef, title, filters])

  return { handleDownload }
}