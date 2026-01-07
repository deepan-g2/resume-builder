# 📄 Resume Builder - Like Zety.com

A modern, visual resume editor with live preview and multiple professional templates. Built with React, Tailwind CSS, and Vite.

## ✨ Features

- ✅ **Visual Editor** - Easy-to-use form-based editing
- ✅ **Live Preview** - See changes in real-time
- ✅ **3 Professional Templates** - Modern, Classic, and Minimal designs
- ✅ **PDF Export** - Download your resume as PDF
- ✅ **Auto-Save** - Your work is automatically saved to browser storage
- ✅ **Responsive Design** - Works on desktop and tablet
- ✅ **No Backend Required** - Runs entirely in the browser

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

1. **Personal Information** - Fill in your contact details
2. **Professional Summary** - Write a brief summary about yourself
3. **Work Experience** - Add your work history with responsibilities
   - Click "+ Add Experience" to add more jobs
   - Use the trash icon to remove entries
4. **Education** - Add your educational background
5. **Skills** - List your skills (comma-separated)

### Changing Templates

Use the template dropdown in the header to switch between:
- **Modern** - Colorful header with modern design
- **Classic** - Traditional serif fonts with professional layout
- **Minimal** - Clean, minimalist design

### Exporting to PDF

Click the "Export PDF" button in the header to download your resume as a PDF file.

### Saving Your Work

Your resume is automatically saved to your browser's localStorage. No account or backend needed!

## 🎨 Templates

### Modern
- Blue gradient header
- Clean, contemporary design
- Skill tags
- Best for tech and creative roles

### Classic
- Traditional serif fonts
- Professional black and white
- Best for corporate and formal roles

### Minimal
- Ultra-clean design
- Light borders
- Best for modern, design-focused roles

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
│   │   ├── Editor.jsx          # Form for editing resume
│   │   └── Preview.jsx          # Live preview with templates
│   ├── data/
│   │   └── resumeData.js        # Initial resume structure
│   ├── utils/
│   │   └── pdfExport.js         # PDF export functionality
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
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

- **Use concise bullet points** - Keep each point under 2 lines
- **Quantify achievements** - Use numbers and percentages
- **Action verbs** - Start bullets with strong action verbs
- **Tailor for each job** - Customize your resume for each application
- **Keep it to 1-2 pages** - Recruiters spend 6-7 seconds per resume

## 🐛 Known Issues

- PDF export might not capture all colors perfectly on some browsers
- Large resumes (3+ pages) may need multiple PDF pages

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📝 License

MIT License - feel free to use this for personal or commercial projects.

## 🎯 Future Enhancements

- [ ] More templates
- [ ] Import from existing resume (PDF/DOCX)
- [ ] Pre-written content suggestions
- [ ] ATS optimization scoring
- [ ] Cover letter generator
- [ ] Cloud save with user accounts
- [ ] Share resume link feature

---

**Built with ❤️ for job seekers everywhere**
