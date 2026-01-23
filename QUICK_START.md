# Quick Start - Import/Export Features

## ✅ What Works Best

### Duplicate Resume
**Status**: ✅ Fully Working
```
1. Click "Duplicate" button
2. New copy loads automatically
3. Name has " (Copy)" appended
```

### JSON Import/Export
**Status**: ✅ Fully Working (Recommended!)
```
Export:
1. Click "Import/Export" button
2. Switch to "Export" tab
3. Click "Export as JSON"
4. Save the file

Import:
1. Click "Import/Export" button
2. Upload JSON file
3. Data loads instantly
```

### DOCX Import
**Status**: ✅ Working Well
```
1. Export resume from Word as .docx
2. Click "Import/Export" button
3. Upload DOCX file
4. Review and fix any parsing errors
```

### Text/HTML Export
**Status**: ✅ Fully Working
```
1. Click "Import/Export" button
2. Switch to "Export" tab
3. Choose "Text" or "HTML"
4. File downloads automatically
```

## ⚠️ Use With Caution

### PDF Import
**Status**: ⚠️ Requires Internet, May Fail
```
Requirements:
- Active internet connection
- Access to cdn.jsdelivr.net
- Text-based PDF (not scanned)

Better Alternative: Use DOCX instead!

If you must use PDF:
1. Check internet connection
2. Click "Import/Export" button
3. Upload PDF file
4. Wait (may be slow)
5. Check console (F12) for errors
6. Review data carefully
7. If it fails, use DOCX
```

## 🔧 Troubleshooting

### Duplicate Not Working?
```
- Make sure you have some resume data filled in
- Check browser console (F12) for errors
- Try refreshing the page
```

### PDF Import Failing?
```
Common Error: "PDF import requires internet connection"

Solutions:
✅ Check internet connection
✅ Try DOCX format instead (more reliable)
✅ Try JSON export from another tool
✅ Check console (F12) for specific error
```

### Import Wiped My Data?
```
If auto-save was working:
1. Click Reset button
2. Refresh page
3. Your data should restore from localStorage

If not:
- Import your last JSON backup
- Re-enter data manually
```

## 💡 Best Practices

### Daily Use
```
1. Let auto-save handle regular edits
2. Export JSON before major changes
3. Use Duplicate for different versions
4. Test imports occasionally
```

### Before Making Changes
```
1. Export as JSON (backup)
2. Make changes
3. If something breaks, import JSON
```

### When Switching Versions
```
1. Export current version as JSON
2. Make changes or import new data
3. Export new version as JSON
4. Keep both files for comparison
```

### Regular Backups
```
Weekly: Export as JSON
Monthly: Export as JSON + PDF
Storage: Cloud drive or email to self
```

## 📋 Feature Comparison

| Feature | Reliability | Speed | Internet Required | Best For |
|---------|------------|-------|-------------------|----------|
| JSON Export | ✅ Excellent | ⚡ Instant | ❌ No | Backup, data transfer |
| JSON Import | ✅ Excellent | ⚡ Instant | ❌ No | Restore, migration |
| DOCX Import | ✅ Good | 🔄 Fast | ❌ No | Importing existing resumes |
| PDF Import | ⚠️ Fair | 🐌 Slow | ✅ Yes | Last resort only |
| Text Export | ✅ Excellent | ⚡ Instant | ❌ No | Plain text sharing |
| HTML Export | ✅ Excellent | ⚡ Instant | ❌ No | Web preview, printing |
| Duplicate | ✅ Excellent | ⚡ Instant | ❌ No | Multiple versions |

## 🎯 Recommendations

### For Importing Resumes:
1. **First Choice**: DOCX format
2. **Second Choice**: JSON from another tool
3. **Last Resort**: PDF (may not work)

### For Backups:
1. **Primary**: JSON export (complete data)
2. **Secondary**: PDF export (visual copy)
3. **Frequency**: Weekly or before major changes

### For Version Control:
1. Use Duplicate feature
2. Export each version as JSON
3. Name files descriptively
4. Keep previous versions

## ⚡ Quick Commands

```bash
# Build the app
npm run build

# Run development server
npm run dev

# Check for errors
Open browser console (F12)
```

## 🆘 Getting Help

**If something isn't working:**

1. Check browser console (F12) → Console tab
2. Look for error messages
3. Check TROUBLESHOOTING.md
4. Try alternative format (JSON/DOCX instead of PDF)
5. Refresh the page
6. Clear browser cache

**Common Error Messages:**

- "Failed to duplicate" → Fixed in latest version
- "PDF import requires internet" → Use DOCX instead
- "Failed to parse PDF" → Use DOCX or JSON instead
- "Invalid resume data" → Check JSON format

## 📄 Documentation Files

- **README.md** - Complete feature documentation
- **TROUBLESHOOTING.md** - Detailed problem solving
- **IMPORT_EXPORT_FEATURES.md** - Technical details
- **FIXES_APPLIED.md** - Recent bug fixes
- **QUICK_START.md** - This file!

---

**TL;DR**:
- ✅ Use JSON or DOCX for importing
- ✅ Duplicate works great for versions
- ⚠️ PDF import is experimental
- 💾 Export JSON regularly for backup

**Last Updated**: January 23, 2026
