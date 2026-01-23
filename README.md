# 📄 Resume Builder - Like Zety.com

A modern, visual resume editor with live preview and multiple professional templates. Built with React, Tailwind CSS, and Vite.

## ✨ Features

### Resume Builder
- ✅ **Visual Editor** - Easy-to-use form-based editing
- ✅ **Live Preview** - See changes in real-time
- ✅ **6 Professional Templates** - Modern, Classic, Minimal, Executive, Creative, and Technical designs
- ✅ **9 Resume Sections** - Summary, Experience, Education, Skills, Projects, Certifications, Languages, Volunteer, Awards
- ✅ **Extensive Customization** - Colors, fonts, spacing, margins, section ordering
- ✅ **Section Visibility** - Show/hide sections as needed
- ✅ **PDF Export** - Download your resume as PDF
- ✅ **Auto-Save** - Your work is automatically saved to browser storage

### Cover Letter Generator ✨ NEW
- ✅ **Matching Templates** - Cover letters styled to match your resume
- ✅ **Job Integration** - Fields for position, company, and hiring manager details
- ✅ **Smart Placeholders** - Auto-replace [Position] and [Company] throughout the letter
- ✅ **AI Helper Interface** - Paste job descriptions for personalization guidance
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

### Editing Your Resume

1. **Select Resume Tab** - Click the "Resume" tab in the header
2. **Personal Information** - Fill in your contact details
3. **Professional Summary** - Write a brief summary about yourself
4. **Work Experience** - Add your work history with responsibilities
   - Click "+ Add Experience" to add more jobs
   - Use the trash icon to remove entries
5. **Education** - Add your educational background
6. **Skills** - List your skills (comma-separated)
7. **Additional Sections** - Add Projects, Certifications, Languages, Volunteer work, and Awards

### Creating Your Cover Letter

1. **Select Cover Letter Tab** - Click the "Cover Letter" tab in the header
2. **Import from Resume** - Click "Import from Resume" to copy personal info and styling
3. **Job Information** - Fill in the position, company, and hiring manager details
4. **AI Helper (Optional)** - Paste the job description to get personalization guidance
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
- **Section Order** - Drag to reorder resume sections
- **Visibility** - Show/hide specific sections

### Exporting to PDF

Click the "Download PDF" button in the header to export the current document (resume or cover letter) as PDF.

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
- **jsPDF** - PDF generation
- **html2canvas** - Screenshot capture
- **Lucide React** - Icons

## 📁 Project Structure

```
resume-builder/
├── src/
│   ├── components/
│   │   ├── Editor.jsx                  # Resume editor form
│   │   ├── CoverLetterEditor.jsx       # Cover letter editor form
│   │   ├── PDFTemplates.jsx            # Resume PDF templates (6 styles)
│   │   └── CoverLetterTemplates.jsx    # Cover letter PDF templates (6 styles)
│   ├── data/
│   │   ├── resumeData.js               # Initial resume data structure
│   │   └── coverLetterData.js          # Initial cover letter data structure
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

## 🐛 Known Issues

- PDF export might not capture all colors perfectly on some browsers
- Large resumes (3+ pages) may need multiple PDF pages

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📝 License

MIT License - feel free to use this for personal or commercial projects.

## 🎯 Recent Enhancements

- ✅ 6 professional templates (Modern, Classic, Minimal, Executive, Creative, Technical)
- ✅ 9 resume sections with visibility controls
- ✅ Cover letter generator with matching templates
- ✅ AI helper interface for job description integration
- ✅ Smart placeholders for personalization
- ✅ Import personal info from resume to cover letter
- ✅ Extensive customization (colors, fonts, spacing, section ordering)

## 🚀 Future Enhancements

- [ ] Active AI integration for cover letter personalization (OpenAI API)
- [ ] Import from existing resume (PDF/DOCX)
- [ ] Pre-written content suggestions library
- [ ] ATS optimization scoring
- [ ] Multiple cover letter versions management
- [ ] Cloud save with user accounts
- [ ] Share resume/cover letter link feature
- [ ] Export to Word format
- [ ] Collaboration features

---

**Built with ❤️ for job seekers everywhere**
