# Troubleshooting Import/Export Features

## Common Issues and Solutions

### 1. Duplicate Resume Fails

**Symptoms**: "Failed to duplicate resume" error message

**Causes**:
- Missing personalInfo data
- Invalid resume structure

**Solutions**:
- Ensure your resume has basic personal information filled in
- Check browser console (F12) for detailed error messages
- The duplicate feature now creates a direct copy without requiring pre-saved resumes

**How it works now**:
1. Creates a deep copy of current resume data
2. Appends " (Copy)" to the name
3. Saves as a new resume entry
4. Loads the new copy

### 2. PDF Import Fails

**Symptoms**: Error messages like "Failed to load PDF worker" or "Failed to parse PDF"

**Causes**:
- No internet connection (PDF.js worker loads from CDN - jsdelivr.net)
- Corrupted or protected PDF file
- PDF with complex layouts or scanned images
- Browser blocking CDN access

**Solutions**:
1. **Check Internet Connection**: The PDF parser requires internet to load the PDF.js worker from cdn.jsdelivr.net
2. **Try a Different PDF**: Use a text-based PDF resume (not a scanned image)
3. **Use Alternative Formats**: **RECOMMENDED** - Use DOCX or JSON import for more reliable results
4. **Check Browser Console**: Look for specific error messages in DevTools (F12)
5. **Allow CDN Access**: Ensure your browser/network allows access to cdn.jsdelivr.net

**Important**: PDF import is less reliable than DOCX or JSON. We recommend using those formats when possible.

**Note**: The PDF parser works best with:
- Standard resume formats (not multi-column layouts)
- Text-based PDFs (not scanned images/photos)
- Unprotected PDFs (no password/encryption)
- Modern PDF format (PDF 1.4+)

### 3. DOCX Import Issues

**Symptoms**: "Failed to parse DOCX file" error

**Causes**:
- Corrupted DOCX file
- Very old Word format (.doc instead of .docx)
- Complex tables or formatting

**Solutions**:
- Ensure file is .docx format (not .doc)
- Try opening in Word and re-saving as .docx
- Simplify complex formatting before export
- Try copy/paste content to a new document first

### 4. LinkedIn Import Doesn't Work

**Symptoms**: "Failed to parse LinkedIn data" error

**Causes**:
- Invalid JSON format
- Incomplete LinkedIn export
- LinkedIn changed their export format

**Solutions**:
1. **Follow Export Instructions**:
   - Go to LinkedIn Settings & Privacy
   - Data Privacy → Get a copy of your data
   - Request archive
   - Download and extract Profile.json

2. **Validate JSON**:
   - Open Profile.json in a text editor
   - Ensure it's valid JSON (starts with `{` and ends with `}`)
   - No trailing commas or syntax errors

3. **Copy Entire Content**: Make sure you copy the entire JSON file content

### 5. Export Features Not Working

**Symptoms**: Downloads fail or files are empty

**Causes**:
- Browser blocking downloads
- Insufficient permissions
- File name contains invalid characters

**Solutions**:
- Check browser's download settings
- Allow pop-ups and downloads for this site
- Ensure resume has a valid name (no special characters)
- Try different export formats (JSON is most reliable)

## Browser Compatibility

### Tested Browsers
- ✅ Chrome 90+ (Recommended)
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### Known Browser Issues
- **Safari**: May have issues with large file downloads
- **Firefox**: Requires explicit permission for multiple downloads
- **Mobile browsers**: Import features may not work reliably

## Debugging Steps

### Enable Debug Mode
1. Open Browser DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Perform the action that's failing
4. Look for error messages starting with:
   - "Import error:"
   - "Duplicate error:"
   - "Error parsing PDF:"
   - "Error parsing DOCX:"

### Common Error Messages and Fixes

#### "PDF parsing library not available"
- **Cause**: PDF.js failed to load from CDN
- **Fix**: Check internet connection, try refreshing the page

#### "Failed to load PDF worker"
- **Cause**: CDN blocked or network issue
- **Fix**: Check firewall/proxy settings, try different network

#### "Invalid resume data: missing personalInfo"
- **Cause**: Imported data doesn't have required structure
- **Fix**: Manually add personal info section after import

#### "Resume not found"
- **Cause**: Trying to duplicate a resume that wasn't saved properly
- **Fix**: Now fixed - no longer requires pre-saved resume

## Testing Import/Export

### Test with Sample Data

1. **Test JSON Export/Import**:
   - Fill in sample resume data
   - Export as JSON
   - Clear data (Reset button)
   - Import the JSON file
   - Verify all data restored

2. **Test Duplicate**:
   - Create a resume with some data
   - Click Duplicate
   - Verify copy is created with " (Copy)" suffix
   - Modify copy to ensure they're independent

3. **Test Text Export**:
   - Export as Text
   - Open the .txt file
   - Verify formatting is readable

4. **Test HTML Export**:
   - Export as HTML
   - Open in browser
   - Verify styling and content

## Feature Limitations

### PDF/DOCX Import Limitations
- **NOT an AI parser**: Uses pattern matching, not machine learning
- **Best effort extraction**: May miss some data or misplace it
- **Manual cleanup needed**: Always review and adjust imported data
- **Images not supported**: Photos and graphics are not imported
- **Complex layouts**: Multi-column or creative layouts may not parse well

### Resume Storage
- **LocalStorage only**: Data stored in browser, not cloud
- **Per-browser storage**: Data not synced across devices
- **Storage limits**: ~5-10MB depending on browser
- **No auto-backup**: Export JSON regularly as backup

### LinkedIn Import
- **Manual process**: Requires manual export from LinkedIn
- **No direct API**: LinkedIn doesn't provide public API access
- **Format changes**: LinkedIn may change export format over time
- **Incomplete data**: Some LinkedIn fields may not map to resume fields

## Getting Help

If you continue to experience issues:

1. **Check Console Logs**: Press F12 and look for red error messages
2. **Try Different Browser**: Test in Chrome if using another browser
3. **Clear Browser Cache**: Sometimes helps with loading issues
4. **Export Current Data**: Use JSON export to save your work first
5. **Refresh Page**: Simple refresh often fixes temporary issues

## Tips for Best Results

### Importing Resumes
1. Use standard PDF/DOCX formats
2. Keep formatting simple
3. Use clear section headers
4. Test with a small file first
5. Always review imported data

### Exporting Data
1. Export JSON regularly as backup
2. Use descriptive filenames
3. Store exports in safe location
4. Test imports before deleting originals

### Duplicate Feature
1. Duplicate before making major changes
2. Name copies clearly (auto-adds "Copy")
3. Keep originals for reference
4. Clean up unused duplicates

---

**Last Updated**: January 2026
**Version**: 2.0.0
