import { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'

export default function CustomPDFViewer({ document }) {
  const [pdfUrl, setPdfUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generatePDF = async () => {
      setLoading(true)
      try {
        // Generate PDF blob
        const blob = await pdf(document).toBlob()

        // Revoke previous URL if it exists
        if (pdfUrl) {
          URL.revokeObjectURL(pdfUrl)
        }

        // Create new object URL
        const url = URL.createObjectURL(blob)
        setPdfUrl(url)
      } catch (error) {
        console.error('Error generating PDF:', error)
      } finally {
        setLoading(false)
      }
    }

    generatePDF()

    // Cleanup on unmount
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [document])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <div className="text-gray-500">Loading PDF...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-white flex items-start justify-center overflow-auto">
      {pdfUrl && (
        <embed
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ border: 'none', background: 'white' }}
        />
      )}
    </div>
  )
}
