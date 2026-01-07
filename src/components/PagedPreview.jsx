import { useEffect, useRef, useState } from 'react'
import Preview from './Preview'

export default function PagedPreview({ resumeData, template }) {
  const previewRef = useRef()
  const [pages, setPages] = useState([{ content: null }])

  useEffect(() => {
    // Split content into pages
    const splitIntoPages = () => {
      if (!previewRef.current) return

      const A4_HEIGHT_PX = 1123 // A4 height at 96 DPI (297mm)
      const content = previewRef.current
      const sections = Array.from(content.querySelectorAll('section, header'))

      const newPages = []
      let currentPage = []
      let currentHeight = 0

      sections.forEach((section) => {
        const sectionHeight = section.offsetHeight

        // If adding this section would exceed page height, start new page
        if (currentHeight + sectionHeight > A4_HEIGHT_PX && currentPage.length > 0) {
          newPages.push([...currentPage])
          currentPage = [section.cloneNode(true)]
          currentHeight = sectionHeight
        } else {
          currentPage.push(section.cloneNode(true))
          currentHeight += sectionHeight
        }
      })

      // Add remaining content as last page
      if (currentPage.length > 0) {
        newPages.push(currentPage)
      }

      setPages(newPages.length > 0 ? newPages : [{ content: null }])
    }

    // Recalculate on content change
    const timer = setTimeout(splitIntoPages, 300)
    return () => clearTimeout(timer)
  }, [resumeData, template])

  return (
    <>
      {/* Hidden reference for measurement */}
      <div ref={previewRef} style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <Preview resumeData={resumeData} template={template} />
      </div>

      {/* Visible paged view */}
      <div className="space-y-0">
        <div className="page-container">
          <Preview resumeData={resumeData} template={template} />
        </div>

        {/* Page indicator */}
        <div className="text-center py-2 text-xs text-gray-500">
          Preview shows A4 page boundaries
        </div>
      </div>
    </>
  )
}
