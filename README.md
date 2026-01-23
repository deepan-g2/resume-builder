# 📄 Resume Builder - Like Zety.com

A modern, visual resume editor with live preview and multiple professional templates. Built with React, Tailwind CSS, and Vite.

## ✨ Features

### Resume Builder
- ✅ **Visual Editor** - Easy-to-use form-based editing
- ✅ **Live Preview** - See changes in real-time
- ✅ **6 Professional Templates** - Modern, Classic, Minimal, Executive, Creative, and Technical designs
- ✅ **9 Resume Sections** - Summary, Experience, Education, Skills, Projects, Certifications, Languages, Volunteer, Awards
- ✅ **Import/Export** - Import from LinkedIn, PDF, DOCX, or JSON; Export as JSON, TXT, HTML, or PDF
- ✅ **Duplicate Resume** - Create multiple versions of your resume
- ✅ **Extensive Customization** - Colors, fonts, spacing, margins, borders, section ordering
- ✅ **Section Visibility** - Show/hide sections as needed
- ✅ **PDF Export** - Download your resume as PDF
- ✅ **Auto-Save** - Your work is automatically saved to browser storage

### ATS Optimization ✨ NEW
- ✅ **Real-Time ATS Scoring** - Get instant compatibility scores (0-100)
- ✅ **Industry-Specific Keywords** - Keyword matching for 8+ industries
- ✅ **Actionable Recommendations** - Get specific suggestions to improve your score
- ✅ **Keyword Analysis** - See which keywords you're using and which are missing
- ✅ **Content Quality Checks** - Validation for length, achievements, action verbs

### Cover Letter Generator
- ✅ **Matching Templates** - Cover letters styled to match your resume
- ✅ **Job Integration** - Fields for position, company, and hiring manager details
- ✅ **Smart Placeholders** - Auto-replace [Position] and [Company] throughout the letter
- ⚠️ **AI Helper Interface** - UI ready for AI integration (requires OpenAI API setup)
- ✅ **Import from Resume** - One-click import of personal info and styling
- ✅ **Multi-Paragraph Editor** - Add/remove body paragraphs as needed
- ✅ **PDF Export** - Professional cover letter PDFs

### General
- ✅ **Responsive Design** - Works on desktop and tablet
- ✅ **No Backend Required** - Runs entirely in the browser
- ✅ **Data Privacy** - All data stored locally in your browser

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd /Users/dkumar/Github/learn/resume-builder
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## 📖 How to Use

### ATS Optimization (NEW!)

The resume builder now includes an **ATS Compatibility Score** that analyzes your resume in real-time:

1. **View Your Score** - See your ATS score (0-100) in the header and detailed breakdown in the editor
2. **Select Your Industry** - Choose from 8 industries (Technology, Marketing, Finance, Healthcare, Sales, Design, Education, HR) for industry-specific keyword analysis
3. **Get Recommendations** - Receive actionable suggestions to improve your resume:
   - Critical issues (missing contact info, short descriptions)
   - Keyword improvements (missing technical and soft skills)
   - Content quality tips (action verbs, quantifiable achievements)
4. **Track Keywords** - See which industry-relevant keywords you've included
5. **Suggested Keywords** - Get recommendations for keywords to add based on your target industry

The ATS score is calculated based on:
- **Formatting (25%)** - Contact information completeness
- **Keywords (35%)** - Industry-specific technical and soft skills
- **Content Quality (25%)** - Summary length, detailed descriptions, quantifiable achievements
- **Completeness (15%)** - Overall resume completeness

### Editing Your Resume

1. **Select Resume Tab** - Click the "Resume" tab in the header
2. **Personal Information** - Fill in your contact details
3. **Professional Summary** - Write a brief summary about yourself (minimum 20 words recommended for ATS)
4. **Work Experience** - Add your work history with responsibilities
   - Click "+ Add Experience" to add more jobs
   - Use the trash icon to remove entries
   - Add 2-4 bullet points per role
   - Start with action verbs (led, managed, developed, etc.)
   - Include quantifiable achievements (increased sales by 30%, etc.)
5. **Education** - Add your educational background
6. **Skills** - List your skills (comma-separated) - include both technical and soft skills
7. **Projects** - Showcase your key projects with technologies used
8. **Certifications** - Add professional certifications
9. **Languages** - List languages and proficiency levels
10. **Volunteer Experience** - Include volunteer work
11. **Awards & Honors** - Add recognition and achievements

### Creating Your Cover Letter

1. **Select Cover Letter Tab** - Click the "Cover Letter" tab in the header
2. **Import from Resume** - Click "Import from Resume" to copy personal info and styling
3. **Job Information** - Fill in the position, company, and hiring manager details
4. **AI Helper** - Currently a placeholder UI (see "AI Integration" section below to connect)
5. **Edit Content** - Customize the opening, body paragraphs, and closing
6. **Use Placeholders** - [Position] and [Company] will auto-replace throughout the letter

### Template Matching

Both resume and cover letter use the same template selection, ensuring a cohesive application package:
- **Modern** - Colorful header with modern design
- **Classic** - Traditional serif fonts with professional layout
- **Minimal** - Clean, minimalist design
- **Executive** - Two-column layout with sidebar
- **Creative** - Bold and colorful for creative roles
- **Technical** - Monospace font for developer positions

### Customization Controls

- **Colors** - Quick presets or custom color picker for accent colors
- **Fonts** - Choose between Helvetica, Times New Roman, or Courier
- **Font Size** - Adjust from 9pt to 14pt
- **Line Spacing** - Control readability with 1.0 to 2.0 spacing
- **Borders** - Enable/disable page borders with custom width and color
- **Section Order** - Drag to reorder resume sections
- **Visibility** - Show/hide specific sections

### Import & Export

#### Exporting to PDF
Click the "Download PDF" button in the header to export the current document (resume or cover letter) as PDF.

#### Import/Export Modal
Click the "Import/Export" button (in Resume tab) to:

**Import Options:**
- **From File** - Upload PDF, DOCX, or JSON files to extract resume data
- **From LinkedIn** - Paste your LinkedIn profile JSON data (instructions provided in modal)

**Export Options:**
- **JSON** - Export complete resume data (best for backup/re-import)
- **Text** - Export as plain text file
- **HTML** - Export as standalone HTML page

### Duplicate Resume

Click the "Duplicate" button to create a copy of your current resume. Perfect for creating multiple versions tailored to different job applications.

### Saving Your Work

Both resume and cover letter are automatically saved to your browser's localStorage. No account or backend needed!

## 🎨 Templates

### Modern
- Colorful gradient header
- Clean, contemporary design
- Skill tags and modern typography
- Best for tech and creative roles

### Classic
- Traditional serif fonts (Times New Roman)
- Professional black and white
- Centered header with formal styling
- Best for corporate and formal roles

### Minimal
- Ultra-clean design
- Light borders and subtle separators
- Maximum white space
- Best for modern, design-focused roles

### Executive
- Two-column layout with sidebar
- Contact info and skills in left column
- Experience and education in main area
- Best for senior leadership positions

### Creative
- Bold, colorful header
- Large typography with personality
- Skill boxes with accent colors
- Best for design, marketing, creative fields

### Technical
- Monospace font (Courier)
- Code-style formatting with comment headers
- Gray code blocks for experience
- Best for developers and technical roles

## 🛠️ Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **@react-pdf/renderer** - PDF generation and rendering
- **Lucide React** - Icons
- **mammoth** - DOCX parsing
- **pdf-parse & pdfjs-dist** - PDF text extraction
- **file-saver** - File download utilities
- **@dnd-kit** - Drag and drop for section reordering

## 📁 Project Structure

```
resume-builder/
├── src/
│   ├── components/
│   │   ├── Editor.jsx                  # Resume editor form
│   │   ├── ATSScore.jsx                # ATS compatibility score component
│   │   ├── CoverLetterEditor.jsx       # Cover letter editor form
│   │   ├── PDFTemplates.jsx            # Resume PDF templates (6 styles)
│   │   ├── CoverLetterTemplates.jsx    # Cover letter PDF templates (6 styles)
│   │   ├── PagedPreview.jsx            # Live preview wrapper
│   │   ├── PagedResume.jsx             # Multi-page support
│   │   ├── Preview.jsx                 # HTML preview
│   │   └── ImportExportModal.jsx       # Import/export dialog
│   ├── data/
│   │   ├── resumeData.js               # Initial resume data structure
│   │   └── coverLetterData.js          # Initial cover letter data structure
│   ├── utils/
│   │   ├── pdfExport.js                # PDF export utilities
│   │   ├── atsAnalyzer.js              # ATS analysis and scoring engine
│   │   ├── documentParser.js           # PDF/DOCX parsing
│   │   ├── linkedinImport.js           # LinkedIn import
│   │   ├── exportUtils.js              # JSON/TXT/HTML export
│   │   └── resumeManager.js            # Resume management
│   ├── App.jsx                         # Main app with tab navigation
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔧 Customization

### Adding a New Template

1. Open `src/components/Preview.jsx`
2. Add a new template condition:

```jsx
if (template === 'your-template-name') {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8">
      {/* Your template design */}
    </div>
  )
}
```

3. Add the template option in `src/App.jsx`:

```jsx
<option value="your-template-name">Your Template Name</option>
```

### Changing Colors

Edit the template styles in `src/components/Preview.jsx`. For example, to change the Modern template's blue color:

```jsx
className="bg-gradient-to-r from-purple-600 to-purple-700"
```

## 💡 Tips

### Resume Tips
- **Use concise bullet points** - Keep each point under 2 lines
- **Quantify achievements** - Use numbers and percentages
- **Action verbs** - Start bullets with strong action verbs
- **Tailor for each job** - Customize your resume for each application
- **Keep it to 1-2 pages** - Recruiters spend 6-7 seconds per resume

### Cover Letter Tips
- **Research the company** - Reference specific projects or values
- **Match the job requirements** - Use [Position] and [Company] placeholders
- **Show personality** - Let your enthusiasm shine through
- **Keep it concise** - 3-4 paragraphs, max 1 page
- **Strong opening** - Hook the reader in the first paragraph
- **Call to action** - Express desire for interview in closing
- **Proofread carefully** - Errors are especially harmful in cover letters

## 🤖 AI Integration (Optional Enhancement)

The Cover Letter Generator includes an AI Helper UI that's ready for integration but **not currently connected to an AI service**. To enable AI-powered personalization:

### Option 1: OpenAI API (Recommended)
```javascript
// In src/components/CoverLetterEditor.jsx, replace the generateAISuggestions function:

const generateAISuggestions = async () => {
  if (!jobDescription.trim()) {
    alert('Please paste a job description first')
    return
  }

  try {
    const response = await fetch('/api/ai-suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobDescription,
        currentLetter: {
          opening: coverLetterData.opening,
          body: coverLetterData.body
        }
      })
    })

    const suggestions = await response.json()
    // Display suggestions to user
    alert(`AI Suggestions:\n${suggestions.message}`)
  } catch (error) {
    alert('Error connecting to AI service')
  }
}
```

### Backend API Required
You'll need a backend endpoint to securely call OpenAI (never expose API keys in frontend):

```javascript
// Example backend endpoint (Node.js/Express)
app.post('/api/ai-suggestions', async (req, res) => {
  const { jobDescription, currentLetter } = req.body

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `Analyze this job description and suggest improvements for the cover letter...`
      }]
    })
  })

  const data = await response.json()
  res.json(data)
})
```

### Why It's Not Connected Now
- Requires OpenAI API key (costs money per request)
- Needs backend service for security (can't expose API keys in browser)
- Adds complexity for basic use case

The current implementation provides full cover letter functionality without AI dependency.

## 🐛 Known Issues

- PDF export might not capture all colors perfectly on some browsers
- Large resumes (3+ pages) may need multiple PDF pages
- AI Helper is a placeholder UI only (see "AI Integration" section above)

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📝 License

MIT License - feel free to use this for personal or commercial projects.

## 📋 Import/Export Details

### Importing Resumes

#### From PDF/DOCX
The parser automatically extracts:
- Personal information (name, email, phone, location, links)
- Work experience with dates and descriptions
- Education with degrees and schools
- Skills
- Projects
- Certifications

Note: PDF/DOCX parsing works best with standard resume formats. Complex layouts may require manual adjustments.

#### From LinkedIn
1. Go to LinkedIn Settings & Privacy
2. Navigate to 'Data Privacy' → 'Get a copy of your data'
3. Request archive and download
4. Extract and paste the Profile.json content into the import dialog

The LinkedIn importer supports:
- Profile information
- Work positions
- Education
- Skills
- Certifications
- Languages
- Volunteer work
- Awards and honors

#### From JSON
Import previously exported resume data to restore your work or migrate between devices.

### Exporting Resumes

#### JSON Export
Complete backup including:
- All resume data
- Customization settings
- Section visibility preferences
- Section ordering

#### Text Export
Plain text format with:
- Clean, readable formatting
- Section headers
- Bullet points
- Preserves section order

#### HTML Export
Standalone web page with:
- Styled resume matching your color scheme
- Responsive design
- Print-friendly layout
- Can be opened in any browser

## 🎯 ATS Optimization Details

### Industry-Specific Keywords

The ATS analyzer includes comprehensive keyword databases for 8 industries:

1. **Technology** - Programming languages, frameworks, cloud platforms, development tools
2. **Marketing** - SEO, SEM, content marketing, analytics tools, social media
3. **Finance** - Financial modeling, accounting software, regulations, analysis
4. **Healthcare** - Patient care, EHR systems, medical terminology, certifications
5. **Sales** - CRM systems, lead generation, negotiation, sales methodologies
6. **Design** - Design tools, UI/UX, Adobe Creative Suite, prototyping
7. **Education** - Curriculum development, educational technology, classroom management
8. **Human Resources** - Recruitment, HRIS, employee relations, compliance

### ATS Best Practices

The analyzer checks for:
- ✅ Complete contact information (email, phone, location)
- ✅ Professional summary with adequate length (20+ words)
- ✅ Detailed experience descriptions (2-4 bullets per role)
- ✅ Quantifiable achievements with numbers and metrics
- ✅ Action verbs starting bullet points
- ✅ Industry-relevant technical keywords
- ✅ Soft skills appropriate for your field
- ✅ Overall resume completeness

## 🎯 Recent Enhancements

- ✅ 6 professional templates (Modern, Classic, Minimal, Executive, Creative, Technical)
- ✅ 9 resume sections with visibility controls
- ✅ **ATS optimization scoring with real-time analysis** (NEW!)
- ✅ Cover letter generator with matching templates
- ✅ AI helper interface for job description integration
- ✅ Smart placeholders for personalization
- ✅ Import personal info from resume to cover letter
- ✅ Import/export capabilities (LinkedIn, PDF, DOCX, JSON, TXT, HTML)
- ✅ Duplicate resume functionality
- ✅ Extensive customization (colors, fonts, spacing, section ordering)

## 🚀 Future Enhancements

- [ ] Active AI integration for cover letter personalization (OpenAI API)
- [ ] Pre-written content suggestions library
- [ ] Job description keyword matcher
- [ ] A/B testing for different resume versions
- [ ] Multiple cover letter versions management
- [ ] Cloud save with user accounts
- [ ] Share resume/cover letter link feature
- [ ] Export to Word format
- [ ] Multi-resume management UI
- [ ] Import from more platforms (Indeed, Monster, etc.)
- [ ] Collaboration features

---

**Built with ❤️ for job seekers everywhere**
