# Import/Export Features Documentation

## Overview
This document describes the comprehensive import/export capabilities added to the Resume Builder application.

## New Features

### 1. LinkedIn Import
**Location**: `src/utils/linkedinImport.js`

- Import resume data from LinkedIn profile JSON
- Supports LinkedIn data archive format
- Automatically maps LinkedIn fields to resume structure
- Includes instructions for users to export data from LinkedIn

**Supported Data**:
- Personal information (name, email, phone, location, LinkedIn URL, website)
- Professional summary
- Work experience with dates and descriptions
- Education with degrees, schools, and dates
- Skills
- Certifications with issuers and dates
- Languages with proficiency levels
- Volunteer experience
- Awards and honors

### 2. PDF/DOCX Parsing
**Location**: `src/utils/documentParser.js`

Intelligent document parsing that extracts structured data from existing resumes.

**PDF Parsing**:
- Uses `pdfjs-dist` library
- Extracts text from all pages
- Parses text into structured sections

**DOCX Parsing**:
- Uses `mammoth` library
- Extracts raw text from Word documents
- Converts to structured resume data

**Intelligent Extraction**:
- Automatic detection of personal information (email, phone, LinkedIn, website, location)
- Section recognition (Experience, Education, Skills, etc.)
- Date parsing and formatting
- Company and position extraction
- Skill list parsing

### 3. Export Utilities
**Location**: `src/utils/exportUtils.js`

Multiple export formats for different use cases.

#### JSON Export
- Complete data backup including all settings
- Perfect for re-importing or data migration
- Includes customization preferences
- Preserves section visibility and ordering

#### Text Export
- Clean, readable plain text format
- Section headers with separators
- Bullet points for descriptions
- Respects section ordering and visibility
- Easy to copy/paste into forms

#### HTML Export
- Standalone web page
- Styled with inline CSS matching your color scheme
- Responsive design
- Print-friendly layout
- Includes all visible sections
- Can be viewed in any browser

### 4. Resume Management
**Location**: `src/utils/resumeManager.js`

Complete resume lifecycle management.

**Features**:
- Store multiple resumes in localStorage
- Create/read/update/delete operations
- Duplicate resume functionality
- Rename resumes
- Track creation and update timestamps
- Current resume tracking

**Functions**:
- `getAllResumes()` - Get list of all saved resumes
- `saveResume(data, id)` - Save or update a resume
- `loadResume(id)` - Load a specific resume
- `deleteResume(id)` - Delete a resume
- `duplicateResume(id)` - Create a copy of a resume
- `renameResume(id, name)` - Rename a resume
- `importFromJSON(json)` - Import from JSON string

### 5. Import/Export Modal
**Location**: `src/components/ImportExportModal.jsx`

User-friendly modal interface for all import/export operations.

**Import Tab**:
- File upload for PDF, DOCX, and JSON
- Drag-and-drop support
- LinkedIn data paste option
- Instructions for LinkedIn export
- Progress indicators
- Error handling with clear messages

**Export Tab**:
- JSON export button with description
- Text export button with description
- HTML export button with description
- Quick duplicate resume action

**Features**:
- Tabbed interface (Import/Export)
- Success/error messaging
- Loading states
- Auto-close after successful import
- Preserves customization settings on import

## User Interface Updates

### App.jsx Changes
**Location**: `src/App.jsx`

**New Buttons**:
1. **Import/Export** - Opens the ImportExportModal
2. **Duplicate** - Creates a copy of the current resume

**Button Layout** (in header):
```
[Template Selector] [Color Presets] [Import/Export] [Duplicate] [Preview Only] [Save] [Download PDF] [Reset]
```

**New State**:
- `showImportExport` - Controls modal visibility

**New Functions**:
- `handleDuplicate()` - Duplicates current resume

## Installation

New dependencies added to `package.json`:

```json
{
  "dependencies": {
    "mammoth": "^1.x.x",
    "pdf-parse": "^1.x.x",
    "pdfjs-dist": "^3.x.x",
    "file-saver": "^2.x.x"
  }
}
```

Install with:
```bash
npm install
```

## Usage Examples

### Import from LinkedIn
1. Click "Import/Export" button
2. Switch to LinkedIn tab
3. Follow instructions to export data from LinkedIn
4. Paste JSON data
5. Click "Import LinkedIn Data"

### Import from PDF/DOCX
1. Click "Import/Export" button
2. Click "File Upload" tab
3. Drag and drop or click to upload file
4. Wait for processing
5. Data is automatically populated

### Export as JSON
1. Click "Import/Export" button
2. Switch to "Export" tab
3. Click "Export as JSON"
4. File downloads automatically

### Export as Text
1. Click "Import/Export" button
2. Switch to "Export" tab
3. Click "Export as Text"
4. File downloads automatically

### Export as HTML
1. Click "Import/Export" button
2. Switch to "Export" tab
3. Click "Export as HTML"
4. File downloads automatically

### Duplicate Resume
1. Click "Duplicate" button in header (or in Import/Export modal)
2. New copy is created and loaded
3. Original remains in storage

## Technical Details

### Data Structure
All imports are normalized to the following structure:

```javascript
{
  personalInfo: {
    fullName: string,
    email: string,
    phone: string,
    location: string,
    linkedin: string,
    website: string,
    photo: string | null
  },
  summary: string,
  experience: Array<{
    id: number,
    title: string,
    company: string,
    location: string,
    startDate: string,
    endDate: string,
    current: boolean,
    description: string[]
  }>,
  education: Array<{
    id: number,
    degree: string,
    school: string,
    location: string,
    graduationDate: string,
    gpa: string
  }>,
  skills: string[],
  projects: Array<{
    id: number,
    name: string,
    description: string,
    technologies: string[],
    link: string,
    date: string
  }>,
  certifications: Array<{
    id: number,
    name: string,
    issuer: string,
    date: string,
    expiryDate: string,
    credentialId: string
  }>,
  languages: Array<{
    id: number,
    language: string,
    proficiency: string
  }>,
  volunteer: Array<{
    id: number,
    role: string,
    organization: string,
    location: string,
    startDate: string,
    endDate: string,
    current: boolean,
    description: string[]
  }>,
  awards: Array<{
    id: number,
    title: string,
    issuer: string,
    date: string,
    description: string
  }>,
  customization: {...},
  sectionVisibility: {...}
}
```

### Error Handling
- File type validation
- JSON parse error handling
- PDF/DOCX parsing errors
- User-friendly error messages
- Automatic timeout for success messages

### Security Considerations
- All processing happens client-side
- No data sent to servers
- Files are processed in memory
- LocalStorage for persistence
- No external API calls (except PDF.js CDN for worker)

## Browser Compatibility

**Supported Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features**:
- FileReader API
- LocalStorage
- ArrayBuffer
- Promises/Async-Await

## Performance

**File Size Limits**:
- PDF: Recommended < 5MB
- DOCX: Recommended < 5MB
- JSON: No practical limit

**Processing Times** (approximate):
- JSON: < 100ms
- DOCX: 100-500ms
- PDF: 200-1000ms (depends on pages)

## Known Limitations

1. **PDF/DOCX Parsing**:
   - Works best with standard resume formats
   - Complex multi-column layouts may need manual adjustment
   - Graphics and images are not preserved
   - Tables may not parse correctly

2. **LinkedIn Import**:
   - Requires manual export from LinkedIn
   - LinkedIn API access not available
   - JSON format may change over time

3. **File Size**:
   - Very large PDFs (50+ pages) may be slow
   - Browser memory limits apply

4. **Browser Support**:
   - PDF.js worker requires CDN access
   - May not work in very old browsers

## Future Enhancements

Potential improvements:
- Import from more platforms (Indeed, Monster, etc.)
- OCR for scanned PDFs
- Image extraction from resumes
- AI-powered content suggestions
- Cloud storage integration
- Batch import/export
- Resume comparison tool
- Version history

## Testing

Test the features with:
1. Sample PDF resumes
2. Sample DOCX resumes
3. LinkedIn export files
4. Various resume formats and layouts
5. Large files (stress testing)
6. Invalid files (error handling)

## Support

For issues or questions:
1. Check console for error messages
2. Verify file format is supported
3. Try with a different file
4. Clear browser cache/localStorage
5. Use JSON export/import as backup

---

**Last Updated**: January 2026
**Version**: 2.0.0
