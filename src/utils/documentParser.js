import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js to use the worker - use .mjs extension for newer versions
if (typeof window !== 'undefined') {
  // Use the correct file extension (.mjs for pdfjs-dist 3.0+)
  const workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  console.log('PDF.js worker configured:', workerSrc);
}

// Parse DOCX file
export const parseDOCX = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return parseResumeText(result.value);
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error('Failed to parse DOCX file. Please ensure it is a valid document.');
  }
};

// Parse PDF file
export const parsePDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();

    // Use disableWorker option as fallback if worker fails to load
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      // Disable worker as fallback - slower but more reliable
      useWorkerFetch: false,
      isEvalSupported: false,
    });

    const pdf = await loadingTask.promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return parseResumeText(fullText);
  } catch (error) {
    console.error('Error parsing PDF:', error);

    // Provide helpful error messages
    if (error.message && error.message.includes('Worker')) {
      throw new Error('PDF import requires internet connection. Please check your connection and try again, or use DOCX/JSON import instead.');
    }

    if (error.message && error.message.includes('password')) {
      throw new Error('This PDF is password-protected. Please use an unprotected PDF file.');
    }

    if (error.message && error.message.includes('Invalid PDF')) {
      throw new Error('Invalid or corrupted PDF file. Please try a different file or use DOCX/JSON import.');
    }

    throw new Error('Failed to parse PDF file. Try DOCX or JSON import as an alternative.');
  }
};

// Parse resume text and extract structured data
const parseResumeText = (text) => {
  const resumeData = {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      photo: null
    },
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

  const lines = text.split('\n').map(line => line.trim()).filter(line => line);

  // Extract email
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) {
    resumeData.personalInfo.email = emailMatch[0];
  }

  // Extract phone - try multiple patterns
  const phonePatterns = [
    /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,  // US/International
    /\d{10}/,  // 10 digit
    /\d{3}[-.\s]\d{3}[-.\s]\d{4}/,  // xxx-xxx-xxxx
    /\(\d{3}\)\s?\d{3}[-.\s]\d{4}/  // (xxx) xxx-xxxx
  ];

  for (const pattern of phonePatterns) {
    const phoneMatch = text.match(pattern);
    if (phoneMatch) {
      resumeData.personalInfo.phone = phoneMatch[0];
      break;
    }
  }

  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) {
    resumeData.personalInfo.linkedin = linkedinMatch[0];
  }

  // Extract website
  const websiteMatch = text.match(/(?:https?:\/\/)?(?:www\.)?[\w-]+\.(?:com|net|org|io|dev)[\w/-]*/);
  if (websiteMatch && !websiteMatch[0].includes('linkedin')) {
    resumeData.personalInfo.website = websiteMatch[0];
  }

  // Try to extract name (usually first line or largest text)
  if (lines.length > 0) {
    // Try multiple approaches to find the name
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i];

      // Skip if line contains email, phone, or common non-name patterns
      if (line.includes('@') || line.includes('http') || /\d{3}/.test(line)) {
        continue;
      }

      // More flexible name pattern - 1-4 words, mostly letters
      const namePattern = /^[A-Z][a-zA-Z'\-]+(?: [A-Z][a-zA-Z'\-]+){0,3}$/;
      if (namePattern.test(line) && line.length > 3 && line.length < 50) {
        resumeData.personalInfo.fullName = line;
        break;
      }

      // Alternative: just letters and spaces, reasonable length
      if (/^[A-Za-z\s]{3,40}$/.test(line) && !line.toLowerCase().includes('resume')) {
        resumeData.personalInfo.fullName = line;
        break;
      }
    }

    // If still no name, use first non-contact line
    if (!resumeData.personalInfo.fullName && lines.length > 0) {
      const firstNonContact = lines.find(line =>
        !line.includes('@') &&
        !line.includes('http') &&
        !/\d{9,}/.test(line) &&
        line.length > 5 &&
        line.length < 50
      );
      if (firstNonContact) {
        resumeData.personalInfo.fullName = firstNonContact;
      }
    }
  }

  console.log('Extracted name:', resumeData.personalInfo.fullName);
  console.log('Extracted email:', resumeData.personalInfo.email);
  console.log('First 10 lines:', lines.slice(0, 10));

  // Extract location - try multiple patterns
  const locationPatterns = [
    /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*India/i,  // City, India
    /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z]{2})/,  // City, ST (state code)
    /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z][a-z]+)/,  // City, Country/State
  ];

  for (const pattern of locationPatterns) {
    const locationMatch = text.match(pattern);
    if (locationMatch) {
      resumeData.personalInfo.location = locationMatch[0];
      break;
    }
  }

  // Extract sections based on common headers
  const sections = extractSections(lines);
  console.log('Detected sections:', Object.keys(sections));

  // Parse experience section
  if (sections.experience) {
    resumeData.experience = parseExperienceSection(sections.experience);
    console.log('Parsed experience items:', resumeData.experience.length);
  }

  // Parse education section
  if (sections.education) {
    resumeData.education = parseEducationSection(sections.education);
    console.log('Parsed education items:', resumeData.education.length);
  }

  // Parse skills section
  if (sections.skills) {
    resumeData.skills = parseSkillsSection(sections.skills);
    console.log('Parsed skills:', resumeData.skills.length);
  }

  // Parse summary/objective
  if (sections.summary) {
    resumeData.summary = sections.summary.join(' ');
    console.log('Parsed summary length:', resumeData.summary.length);
  }

  // Parse projects
  if (sections.projects) {
    resumeData.projects = parseProjectsSection(sections.projects);
    console.log('Parsed projects:', resumeData.projects.length);
  }

  // Parse certifications
  if (sections.certifications) {
    resumeData.certifications = parseCertificationsSection(sections.certifications);
    console.log('Parsed certifications:', resumeData.certifications.length);
  }

  console.log('Final parsed data:', resumeData);
  return resumeData;
};

// Extract sections from resume text
const extractSections = (lines) => {
  const sections = {};
  let currentSection = null;
  let currentContent = [];

  const sectionHeaders = {
    experience: /^(work\s+)?experience|employment|professional\s+experience/i,
    education: /^education|academic|qualification/i,
    skills: /^skills|technical\s+skills|competencies|technologies/i,
    summary: /^summary|objective|profile|about/i,
    projects: /^projects|portfolio/i,
    certifications: /^certifications?|licenses?/i,
    volunteer: /^volunteer|community/i,
    awards: /^awards?|honors?|achievements?/i
  };

  for (const line of lines) {
    let foundSection = false;

    for (const [sectionName, pattern] of Object.entries(sectionHeaders)) {
      if (pattern.test(line)) {
        if (currentSection && currentContent.length > 0) {
          sections[currentSection] = currentContent;
        }
        currentSection = sectionName;
        currentContent = [];
        foundSection = true;
        break;
      }
    }

    if (!foundSection && currentSection) {
      currentContent.push(line);
    }
  }

  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent;
  }

  return sections;
};

// Parse experience section
const parseExperienceSection = (lines) => {
  const experiences = [];
  let currentExp = null;

  for (const line of lines) {
    // Check if line looks like a job title or company
    const datePattern = /\b(19|20)\d{2}\b|present|current/i;
    const hasDates = datePattern.test(line);

    if (hasDates || line.length > 20) {
      if (currentExp && currentExp.title) {
        experiences.push(currentExp);
      }

      currentExp = {
        id: experiences.length + 1,
        title: line.split('|')[0].trim(),
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: []
      };

      // Try to extract dates from line
      const dateMatch = line.match(/(\w+\s+\d{4})\s*[-–—]\s*(\w+\s+\d{4}|present|current)/i);
      if (dateMatch) {
        currentExp.startDate = dateMatch[1];
        currentExp.endDate = dateMatch[2];
        currentExp.current = /present|current/i.test(dateMatch[2]);
      }
    } else if (currentExp) {
      if (!currentExp.company && line.length < 50) {
        currentExp.company = line;
      } else if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
        currentExp.description.push(line.replace(/^[•\-*]\s*/, ''));
      } else {
        currentExp.description.push(line);
      }
    }
  }

  if (currentExp && currentExp.title) {
    experiences.push(currentExp);
  }

  return experiences;
};

// Parse education section
const parseEducationSection = (lines) => {
  const education = [];
  let currentEdu = null;

  for (const line of lines) {
    const degreePattern = /bachelor|master|phd|associate|b\.s\.|m\.s\.|b\.a\.|m\.a\./i;
    const hasDegree = degreePattern.test(line);

    if (hasDegree || (line.length > 15 && !currentEdu)) {
      if (currentEdu) {
        education.push(currentEdu);
      }

      currentEdu = {
        id: education.length + 1,
        degree: line,
        school: "",
        location: "",
        graduationDate: "",
        gpa: ""
      };

      // Try to extract GPA
      const gpaMatch = line.match(/gpa:?\s*(\d\.\d+)/i);
      if (gpaMatch) {
        currentEdu.gpa = gpaMatch[1];
      }

      // Try to extract graduation date
      const dateMatch = line.match(/\b(19|20)\d{2}\b/);
      if (dateMatch) {
        currentEdu.graduationDate = dateMatch[0];
      }
    } else if (currentEdu && !currentEdu.school) {
      currentEdu.school = line;
    }
  }

  if (currentEdu) {
    education.push(currentEdu);
  }

  return education;
};

// Parse skills section
const parseSkillsSection = (lines) => {
  const skills = [];
  const text = lines.join(' ');

  // Split by common separators
  const skillList = text.split(/[,;|•\-\n]/);

  for (const skill of skillList) {
    const cleaned = skill.trim();
    if (cleaned && cleaned.length > 1 && cleaned.length < 30) {
      skills.push(cleaned);
    }
  }

  return skills;
};

// Parse projects section
const parseProjectsSection = (lines) => {
  const projects = [];
  let currentProject = null;

  for (const line of lines) {
    if (line.length > 15 && !line.startsWith('•') && !line.startsWith('-')) {
      if (currentProject) {
        projects.push(currentProject);
      }

      currentProject = {
        id: projects.length + 1,
        name: line.split('|')[0].trim(),
        description: "",
        technologies: [],
        link: "",
        date: ""
      };

      // Try to extract date
      const dateMatch = line.match(/\b(19|20)\d{2}\b/);
      if (dateMatch) {
        currentProject.date = dateMatch[0];
      }
    } else if (currentProject) {
      if (line.startsWith('•') || line.startsWith('-')) {
        currentProject.description += (currentProject.description ? ' ' : '') +
          line.replace(/^[•\-]\s*/, '');
      } else {
        currentProject.description += (currentProject.description ? ' ' : '') + line;
      }
    }
  }

  if (currentProject) {
    projects.push(currentProject);
  }

  return projects;
};

// Parse certifications section
const parseCertificationsSection = (lines) => {
  const certifications = [];

  for (const line of lines) {
    if (line.length > 5) {
      const cert = {
        id: certifications.length + 1,
        name: line.split('|')[0].trim(),
        issuer: "",
        date: "",
        expiryDate: "",
        credentialId: ""
      };

      // Try to extract date
      const dateMatch = line.match(/(\w+\s+\d{4})/);
      if (dateMatch) {
        cert.date = dateMatch[0];
      }

      certifications.push(cert);
    }
  }

  return certifications;
};
