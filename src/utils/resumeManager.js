// Resume management utilities for storing and managing multiple resumes

const RESUMES_KEY = 'resumesList';
const CURRENT_RESUME_KEY = 'currentResumeId';

// Get all saved resumes
export const getAllResumes = () => {
  try {
    const resumesList = localStorage.getItem(RESUMES_KEY);
    return resumesList ? JSON.parse(resumesList) : [];
  } catch (e) {
    console.error('Error loading resumes:', e);
    return [];
  }
};

// Save a resume
export const saveResume = (resumeData, resumeId = null) => {
  try {
    const resumes = getAllResumes();
    const id = resumeId || generateId();
    const timestamp = new Date().toISOString();

    const resumeInfo = {
      id,
      name: resumeData.personalInfo?.fullName || 'Untitled Resume',
      data: resumeData,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    const existingIndex = resumes.findIndex(r => r.id === id);
    if (existingIndex >= 0) {
      resumeInfo.createdAt = resumes[existingIndex].createdAt;
      resumes[existingIndex] = resumeInfo;
    } else {
      resumes.push(resumeInfo);
    }

    localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
    localStorage.setItem(CURRENT_RESUME_KEY, id);

    return resumeInfo;
  } catch (e) {
    console.error('Error saving resume:', e);
    throw new Error('Failed to save resume');
  }
};

// Load a specific resume
export const loadResume = (resumeId) => {
  try {
    const resumes = getAllResumes();
    const resume = resumes.find(r => r.id === resumeId);

    if (resume) {
      localStorage.setItem(CURRENT_RESUME_KEY, resumeId);
      localStorage.setItem('resumeData', JSON.stringify(resume.data));
      return resume;
    }

    return null;
  } catch (e) {
    console.error('Error loading resume:', e);
    throw new Error('Failed to load resume');
  }
};

// Delete a resume
export const deleteResume = (resumeId) => {
  try {
    const resumes = getAllResumes();
    const filteredResumes = resumes.filter(r => r.id !== resumeId);
    localStorage.setItem(RESUMES_KEY, JSON.stringify(filteredResumes));

    const currentId = getCurrentResumeId();
    if (currentId === resumeId) {
      localStorage.removeItem(CURRENT_RESUME_KEY);
      localStorage.removeItem('resumeData');
    }

    return true;
  } catch (e) {
    console.error('Error deleting resume:', e);
    throw new Error('Failed to delete resume');
  }
};

// Duplicate a resume
export const duplicateResume = (resumeId) => {
  try {
    const resumes = getAllResumes();
    const originalResume = resumes.find(r => r.id === resumeId);

    if (!originalResume) {
      throw new Error('Resume not found');
    }

    const duplicatedData = JSON.parse(JSON.stringify(originalResume.data));
    const newId = generateId();
    const timestamp = new Date().toISOString();

    const newResume = {
      id: newId,
      name: `${originalResume.name} (Copy)`,
      data: duplicatedData,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    resumes.push(newResume);
    localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));

    return newResume;
  } catch (e) {
    console.error('Error duplicating resume:', e);
    throw new Error('Failed to duplicate resume');
  }
};

// Get current resume ID
export const getCurrentResumeId = () => {
  return localStorage.getItem(CURRENT_RESUME_KEY);
};

// Rename a resume
export const renameResume = (resumeId, newName) => {
  try {
    const resumes = getAllResumes();
    const resume = resumes.find(r => r.id === resumeId);

    if (resume) {
      resume.name = newName;
      resume.updatedAt = new Date().toISOString();
      localStorage.setItem(RESUMES_KEY, JSON.stringify(resumes));
      return resume;
    }

    return null;
  } catch (e) {
    console.error('Error renaming resume:', e);
    throw new Error('Failed to rename resume');
  }
};

// Generate unique ID
const generateId = () => {
  return `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Import resume from JSON
export const importFromJSON = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);

    // Validate basic structure
    if (!data.personalInfo) {
      throw new Error('Invalid resume data: missing personalInfo');
    }

    return data;
  } catch (e) {
    console.error('Error importing JSON:', e);
    throw new Error('Failed to import resume: Invalid JSON format');
  }
};
