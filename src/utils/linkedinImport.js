// LinkedIn profile data import utility
// Note: LinkedIn does not provide a public API for profile import
// This utility helps users manually import their LinkedIn data

export const parseLinkedInData = (linkedInText) => {
  const resumeData = {
    personalInfo: {},
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    volunteer: [],
    awards: []
  };

  try {
    // Try parsing as JSON (if user exports from LinkedIn as JSON)
    const jsonData = JSON.parse(linkedInText);

    // Parse personal info
    if (jsonData.firstName && jsonData.lastName) {
      resumeData.personalInfo.fullName = `${jsonData.firstName} ${jsonData.lastName}`;
    }
    if (jsonData.emailAddress) {
      resumeData.personalInfo.email = jsonData.emailAddress;
    }
    if (jsonData.phoneNumbers && jsonData.phoneNumbers.length > 0) {
      resumeData.personalInfo.phone = jsonData.phoneNumbers[0].number;
    }
    if (jsonData.location) {
      resumeData.personalInfo.location = jsonData.location;
    }
    if (jsonData.publicProfileUrl) {
      resumeData.personalInfo.linkedin = jsonData.publicProfileUrl;
    }
    if (jsonData.websites && jsonData.websites.length > 0) {
      resumeData.personalInfo.website = jsonData.websites[0].url;
    }

    // Parse summary
    if (jsonData.summary) {
      resumeData.summary = jsonData.summary;
    }

    // Parse experience
    if (jsonData.positions && Array.isArray(jsonData.positions)) {
      resumeData.experience = jsonData.positions.map((pos, idx) => ({
        id: idx + 1,
        title: pos.title || "",
        company: pos.companyName || "",
        location: pos.location || "",
        startDate: formatDate(pos.startDate),
        endDate: pos.endDate ? formatDate(pos.endDate) : "Present",
        current: !pos.endDate,
        description: pos.description ? pos.description.split('\n').filter(line => line.trim()) : []
      }));
    }

    // Parse education
    if (jsonData.education && Array.isArray(jsonData.education)) {
      resumeData.education = jsonData.education.map((edu, idx) => ({
        id: idx + 1,
        degree: edu.degreeName || "",
        school: edu.schoolName || "",
        location: edu.location || "",
        graduationDate: formatDate(edu.endDate),
        gpa: edu.grade || ""
      }));
    }

    // Parse skills
    if (jsonData.skills && Array.isArray(jsonData.skills)) {
      resumeData.skills = jsonData.skills.map(skill =>
        typeof skill === 'string' ? skill : skill.name
      ).filter(Boolean);
    }

    // Parse certifications
    if (jsonData.certifications && Array.isArray(jsonData.certifications)) {
      resumeData.certifications = jsonData.certifications.map((cert, idx) => ({
        id: idx + 1,
        name: cert.name || "",
        issuer: cert.authority || "",
        date: formatDate(cert.startDate),
        expiryDate: cert.endDate ? formatDate(cert.endDate) : "",
        credentialId: cert.licenseNumber || ""
      }));
    }

    // Parse languages
    if (jsonData.languages && Array.isArray(jsonData.languages)) {
      resumeData.languages = jsonData.languages.map((lang, idx) => ({
        id: idx + 1,
        language: lang.name || "",
        proficiency: lang.proficiency || "Professional"
      }));
    }

    // Parse volunteer experience
    if (jsonData.volunteer && Array.isArray(jsonData.volunteer)) {
      resumeData.volunteer = jsonData.volunteer.map((vol, idx) => ({
        id: idx + 1,
        role: vol.role || "",
        organization: vol.organization || "",
        location: vol.location || "",
        startDate: formatDate(vol.startDate),
        endDate: vol.endDate ? formatDate(vol.endDate) : "Present",
        current: !vol.endDate,
        description: vol.description ? vol.description.split('\n').filter(line => line.trim()) : []
      }));
    }

    // Parse awards/honors
    if (jsonData.honors && Array.isArray(jsonData.honors)) {
      resumeData.awards = jsonData.honors.map((honor, idx) => ({
        id: idx + 1,
        title: honor.title || "",
        issuer: honor.issuer || "",
        date: formatDate(honor.issueDate),
        description: honor.description || ""
      }));
    }

    return resumeData;
  } catch (e) {
    // If not valid JSON, return empty structure
    console.error("Error parsing LinkedIn data:", e);
    return null;
  }
};

// Helper function to format dates
const formatDate = (dateObj) => {
  if (!dateObj) return "";

  if (typeof dateObj === 'string') {
    return dateObj;
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  if (dateObj.month && dateObj.year) {
    return `${months[dateObj.month - 1]} ${dateObj.year}`;
  } else if (dateObj.year) {
    return dateObj.year.toString();
  }

  return "";
};

// Instructions for users to export LinkedIn data
export const getLinkedInImportInstructions = () => {
  return `
To import your LinkedIn profile:

1. Go to LinkedIn Settings & Privacy
2. Navigate to 'Data Privacy'
3. Click 'Get a copy of your data'
4. Select 'Request archive'
5. Download the archive when ready
6. Extract and upload the Profile.json file

Or paste your LinkedIn profile JSON data directly into the import dialog.
  `.trim();
};
