import { saveAs } from 'file-saver';

// Export resume data as JSON
export const exportAsJSON = (resumeData, fileName = 'resume') => {
  const dataStr = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  saveAs(blob, `${fileName}.json`);
};

// Export resume data as plain text
export const exportAsText = (resumeData, fileName = 'resume') => {
  const textContent = generateTextContent(resumeData);
  const blob = new Blob([textContent], { type: 'text/plain' });
  saveAs(blob, `${fileName}.txt`);
};

// Export resume data as HTML
export const exportAsHTML = (resumeData, fileName = 'resume') => {
  const htmlContent = generateHTMLContent(resumeData);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  saveAs(blob, `${fileName}.html`);
};

// Generate plain text version of resume
const generateTextContent = (resumeData) => {
  const sections = [];

  // Personal Information
  const { personalInfo } = resumeData;
  sections.push(personalInfo.fullName);
  if (personalInfo.email) sections.push(personalInfo.email);
  if (personalInfo.phone) sections.push(personalInfo.phone);
  if (personalInfo.location) sections.push(personalInfo.location);
  if (personalInfo.linkedin) sections.push(personalInfo.linkedin);
  if (personalInfo.website) sections.push(personalInfo.website);
  sections.push('');

  // Get section order
  const sectionOrder = resumeData.customization?.sectionOrder ||
    ["summary", "experience", "projects", "education", "certifications", "skills", "languages", "volunteer", "awards"];

  const sectionVisibility = resumeData.sectionVisibility || {};

  // Generate sections in order
  for (const sectionName of sectionOrder) {
    if (!sectionVisibility[sectionName]) continue;

    switch (sectionName) {
      case 'summary':
        if (resumeData.summary) {
          sections.push('PROFESSIONAL SUMMARY');
          sections.push('='.repeat(50));
          sections.push(resumeData.summary);
          sections.push('');
        }
        break;

      case 'experience':
        if (resumeData.experience?.length > 0) {
          sections.push('WORK EXPERIENCE');
          sections.push('='.repeat(50));
          resumeData.experience.forEach(exp => {
            sections.push(`${exp.title} at ${exp.company}`);
            if (exp.location) sections.push(exp.location);
            sections.push(`${exp.startDate} - ${exp.endDate}`);
            if (exp.description?.length > 0) {
              exp.description.forEach(item => sections.push(`  • ${item}`));
            }
            sections.push('');
          });
        }
        break;

      case 'projects':
        if (resumeData.projects?.length > 0) {
          sections.push('PROJECTS');
          sections.push('='.repeat(50));
          resumeData.projects.forEach(project => {
            sections.push(project.name);
            if (project.date) sections.push(project.date);
            if (project.description) sections.push(project.description);
            if (project.technologies?.length > 0) {
              sections.push(`Technologies: ${project.technologies.join(', ')}`);
            }
            if (project.link) sections.push(project.link);
            sections.push('');
          });
        }
        break;

      case 'education':
        if (resumeData.education?.length > 0) {
          sections.push('EDUCATION');
          sections.push('='.repeat(50));
          resumeData.education.forEach(edu => {
            sections.push(edu.degree);
            sections.push(edu.school);
            if (edu.location) sections.push(edu.location);
            if (edu.graduationDate) sections.push(`Graduated: ${edu.graduationDate}`);
            if (edu.gpa) sections.push(`GPA: ${edu.gpa}`);
            sections.push('');
          });
        }
        break;

      case 'certifications':
        if (resumeData.certifications?.length > 0) {
          sections.push('CERTIFICATIONS');
          sections.push('='.repeat(50));
          resumeData.certifications.forEach(cert => {
            sections.push(cert.name);
            if (cert.issuer) sections.push(`Issued by: ${cert.issuer}`);
            if (cert.date) sections.push(`Date: ${cert.date}`);
            if (cert.expiryDate) sections.push(`Expires: ${cert.expiryDate}`);
            if (cert.credentialId) sections.push(`Credential ID: ${cert.credentialId}`);
            sections.push('');
          });
        }
        break;

      case 'skills':
        if (resumeData.skills?.length > 0) {
          sections.push('SKILLS');
          sections.push('='.repeat(50));
          sections.push(resumeData.skills.join(' • '));
          sections.push('');
        }
        break;

      case 'languages':
        if (resumeData.languages?.length > 0) {
          sections.push('LANGUAGES');
          sections.push('='.repeat(50));
          resumeData.languages.forEach(lang => {
            sections.push(`${lang.language}: ${lang.proficiency}`);
          });
          sections.push('');
        }
        break;

      case 'volunteer':
        if (resumeData.volunteer?.length > 0) {
          sections.push('VOLUNTEER EXPERIENCE');
          sections.push('='.repeat(50));
          resumeData.volunteer.forEach(vol => {
            sections.push(`${vol.role} at ${vol.organization}`);
            if (vol.location) sections.push(vol.location);
            sections.push(`${vol.startDate} - ${vol.endDate}`);
            if (vol.description?.length > 0) {
              vol.description.forEach(item => sections.push(`  • ${item}`));
            }
            sections.push('');
          });
        }
        break;

      case 'awards':
        if (resumeData.awards?.length > 0) {
          sections.push('AWARDS & HONORS');
          sections.push('='.repeat(50));
          resumeData.awards.forEach(award => {
            sections.push(award.title);
            if (award.issuer) sections.push(`Issued by: ${award.issuer}`);
            if (award.date) sections.push(`Date: ${award.date}`);
            if (award.description) sections.push(award.description);
            sections.push('');
          });
        }
        break;
    }
  }

  return sections.join('\n');
};

// Generate HTML version of resume
const generateHTMLContent = (resumeData) => {
  const { personalInfo } = resumeData;
  const accentColor = resumeData.customization?.accentColor || '#2563eb';

  // Get section order
  const sectionOrder = resumeData.customization?.sectionOrder ||
    ["summary", "experience", "projects", "education", "certifications", "skills", "languages", "volunteer", "awards"];

  const sectionVisibility = resumeData.sectionVisibility || {};

  let sectionsHTML = '';

  // Generate sections in order
  for (const sectionName of sectionOrder) {
    if (!sectionVisibility[sectionName]) continue;

    switch (sectionName) {
      case 'summary':
        if (resumeData.summary) {
          sectionsHTML += `
            <section>
              <h2>Professional Summary</h2>
              <p>${escapeHtml(resumeData.summary)}</p>
            </section>
          `;
        }
        break;

      case 'experience':
        if (resumeData.experience?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Work Experience</h2>
              ${resumeData.experience.map(exp => `
                <div class="experience-item">
                  <h3>${escapeHtml(exp.title)}</h3>
                  <p class="company">${escapeHtml(exp.company)}</p>
                  ${exp.location ? `<p class="location">${escapeHtml(exp.location)}</p>` : ''}
                  <p class="date">${escapeHtml(exp.startDate)} - ${escapeHtml(exp.endDate)}</p>
                  ${exp.description?.length > 0 ? `
                    <ul>
                      ${exp.description.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            </section>
          `;
        }
        break;

      case 'projects':
        if (resumeData.projects?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Projects</h2>
              ${resumeData.projects.map(project => `
                <div class="project-item">
                  <h3>${escapeHtml(project.name)}</h3>
                  ${project.date ? `<p class="date">${escapeHtml(project.date)}</p>` : ''}
                  ${project.description ? `<p>${escapeHtml(project.description)}</p>` : ''}
                  ${project.technologies?.length > 0 ? `
                    <p class="technologies">Technologies: ${project.technologies.map(t => escapeHtml(t)).join(', ')}</p>
                  ` : ''}
                  ${project.link ? `<p class="link"><a href="${escapeHtml(project.link)}">${escapeHtml(project.link)}</a></p>` : ''}
                </div>
              `).join('')}
            </section>
          `;
        }
        break;

      case 'education':
        if (resumeData.education?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Education</h2>
              ${resumeData.education.map(edu => `
                <div class="education-item">
                  <h3>${escapeHtml(edu.degree)}</h3>
                  <p class="school">${escapeHtml(edu.school)}</p>
                  ${edu.location ? `<p class="location">${escapeHtml(edu.location)}</p>` : ''}
                  ${edu.graduationDate ? `<p class="date">Graduated: ${escapeHtml(edu.graduationDate)}</p>` : ''}
                  ${edu.gpa ? `<p class="gpa">GPA: ${escapeHtml(edu.gpa)}</p>` : ''}
                </div>
              `).join('')}
            </section>
          `;
        }
        break;

      case 'certifications':
        if (resumeData.certifications?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Certifications</h2>
              ${resumeData.certifications.map(cert => `
                <div class="certification-item">
                  <h3>${escapeHtml(cert.name)}</h3>
                  ${cert.issuer ? `<p class="issuer">Issued by: ${escapeHtml(cert.issuer)}</p>` : ''}
                  ${cert.date ? `<p class="date">Date: ${escapeHtml(cert.date)}</p>` : ''}
                  ${cert.expiryDate ? `<p class="expiry">Expires: ${escapeHtml(cert.expiryDate)}</p>` : ''}
                  ${cert.credentialId ? `<p class="credential">Credential ID: ${escapeHtml(cert.credentialId)}</p>` : ''}
                </div>
              `).join('')}
            </section>
          `;
        }
        break;

      case 'skills':
        if (resumeData.skills?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Skills</h2>
              <div class="skills-list">
                ${resumeData.skills.map(skill => `<span class="skill">${escapeHtml(skill)}</span>`).join('')}
              </div>
            </section>
          `;
        }
        break;

      case 'languages':
        if (resumeData.languages?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Languages</h2>
              ${resumeData.languages.map(lang => `
                <div class="language-item">
                  <span class="language">${escapeHtml(lang.language)}</span>: ${escapeHtml(lang.proficiency)}
                </div>
              `).join('')}
            </section>
          `;
        }
        break;

      case 'volunteer':
        if (resumeData.volunteer?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Volunteer Experience</h2>
              ${resumeData.volunteer.map(vol => `
                <div class="volunteer-item">
                  <h3>${escapeHtml(vol.role)}</h3>
                  <p class="organization">${escapeHtml(vol.organization)}</p>
                  ${vol.location ? `<p class="location">${escapeHtml(vol.location)}</p>` : ''}
                  <p class="date">${escapeHtml(vol.startDate)} - ${escapeHtml(vol.endDate)}</p>
                  ${vol.description?.length > 0 ? `
                    <ul>
                      ${vol.description.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              `).join('')}
            </section>
          `;
        }
        break;

      case 'awards':
        if (resumeData.awards?.length > 0) {
          sectionsHTML += `
            <section>
              <h2>Awards & Honors</h2>
              ${resumeData.awards.map(award => `
                <div class="award-item">
                  <h3>${escapeHtml(award.title)}</h3>
                  ${award.issuer ? `<p class="issuer">Issued by: ${escapeHtml(award.issuer)}</p>` : ''}
                  ${award.date ? `<p class="date">Date: ${escapeHtml(award.date)}</p>` : ''}
                  ${award.description ? `<p>${escapeHtml(award.description)}</p>` : ''}
                </div>
              `).join('')}
            </section>
          `;
        }
        break;
    }
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume - ${escapeHtml(personalInfo.fullName)}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    header {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid ${accentColor};
    }

    h1 {
      color: ${accentColor};
      font-size: 32px;
      margin-bottom: 10px;
    }

    .contact-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      font-size: 14px;
      color: #666;
    }

    .contact-info span {
      display: inline-block;
    }

    section {
      margin-bottom: 30px;
    }

    h2 {
      color: ${accentColor};
      font-size: 20px;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 1px solid #ddd;
    }

    h3 {
      color: #333;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .experience-item,
    .education-item,
    .project-item,
    .certification-item,
    .volunteer-item,
    .award-item {
      margin-bottom: 20px;
    }

    .company,
    .school,
    .organization,
    .issuer {
      font-weight: bold;
      color: #555;
    }

    .date,
    .location {
      color: #666;
      font-size: 14px;
      font-style: italic;
    }

    ul {
      margin-top: 10px;
      margin-left: 20px;
    }

    li {
      margin-bottom: 5px;
    }

    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .skill {
      background-color: #f0f0f0;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 14px;
    }

    .language-item {
      margin-bottom: 8px;
    }

    .language {
      font-weight: bold;
    }

    a {
      color: ${accentColor};
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    @media print {
      body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(personalInfo.fullName)}</h1>
    <div class="contact-info">
      ${personalInfo.email ? `<span>${escapeHtml(personalInfo.email)}</span>` : ''}
      ${personalInfo.phone ? `<span>${escapeHtml(personalInfo.phone)}</span>` : ''}
      ${personalInfo.location ? `<span>${escapeHtml(personalInfo.location)}</span>` : ''}
      ${personalInfo.linkedin ? `<span><a href="https://${escapeHtml(personalInfo.linkedin)}">${escapeHtml(personalInfo.linkedin)}</a></span>` : ''}
      ${personalInfo.website ? `<span><a href="https://${escapeHtml(personalInfo.website)}">${escapeHtml(personalInfo.website)}</a></span>` : ''}
    </div>
  </header>

  ${sectionsHTML}
</body>
</html>`;
};

// Helper function to escape HTML
const escapeHtml = (text) => {
  if (!text) return '';
  return text
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
