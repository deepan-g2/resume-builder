import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer'

// Helper function to safely join strings with separator
const safeJoin = (items, separator = ' | ') => {
  return items.filter(item => item && item.trim && item.trim()).join(separator);
};

// Helper to ensure non-empty string for Text components
const safeText = (text, fallback = '') => {
  return (text && text.trim && text.trim()) ? text : fallback;
};

// Modern Template Styles - Dynamic function
const createModernStyles = (customization = {}) => {
  const {
    accentColor = '#2563eb',
    fontFamily = 'Helvetica',
    fontSize = 11,
    fontWeight = 'normal',
    lineSpacing = 1.5,
    paragraphSpacing = 12,
    pageMargin = 40,
    showPageBorder = false,
    borderWidth = 2,
    borderColor = '#e5e7eb'
  } = customization

  return StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: fontFamily,
    padding: pageMargin,
    ...(showPageBorder && {
      border: `${borderWidth}px solid ${borderColor}`
    })
  },
  header: {
    backgroundColor: accentColor,
    color: '#ffffff',
    padding: pageMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: fontSize * 2.5,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    fontSize: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  contactText: {
    marginLeft: 4,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    border: '4px solid #ffffff',
    objectFit: 'cover',
  },
  content: {
    padding: pageMargin,
  },
  section: {
    marginBottom: paragraphSpacing + 8,
  },
  sectionTitle: {
    fontSize: fontSize * 1.3,
    fontWeight: 'bold',
    color: accentColor,
    borderBottom: `2px solid ${accentColor}`,
    paddingBottom: 6,
    marginBottom: paragraphSpacing,
  },
  summaryText: {
    fontSize: fontSize,
    lineHeight: lineSpacing,
    color: '#374151',
    fontFamily: fontWeight === 'bold' ? `${fontFamily}-Bold` : fontFamily,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: fontSize * 1.2,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: fontSize * 0.9,
    color: '#6b7280',
  },
  company: {
    fontSize: fontSize,
    color: '#374151',
    marginBottom: 6,
  },
  bulletList: {
    marginLeft: 16,
  },
  bulletItem: {
    fontSize: fontSize,
    color: '#374151',
    marginBottom: 3,
    flexDirection: 'row',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#374151',
    marginRight: 8,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: lineSpacing,
    fontFamily: fontWeight === 'bold' ? `${fontFamily}-Bold` : fontFamily,
  },
  educationItem: {
    marginBottom: paragraphSpacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationLeft: {
    flex: 1,
  },
  educationRight: {
    textAlign: 'right',
  },
  degree: {
    fontSize: fontSize * 1.1,
    fontWeight: 'bold',
    color: '#111827',
  },
  school: {
    fontSize: fontSize,
    color: '#374151',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: `${accentColor}20`, // 20 is 12% opacity in hex
    color: accentColor,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: fontSize * 0.9,
    fontWeight: 'bold',
  },
})
}

// Modern Template Component
export function ModernTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const modernStyles = createModernStyles(customization)

  // Section components
  const sections = {
    summary: summary && sectionVisibility.summary !== false && (
      <View style={modernStyles.section} wrap={false} key="summary">
        <Text style={modernStyles.sectionTitle}>Professional Summary</Text>
        <Text style={modernStyles.summaryText}>{summary}</Text>
      </View>
    ),
    experience: experience.length > 0 && sectionVisibility.experience !== false && (
      <View style={modernStyles.section} key="experience">
        <Text style={modernStyles.sectionTitle}>Work Experience</Text>
        {experience.map((exp, index) => (
          <View key={exp.id} style={modernStyles.experienceItem} wrap={false}>
            <View style={modernStyles.experienceHeader}>
              <Text style={modernStyles.jobTitle}>{exp.title}</Text>
              <Text style={modernStyles.dateText}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
            </View>
            <Text style={modernStyles.company}>
              {safeJoin([exp.company, exp.location])}
            </Text>
            <View style={modernStyles.bulletList}>
              {exp.description.map((desc, i) => desc && (
                <View key={i} style={modernStyles.bulletItem}>
                  <View style={modernStyles.bullet} />
                  <Text style={modernStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    ),
    education: education.length > 0 && sectionVisibility.education !== false && (
      <View style={modernStyles.section} key="education">
        <Text style={modernStyles.sectionTitle}>Education</Text>
        {education.map((edu) => (
          <View key={edu.id} style={modernStyles.educationItem} wrap={false}>
            <View style={modernStyles.educationLeft}>
              <Text style={modernStyles.degree}>{edu.degree}</Text>
              <Text style={modernStyles.school}>{edu.school}</Text>
            </View>
            <View style={modernStyles.educationRight}>
              <Text style={modernStyles.dateText}>{edu.graduationDate}</Text>
              <Text style={modernStyles.school}>{edu.location}</Text>
              {edu.gpa && <Text style={modernStyles.school}>GPA: {edu.gpa}</Text>}
            </View>
          </View>
        ))}
      </View>
    ),
    skills: skills.length > 0 && sectionVisibility.skills !== false && (
      <View style={modernStyles.section} wrap={false} key="skills">
        <Text style={modernStyles.sectionTitle}>Skills</Text>
        <View style={modernStyles.skillsContainer}>
          {skills.map((skill, i) => (
            <Text key={i} style={modernStyles.skillTag}>{skill}</Text>
          ))}
        </View>
      </View>
    ),
    projects: projects.length > 0 && sectionVisibility.projects !== false && (
      <View style={modernStyles.section} key="projects">
        <Text style={modernStyles.sectionTitle}>Projects</Text>
        {projects.map((proj) => (
          <View key={proj.id} style={modernStyles.experienceItem} wrap={false}>
            <View style={modernStyles.experienceHeader}>
              <Text style={modernStyles.jobTitle}>{proj.name}</Text>
              {proj.date && <Text style={modernStyles.dateText}>{proj.date}</Text>}
            </View>
            {proj.description && (
              <Text style={modernStyles.summaryText}>{proj.description}</Text>
            )}
            {proj.technologies.length > 0 && (
              <View style={modernStyles.skillsContainer}>
                {proj.technologies.map((tech, i) => (
                  <Text key={i} style={modernStyles.skillTag}>{tech}</Text>
                ))}
              </View>
            )}
            {proj.link && (
              <Text style={modernStyles.school}>Link: {proj.link}</Text>
            )}
          </View>
        ))}
      </View>
    ),
    certifications: certifications.length > 0 && sectionVisibility.certifications !== false && (
      <View style={modernStyles.section} key="certifications">
        <Text style={modernStyles.sectionTitle}>Certifications</Text>
        {certifications.map((cert) => (
          <View key={cert.id} style={modernStyles.educationItem} wrap={false}>
            <View style={modernStyles.educationLeft}>
              <Text style={modernStyles.degree}>{cert.name}</Text>
              <Text style={modernStyles.school}>{cert.issuer}</Text>
              {cert.credentialId && <Text style={modernStyles.school}>ID: {cert.credentialId}</Text>}
            </View>
            <View style={modernStyles.educationRight}>
              <Text style={modernStyles.dateText}>{cert.date}</Text>
              {cert.expiryDate && <Text style={modernStyles.school}>Expires: {cert.expiryDate}</Text>}
            </View>
          </View>
        ))}
      </View>
    ),
    languages: languages.length > 0 && sectionVisibility.languages !== false && (
      <View style={modernStyles.section} wrap={false} key="languages">
        <Text style={modernStyles.sectionTitle}>Languages</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          {languages.map((lang) => (
            <View key={lang.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={modernStyles.degree}>{lang.language}</Text>
              <Text style={modernStyles.school}> - {lang.proficiency}</Text>
            </View>
          ))}
        </View>
      </View>
    ),
    volunteer: volunteer.length > 0 && sectionVisibility.volunteer !== false && (
      <View style={modernStyles.section} key="volunteer">
        <Text style={modernStyles.sectionTitle}>Volunteer Experience</Text>
        {volunteer.map((vol) => (
          <View key={vol.id} style={modernStyles.experienceItem} wrap={false}>
            <View style={modernStyles.experienceHeader}>
              <Text style={modernStyles.jobTitle}>{vol.role}</Text>
              <Text style={modernStyles.dateText}>
                {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
              </Text>
            </View>
            <Text style={modernStyles.company}>
              {safeJoin([vol.organization, vol.location])}
            </Text>
            <View style={modernStyles.bulletList}>
              {vol.description.map((desc, i) => desc && (
                <View key={i} style={modernStyles.bulletItem}>
                  <View style={modernStyles.bullet} />
                  <Text style={modernStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    ),
    awards: awards.length > 0 && sectionVisibility.awards !== false && (
      <View style={modernStyles.section} key="awards">
        <Text style={modernStyles.sectionTitle}>Awards & Honors</Text>
        {awards.map((award) => (
          <View key={award.id} style={modernStyles.experienceItem} wrap={false}>
            <View style={modernStyles.experienceHeader}>
              <Text style={modernStyles.jobTitle}>{award.title}</Text>
              {award.date && <Text style={modernStyles.dateText}>{award.date}</Text>}
            </View>
            <Text style={modernStyles.company}>{award.issuer}</Text>
            {award.description && (
              <Text style={modernStyles.summaryText}>{award.description}</Text>
            )}
          </View>
        ))}
      </View>
    )
  }

  // Get section order
  const sectionOrder = customization.sectionOrder || ['summary', 'experience', 'projects', 'education', 'certifications', 'skills', 'languages', 'volunteer', 'awards']

  return (
    <Document>
      <Page size="A4" style={modernStyles.page}>
        {/* Header */}
        <View style={modernStyles.header}>
          <View style={modernStyles.headerLeft}>
            <Text style={modernStyles.name}>{personalInfo.fullName}</Text>
            <View style={modernStyles.contactRow}>
              {personalInfo.email && (
                <View style={modernStyles.contactItem}>
                  <Text>✉ </Text>
                  <Text style={modernStyles.contactText}>{personalInfo.email}</Text>
                </View>
              )}
              {personalInfo.phone && (
                <View style={modernStyles.contactItem}>
                  <Text>☎ </Text>
                  <Text style={modernStyles.contactText}>{personalInfo.phone}</Text>
                </View>
              )}
              {personalInfo.location && (
                <View style={modernStyles.contactItem}>
                  <Text>📍 </Text>
                  <Text style={modernStyles.contactText}>{personalInfo.location}</Text>
                </View>
              )}
              {personalInfo.linkedin && (
                <View style={modernStyles.contactItem}>
                  <Text>💼 </Text>
                  <Text style={modernStyles.contactText}>{personalInfo.linkedin}</Text>
                </View>
              )}
              {personalInfo.website && (
                <View style={modernStyles.contactItem}>
                  <Text>🌐 </Text>
                  <Text style={modernStyles.contactText}>{personalInfo.website}</Text>
                </View>
              )}
            </View>
          </View>

          {personalInfo.photo && (
            <Image
              src={personalInfo.photo}
              style={modernStyles.photo}
            />
          )}
        </View>

        {/* Content - Render sections in custom order */}
        <View style={modernStyles.content}>
          {sectionOrder.map(sectionKey => sections[sectionKey]).filter(Boolean)}
        </View>
      </Page>
    </Document>
  )
}

// Classic Template Styles
const createClassicStyles = (customization = {}) => {
  const {
    accentColor = '#2563eb',
    fontFamily = 'Times-Roman',
    fontSize = 11,
    fontWeight = 'normal',
    lineSpacing = 1.5,
    paragraphSpacing = 12,
    pageMargin = 40,
    showPageBorder = false,
    borderWidth = 2,
    borderColor = '#e5e7eb'
  } = customization

  return StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: fontFamily === 'Helvetica' ? 'Times-Roman' : fontFamily,
    padding: pageMargin,
    ...(showPageBorder && {
      border: `${borderWidth}px solid ${borderColor}`
    })
  },
  header: {
    borderBottom: `4px solid ${accentColor}`,
    paddingBottom: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    border: `4px solid ${accentColor}`,
    marginBottom: 12,
    objectFit: 'cover',
  },
  name: {
    fontSize: fontSize * 2.5,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Times-Bold',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#374151',
    gap: 8,
  },
  contactText: {
    marginHorizontal: 4,
  },
  separator: {
    marginHorizontal: 4,
  },
  section: {
    marginBottom: paragraphSpacing + 8,
  },
  sectionTitle: {
    fontSize: fontSize * 1.3,
    fontWeight: 'bold',
    color: accentColor,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: paragraphSpacing,
    fontFamily: 'Times-Bold',
  },
  summaryText: {
    fontSize: fontSize,
    lineHeight: lineSpacing,
    color: '#374151',
    textAlign: 'justify',
    fontFamily: fontWeight === 'bold' ? 'Times-Bold' : 'Times-Roman',
  },
  experienceItem: {
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: fontSize * 1.2,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Times-Bold',
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  company: {
    fontSize: fontSize,
    color: '#374151',
    fontStyle: 'italic',
    fontFamily: 'Times-Italic',
  },
  dateLocation: {
    fontSize: fontSize * 0.9,
    color: '#6b7280',
  },
  bulletList: {
    marginLeft: 20,
  },
  bulletItem: {
    fontSize: fontSize,
    color: '#374151',
    marginBottom: 3,
    flexDirection: 'row',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: accentColor,
    marginRight: 8,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: lineSpacing,
    fontFamily: fontWeight === 'bold' ? 'Times-Bold' : 'Times-Roman',
  },
  educationItem: {
    marginBottom: paragraphSpacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  degree: {
    fontSize: fontSize * 1.1,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Times-Bold',
  },
  school: {
    fontSize: fontSize,
    color: '#374151',
    fontFamily: 'Times-Italic',
  },
  skills: {
    fontSize: fontSize,
    color: '#374151',
    lineHeight: lineSpacing,
    fontFamily: fontWeight === 'bold' ? 'Times-Bold' : 'Times-Roman',
  },
})
}

// Classic Template Component
export function ClassicTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const classicStyles = createClassicStyles(customization)

  // Section components
  const sections = {
    summary: summary && sectionVisibility.summary !== false && (
      <View style={classicStyles.section} wrap={false} key="summary">
        <Text style={classicStyles.sectionTitle}>Professional Summary</Text>
        <Text style={classicStyles.summaryText}>{summary}</Text>
      </View>
    ),
    experience: experience.length > 0 && sectionVisibility.experience !== false && (
      <View style={classicStyles.section} key="experience">
        <Text style={classicStyles.sectionTitle}>Professional Experience</Text>
        {experience.map((exp) => (
          <View key={exp.id} style={classicStyles.experienceItem} wrap={false}>
            <View style={classicStyles.experienceHeader}>
              <Text style={classicStyles.jobTitle}>{exp.title}</Text>
              <Text style={classicStyles.dateLocation}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
            </View>
            <View style={classicStyles.companyRow}>
              <Text style={classicStyles.company}>{exp.company}</Text>
              <Text style={classicStyles.dateLocation}>{exp.location}</Text>
            </View>
            <View style={classicStyles.bulletList}>
              {exp.description.map((desc, i) => desc && (
                <View key={i} style={classicStyles.bulletItem}>
                  <View style={classicStyles.bullet} />
                  <Text style={classicStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    ),
    education: education.length > 0 && sectionVisibility.education !== false && (
      <View style={classicStyles.section} key="education">
        <Text style={classicStyles.sectionTitle}>Education</Text>
        {education.map((edu) => (
          <View key={edu.id} style={classicStyles.educationItem} wrap={false}>
            <View>
              <Text style={classicStyles.degree}>{edu.degree}</Text>
              <Text style={classicStyles.school}>{edu.school}</Text>
            </View>
            <View>
              <Text style={classicStyles.dateLocation}>{edu.graduationDate}</Text>
              <Text style={classicStyles.school}>{edu.location}</Text>
              {edu.gpa && <Text style={classicStyles.school}>GPA: {edu.gpa}</Text>}
            </View>
          </View>
        ))}
      </View>
    ),
    skills: skills.length > 0 && sectionVisibility.skills !== false && (
      <View style={classicStyles.section} wrap={false} key="skills">
        <Text style={classicStyles.sectionTitle}>Skills</Text>
        <Text style={classicStyles.skills}>{skills.join(' • ')}</Text>
      </View>
    ),
    projects: projects.length > 0 && sectionVisibility.projects !== false && (
      <View style={classicStyles.section} key="projects">
        <Text style={classicStyles.sectionTitle}>Projects</Text>
        {projects.map((proj) => (
          <View key={proj.id} style={classicStyles.experienceItem} wrap={false}>
            <View style={classicStyles.experienceHeader}>
              <Text style={classicStyles.jobTitle}>{proj.name}</Text>
              {proj.date && <Text style={classicStyles.dateLocation}>{proj.date}</Text>}
            </View>
            {proj.description && (
              <Text style={classicStyles.school}>{proj.description}</Text>
            )}
            {proj.technologies.length > 0 && (
              <Text style={classicStyles.school}>Technologies: {proj.technologies.join(', ')}</Text>
            )}
            {proj.link && (
              <Text style={classicStyles.school}>Link: {proj.link}</Text>
            )}
          </View>
        ))}
      </View>
    ),
    certifications: certifications.length > 0 && sectionVisibility.certifications !== false && (
      <View style={classicStyles.section} key="certifications">
        <Text style={classicStyles.sectionTitle}>Certifications</Text>
        {certifications.map((cert) => (
          <View key={cert.id} style={classicStyles.educationItem} wrap={false}>
            <View>
              <Text style={classicStyles.degree}>{cert.name}</Text>
              <Text style={classicStyles.school}>{cert.issuer}</Text>
              {cert.credentialId && <Text style={classicStyles.school}>ID: {cert.credentialId}</Text>}
            </View>
            <View>
              <Text style={classicStyles.dateLocation}>{cert.date}</Text>
              {cert.expiryDate && <Text style={classicStyles.school}>Expires: {cert.expiryDate}</Text>}
            </View>
          </View>
        ))}
      </View>
    ),
    languages: languages.length > 0 && sectionVisibility.languages !== false && (
      <View style={classicStyles.section} wrap={false} key="languages">
        <Text style={classicStyles.sectionTitle}>Languages</Text>
        <Text style={classicStyles.skills}>
          {languages.map(lang => `${lang.language} (${lang.proficiency})`).join(' • ')}
        </Text>
      </View>
    ),
    volunteer: volunteer.length > 0 && sectionVisibility.volunteer !== false && (
      <View style={classicStyles.section} key="volunteer">
        <Text style={classicStyles.sectionTitle}>Volunteer Experience</Text>
        {volunteer.map((vol) => (
          <View key={vol.id} style={classicStyles.experienceItem} wrap={false}>
            <View style={classicStyles.experienceHeader}>
              <Text style={classicStyles.jobTitle}>{vol.role}</Text>
              <Text style={classicStyles.dateLocation}>
                {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
              </Text>
            </View>
            <View style={classicStyles.companyRow}>
              <Text style={classicStyles.company}>{vol.organization}</Text>
              <Text style={classicStyles.dateLocation}>{vol.location}</Text>
            </View>
            <View style={classicStyles.bulletList}>
              {vol.description.map((desc, i) => desc && (
                <View key={i} style={classicStyles.bulletItem}>
                  <View style={classicStyles.bullet} />
                  <Text style={classicStyles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    ),
    awards: awards.length > 0 && sectionVisibility.awards !== false && (
      <View style={classicStyles.section} key="awards">
        <Text style={classicStyles.sectionTitle}>Awards & Honors</Text>
        {awards.map((award) => (
          <View key={award.id} style={classicStyles.experienceItem} wrap={false}>
            <View style={classicStyles.experienceHeader}>
              <Text style={classicStyles.jobTitle}>{award.title}</Text>
              {award.date && <Text style={classicStyles.dateLocation}>{award.date}</Text>}
            </View>
            <Text style={classicStyles.company}>{award.issuer}</Text>
            {award.description && (
              <Text style={classicStyles.school}>{award.description}</Text>
            )}
          </View>
        ))}
      </View>
    )
  }

  // Get section order
  const sectionOrder = customization.sectionOrder || ['summary', 'experience', 'projects', 'education', 'certifications', 'skills', 'languages', 'volunteer', 'awards']

  return (
    <Document>
      <Page size="A4" style={classicStyles.page}>
        {/* Header */}
        <View style={classicStyles.header} wrap={false}>
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={classicStyles.photo} />
          )}
          <Text style={classicStyles.name}>{personalInfo.fullName}</Text>
          <View style={classicStyles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={classicStyles.separator}>•</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={classicStyles.separator}>•</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </View>
          {(personalInfo.linkedin || personalInfo.website) && (
            <View style={[classicStyles.contactRow, { marginTop: 4 }]}>
              {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
              {personalInfo.website && <Text style={classicStyles.separator}>•</Text>}
              {personalInfo.website && <Text>{personalInfo.website}</Text>}
            </View>
          )}
        </View>

        {/* Content - Render sections in custom order */}
        {sectionOrder.map(sectionKey => sections[sectionKey]).filter(Boolean)}
      </Page>
    </Document>
  )
}

// Minimal Template Styles
const createMinimalStyles = (customization = {}) => {
  const {
    accentColor = '#2563eb',
    fontFamily = 'Helvetica',
    fontSize = 11,
    fontWeight = 'normal',
    lineSpacing = 1.5,
    paragraphSpacing = 12,
    pageMargin = 40,
    showPageBorder = false,
    borderWidth = 2,
    borderColor = '#e5e7eb'
  } = customization

  return StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: fontFamily,
    padding: pageMargin,
    ...(showPageBorder && {
      border: `${borderWidth}px solid ${borderColor}`
    })
  },
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 36,
    fontWeight: 'light',
    color: '#111827',
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#6b7280',
    gap: 8,
  },
  separator: {
    marginHorizontal: 4,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    border: '2px solid #d1d5db',
    objectFit: 'cover',
  },
  section: {
    marginBottom: paragraphSpacing + 6,
  },
  sectionTitle: {
    fontSize: fontSize * 1.1,
    fontWeight: 'bold',
    color: accentColor,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottom: `1px solid ${accentColor}`,
    paddingBottom: 6,
    marginBottom: paragraphSpacing,
  },
  summaryText: {
    fontSize: fontSize,
    lineHeight: lineSpacing,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 14,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  companyLocation: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 9,
    color: '#6b7280',
  },
  bulletList: {
    paddingLeft: 16,
    borderLeft: '2px solid #d1d5db',
  },
  bulletItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 3,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
  },
  school: {
    fontSize: 10,
    color: '#374151',
  },
  skills: {
    fontSize: fontSize,
    color: '#374151',
    lineHeight: lineSpacing,
    fontFamily: fontWeight === 'bold' ? `${fontFamily}-Bold` : fontFamily,
  },
})
}

// Minimal Template Component
export function MinimalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const minimalStyles = createMinimalStyles(customization)

  const sections = {
    summary: summary && sectionVisibility.summary !== false && (
      <View style={minimalStyles.summaryText} wrap={false} key="summary">
        <Text>{summary}</Text>
      </View>
    ),
    experience: experience.length > 0 && sectionVisibility.experience !== false && (
      <View style={minimalStyles.section} key="experience">
        <Text style={minimalStyles.sectionTitle}>Experience</Text>
        {experience.map((exp) => (
          <View key={exp.id} style={minimalStyles.experienceItem} wrap={false}>
            <View style={minimalStyles.experienceHeader}>
              <Text style={minimalStyles.jobTitle}>{exp.title}</Text>
              <Text style={minimalStyles.dateText}>
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
            </View>
            <Text style={minimalStyles.companyLocation}>
              {safeJoin([exp.company, exp.location])}
            </Text>
            <View style={minimalStyles.bulletList}>
              {exp.description.map((desc, i) => desc && (
                <Text key={i} style={minimalStyles.bulletItem}>{desc}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    ),
    education: education.length > 0 && sectionVisibility.education !== false && (
      <View style={minimalStyles.section} key="education">
        <Text style={minimalStyles.sectionTitle}>Education</Text>
        {education.map((edu) => (
          <View key={edu.id} style={minimalStyles.educationItem} wrap={false}>
            <View>
              <Text style={minimalStyles.degree}>{edu.degree}</Text>
              <Text style={minimalStyles.school}>{safeJoin([edu.school, edu.location])}</Text>
              {edu.gpa && <Text style={minimalStyles.school}>GPA: {edu.gpa}</Text>}
            </View>
            <Text style={minimalStyles.dateText}>{edu.graduationDate}</Text>
          </View>
        ))}
      </View>
    ),
    skills: skills.length > 0 && sectionVisibility.skills !== false && (
      <View style={minimalStyles.section} wrap={false} key="skills">
        <Text style={minimalStyles.sectionTitle}>Skills</Text>
        <Text style={minimalStyles.skills}>{skills.join(', ')}</Text>
      </View>
    ),
    projects: projects.length > 0 && sectionVisibility.projects !== false && (
      <View style={minimalStyles.section} key="projects">
        <Text style={minimalStyles.sectionTitle}>Projects</Text>
        {projects.map((proj) => (
          <View key={proj.id} style={minimalStyles.experienceItem} wrap={false}>
            <View style={minimalStyles.experienceHeader}>
              <Text style={minimalStyles.jobTitle}>{proj.name}</Text>
              {proj.date && <Text style={minimalStyles.dateText}>{proj.date}</Text>}
            </View>
            {proj.description && (
              <Text style={minimalStyles.school}>{proj.description}</Text>
            )}
            {proj.technologies.length > 0 && (
              <Text style={minimalStyles.skills}>Tech: {proj.technologies.join(', ')}</Text>
            )}
            {proj.link && (
              <Text style={minimalStyles.school}>{proj.link}</Text>
            )}
          </View>
        ))}
      </View>
    ),
    certifications: certifications.length > 0 && sectionVisibility.certifications !== false && (
      <View style={minimalStyles.section} key="certifications">
        <Text style={minimalStyles.sectionTitle}>Certifications</Text>
        {certifications.map((cert) => (
          <View key={cert.id} style={minimalStyles.educationItem} wrap={false}>
            <View>
              <Text style={minimalStyles.degree}>{cert.name}</Text>
              <Text style={minimalStyles.school}>{cert.issuer}</Text>
              {cert.credentialId && <Text style={minimalStyles.school}>ID: {cert.credentialId}</Text>}
            </View>
            <View>
              <Text style={minimalStyles.dateText}>{cert.date}</Text>
              {cert.expiryDate && <Text style={minimalStyles.school}>Expires: {cert.expiryDate}</Text>}
            </View>
          </View>
        ))}
      </View>
    ),
    languages: languages.length > 0 && sectionVisibility.languages !== false && (
      <View style={minimalStyles.section} wrap={false} key="languages">
        <Text style={minimalStyles.sectionTitle}>Languages</Text>
        <Text style={minimalStyles.skills}>
          {languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')}
        </Text>
      </View>
    ),
    volunteer: volunteer.length > 0 && sectionVisibility.volunteer !== false && (
      <View style={minimalStyles.section} key="volunteer">
        <Text style={minimalStyles.sectionTitle}>Volunteer</Text>
        {volunteer.map((vol) => (
          <View key={vol.id} style={minimalStyles.experienceItem} wrap={false}>
            <View style={minimalStyles.experienceHeader}>
              <Text style={minimalStyles.jobTitle}>{vol.role}</Text>
              <Text style={minimalStyles.dateText}>
                {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
              </Text>
            </View>
            <Text style={minimalStyles.companyLocation}>
              {safeJoin([vol.organization, vol.location])}
            </Text>
            <View style={minimalStyles.bulletList}>
              {vol.description.map((desc, i) => desc && (
                <Text key={i} style={minimalStyles.bulletItem}>{desc}</Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    ),
    awards: awards.length > 0 && sectionVisibility.awards !== false && (
      <View style={minimalStyles.section} key="awards">
        <Text style={minimalStyles.sectionTitle}>Awards</Text>
        {awards.map((award) => (
          <View key={award.id} style={minimalStyles.experienceItem} wrap={false}>
            <View style={minimalStyles.experienceHeader}>
              <Text style={minimalStyles.jobTitle}>{award.title}</Text>
              {award.date && <Text style={minimalStyles.dateText}>{award.date}</Text>}
            </View>
            <Text style={minimalStyles.companyLocation}>{award.issuer}</Text>
            {award.description && (
              <Text style={minimalStyles.school}>{award.description}</Text>
            )}
          </View>
        ))}
      </View>
    )
  }

  const sectionOrder = customization.sectionOrder || ['summary', 'experience', 'projects', 'education', 'certifications', 'skills', 'languages', 'volunteer', 'awards']

  return (
    <Document>
      <Page size="A4" style={minimalStyles.page}>
        {/* Header */}
        <View style={minimalStyles.header} wrap={false}>
          <View style={minimalStyles.headerLeft}>
            <Text style={minimalStyles.name}>{personalInfo.fullName}</Text>
            <View style={minimalStyles.contactRow}>
              {personalInfo.email && <Text>{personalInfo.email}</Text>}
              {personalInfo.phone && <Text style={minimalStyles.separator}>|</Text>}
              {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
              {personalInfo.location && <Text style={minimalStyles.separator}>|</Text>}
              {personalInfo.location && <Text>{personalInfo.location}</Text>}
              {personalInfo.linkedin && <Text style={minimalStyles.separator}>|</Text>}
              {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
              {personalInfo.website && <Text style={minimalStyles.separator}>|</Text>}
              {personalInfo.website && <Text>{personalInfo.website}</Text>}
            </View>
          </View>

          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={minimalStyles.photo} />
          )}
        </View>

        {/* Content - Render sections in custom order */}
        {sectionOrder.map(sectionKey => sections[sectionKey]).filter(Boolean)}
      </Page>
    </Document>
  )
}

// Executive Template Styles - Two Column with Sidebar
const createExecutiveStyles = (customization = {}) => {
  const {
    accentColor = '#2563eb',
    fontFamily = 'Helvetica',
    fontSize = 11,
    fontWeight = 'normal',
    lineSpacing = 1.5,
    paragraphSpacing = 12,
    pageMargin = 40,
    showPageBorder = false,
    borderWidth = 2,
    borderColor = '#e5e7eb'
  } = customization

  return StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    flexDirection: 'row',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#f9fafb',
    padding: 30,
    borderRight: `4px solid ${accentColor}`,
  },
  mainContent: {
    width: '65%',
    padding: 30,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    objectFit: 'cover',
    alignSelf: 'center',
    marginBottom: 20,
    border: `4px solid ${accentColor}`,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: accentColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 3,
    textAlign: 'center',
  },
  sidebarSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: 8,
    borderBottom: `2px solid ${accentColor}`,
    paddingBottom: 4,
  },
  skillItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
    paddingLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: 12,
    marginTop: 10,
  },
  experienceItem: {
    marginBottom: 16,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
  },
  company: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 6,
  },
  bulletItem: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 3,
    flexDirection: 'row',
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: accentColor,
    marginRight: 8,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: lineSpacing,
    fontFamily: fontWeight === 'bold' ? `${fontFamily}-Bold` : fontFamily,
  },
})
}

// Executive Template Component
export function ExecutiveTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const styles = createExecutiveStyles(customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={styles.photo} />
          )}

          <Text style={styles.name}>{personalInfo.fullName}</Text>

          {personalInfo.email && <Text style={styles.contactInfo}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contactInfo}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contactInfo}>{personalInfo.location}</Text>}
          {personalInfo.linkedin && <Text style={styles.contactInfo}>{personalInfo.linkedin}</Text>}
          {personalInfo.website && <Text style={styles.contactInfo}>{personalInfo.website}</Text>}

          {/* Skills in Sidebar */}
          {skills.length > 0 && sectionVisibility.skills !== false && (
            <View style={styles.sidebarSection} wrap={false}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>• {skill}</Text>
              ))}
            </View>
          )}

          {/* Languages in Sidebar */}
          {languages.length > 0 && sectionVisibility.languages !== false && (
            <View style={styles.sidebarSection} wrap={false}>
              <Text style={styles.sidebarTitle}>Languages</Text>
              {languages.map((lang) => (
                <Text key={lang.id} style={styles.skillItem}>
                  {lang.language} - {lang.proficiency}
                </Text>
              ))}
            </View>
          )}

          {/* Certifications in Sidebar */}
          {certifications.length > 0 && sectionVisibility.certifications !== false && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Certifications</Text>
              {certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111827' }}>{cert.name}</Text>
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>{cert.issuer}</Text>
                  <Text style={{ fontSize: 8, color: '#9ca3af' }}>{cert.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary */}
          {summary && sectionVisibility.summary !== false && (
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={{ fontSize: 11, lineHeight: 1.6, color: '#374151', marginBottom: 16 }}>{summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience.length > 0 && sectionVisibility.experience !== false && (
            <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.company}>{safeJoin([exp.company, exp.location])}</Text>
                  <Text style={styles.dateText}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                  {exp.description.map((desc, i) => desc && (
                    <View key={i} style={styles.bulletItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && sectionVisibility.education !== false && (
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 12 }} wrap={false}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.company}>{safeJoin([edu.school, edu.location])}</Text>
                  <Text style={styles.dateText}>{edu.graduationDate}{edu.gpa && ` | GPA: ${edu.gpa}`}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && sectionVisibility.projects !== false && (
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.jobTitle}>{proj.name}</Text>
                  {proj.description && <Text style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>{proj.description}</Text>}
                  {proj.technologies.length > 0 && (
                    <Text style={{ fontSize: 9, color: '#6b7280' }}>Tech: {proj.technologies.join(', ')}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

// Creative Template Styles - Bold & Colorful
const createCreativeStyles = (customization = {}) => {
  const { accentColor = '#2563eb', fontSize = 11, fontWeight = 'normal', lineSpacing = 1.5, paragraphSpacing = 12, pageMargin = 40, showPageBorder = false, borderWidth = 2, borderColor = '#e5e7eb' } = customization

  return StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica-Bold',
  },
  header: {
    backgroundColor: accentColor,
    padding: 50,
    alignItems: 'center',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginTop: 15,
    fontSize: 10,
    color: '#ffffff',
  },
  content: {
    padding: 40,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: accentColor,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 12,
    lineHeight: 1.7,
    color: '#374151',
    fontFamily: 'Helvetica',
  },
  experienceItem: {
    marginBottom: 20,
    paddingLeft: 20,
    borderLeft: `4px solid ${accentColor}`,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  company: {
    fontSize: 13,
    color: accentColor,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 6,
  },
  bulletItem: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillBox: {
    backgroundColor: accentColor,
    color: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: fontSize,
    fontWeight: 'bold',
  },
})
}

// Creative Template Component
export function CreativeTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const styles = createCreativeStyles(customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Bold Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {summary && <Text style={styles.tagline}>{summary.substring(0, 100)}...</Text>}
          <View style={styles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </View>
        </View>

        <View style={styles.content}>
          {/* Experience */}
          {experience.length > 0 && sectionVisibility.experience !== false && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.dateText}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                  {exp.description.map((desc, i) => desc && (
                    <Text key={i} style={styles.bulletItem}>• {desc}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && sectionVisibility.skills !== false && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsGrid}>
                {skills.map((skill, i) => (
                  <Text key={i} style={styles.skillBox}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {education.length > 0 && sectionVisibility.education !== false && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 12 }} wrap={false}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.company}>{edu.school}</Text>
                  <Text style={styles.dateText}>{edu.graduationDate}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && sectionVisibility.projects !== false && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.jobTitle}>{proj.name}</Text>
                  {proj.description && <Text style={styles.bulletItem}>{proj.description}</Text>}
                  {proj.technologies.length > 0 && (
                    <Text style={{ fontSize: 10, color: '#6b7280' }}>Tech: {proj.technologies.join(', ')}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

// Technical Template Styles - Developer Focused
const createTechnicalStyles = (customization = {}) => {
  const { accentColor = '#2563eb', fontSize = 11, fontWeight = 'normal', lineSpacing = 1.5, paragraphSpacing = 12, pageMargin = 40, showPageBorder = false, borderWidth = 2, borderColor = '#e5e7eb' } = customization

  return StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Courier',
    padding: 40,
  },
  header: {
    borderBottom: `3px solid ${accentColor}`,
    paddingBottom: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Courier-Bold',
  },
  contact: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: accentColor,
    marginTop: 16,
    marginBottom: 10,
    fontFamily: 'Courier-Bold',
    textTransform: 'uppercase',
  },
  codeBlock: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
    borderLeft: `3px solid ${accentColor}`,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Courier-Bold',
  },
  experienceCompany: {
    fontSize: 10,
    color: accentColor,
    marginBottom: 4,
  },
  experienceDate: {
    fontSize: 9,
    color: '#9ca3af',
    marginBottom: 6,
  },
  bulletItem: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 3,
    paddingLeft: 15,
  },
  skillsList: {
    fontSize: fontSize,
    color: '#374151',
    lineHeight: lineSpacing,
  },
})
}

// Technical Template Component
export function TechnicalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const styles = createTechnicalStyles(customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
          <Text style={styles.contact}>
            {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' | ')}
          </Text>
          {personalInfo.linkedin && <Text style={styles.contact}>{personalInfo.linkedin}</Text>}
          {personalInfo.website && <Text style={styles.contact}>{personalInfo.website}</Text>}
        </View>

        {/* Summary */}
        {summary && sectionVisibility.summary !== false && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>// Summary</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#374151' }}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && sectionVisibility.experience !== false && (
          <View>
            <Text style={styles.sectionTitle}>// Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.codeBlock} wrap={false}>
                <Text style={styles.experienceTitle}>{exp.title || ''}</Text>
                <Text style={styles.experienceCompany}>
                  {[exp.company, exp.location].filter(Boolean).join(' | ')}
                </Text>
                <Text style={styles.experienceDate}>
                  {exp.startDate || ''} - {exp.current ? 'Present' : (exp.endDate || '')}
                </Text>
                {exp.description.map((desc, i) => desc && (
                  <Text key={i} style={styles.bulletItem}>- {desc}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && sectionVisibility.skills !== false && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>// Skills</Text>
            <Text style={styles.skillsList}>{skills.join(' | ')}</Text>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && sectionVisibility.projects !== false && (
          <View>
            <Text style={styles.sectionTitle}>// Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.codeBlock} wrap={false}>
                <Text style={styles.experienceTitle}>{proj.name}</Text>
                {proj.description && <Text style={{ fontSize: 9, color: '#374151', marginBottom: 4 }}>{proj.description}</Text>}
                {proj.technologies.length > 0 && (
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>Tech Stack: {proj.technologies.join(', ')}</Text>
                )}
                {proj.link && <Text style={{ fontSize: 9, color: '#2563eb' }}>{proj.link}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && sectionVisibility.education !== false && (
          <View>
            <Text style={styles.sectionTitle}>// Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 10 }} wrap={false}>
                <Text style={styles.experienceTitle}>{edu.degree}</Text>
                <Text style={styles.experienceCompany}>{edu.school}</Text>
                <Text style={styles.experienceDate}>{edu.graduationDate}{edu.gpa && ` | GPA: ${edu.gpa}`}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}

// Academic CV Template Styles - Publication Focused
const createAcademicStyles = (customization = {}) => {
  const { accentColor = '#2563eb', fontFamily = 'Times-Roman', fontSize = 11, fontWeight = 'normal', lineSpacing = 1.5, paragraphSpacing = 12, pageMargin = 40 } = customization

  return StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: 'Times-Roman',
      padding: pageMargin,
    },
    header: {
      textAlign: 'center',
      marginBottom: 24,
      borderBottom: `2px solid ${accentColor}`,
      paddingBottom: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 8,
      fontFamily: 'Times-Bold',
    },
    contact: {
      fontSize: 10,
      color: '#374151',
      marginBottom: 3,
    },
    sectionTitle: {
      fontSize: fontSize * 1.4,
      fontWeight: 'bold',
      color: accentColor,
      marginTop: 16,
      marginBottom: 10,
      borderBottom: `1px solid ${accentColor}`,
      paddingBottom: 4,
      fontFamily: 'Times-Bold',
      textTransform: 'uppercase',
    },
    subsectionTitle: {
      fontSize: fontSize * 1.1,
      fontWeight: 'bold',
      color: '#111827',
      marginTop: 8,
      marginBottom: 6,
      fontFamily: 'Times-Bold',
    },
    publicationItem: {
      fontSize: 10,
      color: '#374151',
      marginBottom: 8,
      paddingLeft: 20,
      textIndent: -20,
      lineHeight: lineSpacing,
    },
    experienceItem: {
      marginBottom: 12,
    },
    positionTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#111827',
      fontFamily: 'Times-Bold',
    },
    institution: {
      fontSize: 10,
      color: '#374151',
      fontStyle: 'italic',
      fontFamily: 'Times-Italic',
    },
    dateText: {
      fontSize: 10,
      color: '#6b7280',
      marginBottom: 4,
    },
    bulletItem: {
      fontSize: 10,
      color: '#374151',
      marginBottom: 3,
      paddingLeft: 15,
    },
  })
}

// Academic CV Template Component
export function AcademicTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const styles = createAcademicStyles(customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {personalInfo.email && <Text style={styles.contact}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.contact}>{personalInfo.phone}</Text>}
          {personalInfo.location && <Text style={styles.contact}>{personalInfo.location}</Text>}
          {personalInfo.website && <Text style={styles.contact}>{personalInfo.website}</Text>}
          {personalInfo.linkedin && <Text style={styles.contact}>{personalInfo.linkedin}</Text>}
        </View>

        {/* Research Interests / Summary */}
        {summary && sectionVisibility.summary !== false && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Research Interests</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#374151' }}>{summary}</Text>
          </View>
        )}

        {/* Education - Priority section for academics */}
        {education.length > 0 && sectionVisibility.education !== false && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.experienceItem} wrap={false}>
                <Text style={styles.positionTitle}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.school}, {edu.location}</Text>
                <Text style={styles.dateText}>{edu.graduationDate}</Text>
                {edu.gpa && <Text style={{ fontSize: 10, color: '#374151' }}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Academic Experience */}
        {experience.length > 0 && sectionVisibility.experience !== false && (
          <View>
            <Text style={styles.sectionTitle}>Academic Appointments</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem} wrap={false}>
                <Text style={styles.positionTitle}>{exp.title}</Text>
                <Text style={styles.institution}>{exp.company}, {exp.location}</Text>
                <Text style={styles.dateText}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
                {exp.description.map((desc, i) => desc && (
                  <Text key={i} style={styles.bulletItem}>• {desc}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects as Research Projects */}
        {projects.length > 0 && sectionVisibility.projects !== false && (
          <View>
            <Text style={styles.sectionTitle}>Research Projects</Text>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.experienceItem} wrap={false}>
                <Text style={styles.positionTitle}>{proj.name}</Text>
                {proj.date && <Text style={styles.dateText}>{proj.date}</Text>}
                {proj.description && (
                  <Text style={{ fontSize: 10, color: '#374151', marginBottom: 4 }}>{proj.description}</Text>
                )}
                {proj.technologies.length > 0 && (
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>Methods: {proj.technologies.join(', ')}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Awards & Honors */}
        {awards.length > 0 && sectionVisibility.awards !== false && (
          <View>
            <Text style={styles.sectionTitle}>Awards & Honors</Text>
            {awards.map((award) => (
              <View key={award.id} style={{ marginBottom: 8 }} wrap={false}>
                <Text style={styles.positionTitle}>{award.title}</Text>
                <Text style={styles.institution}>{award.issuer}</Text>
                {award.date && <Text style={styles.dateText}>{award.date}</Text>}
                {award.description && (
                  <Text style={{ fontSize: 10, color: '#374151' }}>{award.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications as Professional Memberships */}
        {certifications.length > 0 && sectionVisibility.certifications !== false && (
          <View>
            <Text style={styles.sectionTitle}>Professional Memberships</Text>
            {certifications.map((cert) => (
              <View key={cert.id} style={{ marginBottom: 6 }} wrap={false}>
                <Text style={styles.positionTitle}>{cert.name}</Text>
                <Text style={styles.institution}>{cert.issuer}</Text>
                <Text style={styles.dateText}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills as Research Skills */}
        {skills.length > 0 && sectionVisibility.skills !== false && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Research Skills & Methodologies</Text>
            <Text style={{ fontSize: 10, color: '#374151', lineHeight: 1.5 }}>
              {skills.join(' • ')}
            </Text>
          </View>
        )}

        {/* Languages */}
        {languages.length > 0 && sectionVisibility.languages !== false && (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={{ fontSize: 10, color: '#374151', lineHeight: 1.5 }}>
              {languages.map(lang => `${lang.language} (${lang.proficiency})`).join(' • ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  )
}

// International/Europass CV Template Styles
const createInternationalStyles = (customization = {}) => {
  const { accentColor = '#2563eb', fontFamily = 'Helvetica', fontSize = 11, fontWeight = 'normal', lineSpacing = 1.5, paragraphSpacing = 12, pageMargin = 40 } = customization

  return StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica',
      flexDirection: 'row',
    },
    leftColumn: {
      width: '30%',
      backgroundColor: '#f9fafb',
      padding: 20,
    },
    rightColumn: {
      width: '70%',
      padding: 30,
    },
    photo: {
      width: 100,
      height: 120,
      objectFit: 'cover',
      marginBottom: 15,
      border: '2px solid #d1d5db',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: accentColor,
      marginBottom: 12,
    },
    sidebarSection: {
      marginTop: 16,
      marginBottom: 16,
    },
    sidebarTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: accentColor,
      marginBottom: 6,
      textTransform: 'uppercase',
    },
    sidebarText: {
      fontSize: 9,
      color: '#374151',
      marginBottom: 3,
      lineHeight: 1.4,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: accentColor,
      marginTop: 12,
      marginBottom: 8,
      backgroundColor: '#f3f4f6',
      padding: 6,
      textTransform: 'uppercase',
    },
    entryTitle: {
      fontSize: 11,
      fontWeight: 'bold',
      color: '#111827',
    },
    entrySubtitle: {
      fontSize: 10,
      color: '#374151',
      marginBottom: 3,
    },
    entryDate: {
      fontSize: 9,
      color: '#6b7280',
      marginBottom: 6,
    },
    bulletItem: {
      fontSize: 9,
      color: '#374151',
      marginBottom: 3,
      paddingLeft: 12,
      lineHeight: 1.4,
    },
    experienceItem: {
      marginBottom: 14,
    },
  })
}

// International/Europass CV Template Component
export function InternationalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const styles = createInternationalStyles(customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.leftColumn}>
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={styles.photo} />
          )}

          <Text style={styles.name}>{personalInfo.fullName}</Text>

          {/* Personal Information */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {personalInfo.email && <Text style={styles.sidebarText}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.sidebarText}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.sidebarText}>{personalInfo.location}</Text>}
            {personalInfo.linkedin && <Text style={styles.sidebarText}>{personalInfo.linkedin}</Text>}
            {personalInfo.website && <Text style={styles.sidebarText}>{personalInfo.website}</Text>}
          </View>

          {/* Languages */}
          {languages.length > 0 && sectionVisibility.languages !== false && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Languages</Text>
              {languages.map((lang) => (
                <View key={lang.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#111827' }}>
                    {lang.language}
                  </Text>
                  <Text style={styles.sidebarText}>{lang.proficiency}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && sectionVisibility.skills !== false && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skills.map((skill, i) => (
                <Text key={i} style={styles.sidebarText}>• {skill}</Text>
              ))}
            </View>
          )}

          {/* Certifications */}
          {certifications.length > 0 && sectionVisibility.certifications !== false && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Certifications</Text>
              {certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#111827' }}>
                    {cert.name}
                  </Text>
                  <Text style={{ fontSize: 8, color: '#6b7280' }}>{cert.issuer}</Text>
                  <Text style={{ fontSize: 8, color: '#9ca3af' }}>{cert.date}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column - Main Content */}
        <View style={styles.rightColumn}>
          {/* Profile / Summary */}
          {summary && sectionVisibility.summary !== false && (
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#374151', marginBottom: 12 }}>
                {summary}
              </Text>
            </View>
          )}

          {/* Work Experience */}
          {experience.length > 0 && sectionVisibility.experience !== false && (
            <View>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.entryTitle}>{exp.title}</Text>
                  <Text style={styles.entrySubtitle}>{exp.company}, {exp.location}</Text>
                  <Text style={styles.entryDate}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </Text>
                  {exp.description.map((desc, i) => desc && (
                    <Text key={i} style={styles.bulletItem}>• {desc}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education.length > 0 && sectionVisibility.education !== false && (
            <View>
              <Text style={styles.sectionTitle}>Education and Training</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                  <Text style={styles.entrySubtitle}>{edu.school}, {edu.location}</Text>
                  <Text style={styles.entryDate}>{edu.graduationDate}</Text>
                  {edu.gpa && <Text style={{ fontSize: 9, color: '#374151' }}>Grade: {edu.gpa}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && sectionVisibility.projects !== false && (
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.entryTitle}>{proj.name}</Text>
                  {proj.date && <Text style={styles.entryDate}>{proj.date}</Text>}
                  {proj.description && (
                    <Text style={{ fontSize: 9, color: '#374151', marginBottom: 4 }}>
                      {proj.description}
                    </Text>
                  )}
                  {proj.technologies.length > 0 && (
                    <Text style={{ fontSize: 9, color: '#6b7280' }}>
                      Technologies: {proj.technologies.join(', ')}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Volunteer Experience */}
          {volunteer.length > 0 && sectionVisibility.volunteer !== false && (
            <View>
              <Text style={styles.sectionTitle}>Volunteer Experience</Text>
              {volunteer.map((vol) => (
                <View key={vol.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.entryTitle}>{vol.role}</Text>
                  <Text style={styles.entrySubtitle}>{vol.organization}, {vol.location}</Text>
                  <Text style={styles.entryDate}>
                    {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                  </Text>
                  {vol.description.map((desc, i) => desc && (
                    <Text key={i} style={styles.bulletItem}>• {desc}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Awards */}
          {awards.length > 0 && sectionVisibility.awards !== false && (
            <View>
              <Text style={styles.sectionTitle}>Awards and Achievements</Text>
              {awards.map((award) => (
                <View key={award.id} style={{ marginBottom: 10 }} wrap={false}>
                  <Text style={styles.entryTitle}>{award.title}</Text>
                  <Text style={styles.entrySubtitle}>{award.issuer}</Text>
                  {award.date && <Text style={styles.entryDate}>{award.date}</Text>}
                  {award.description && (
                    <Text style={{ fontSize: 9, color: '#374151' }}>{award.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

// Portfolio Template Styles - Visual Project Showcase
const createPortfolioStyles = (customization = {}) => {
  const { accentColor = '#2563eb', fontFamily = 'Helvetica', fontSize = 11 } = customization

  return StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: 'Helvetica',
      padding: 0,
    },
    heroSection: {
      backgroundColor: accentColor,
      padding: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    photo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      border: '4px solid #ffffff',
      marginBottom: 16,
      objectFit: 'cover',
    },
    name: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 8,
      textAlign: 'center',
    },
    tagline: {
      fontSize: 14,
      color: '#ffffff',
      opacity: 0.95,
      textAlign: 'center',
      marginBottom: 12,
    },
    contactRow: {
      flexDirection: 'row',
      gap: 15,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 8,
    },
    contactItem: {
      fontSize: 10,
      color: '#ffffff',
    },
    content: {
      padding: 40,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: accentColor,
      marginTop: 20,
      marginBottom: 15,
      textAlign: 'center',
    },
    projectCard: {
      marginBottom: 20,
      padding: 15,
      backgroundColor: '#f9fafb',
      borderRadius: 8,
      borderLeft: `4px solid ${accentColor}`,
    },
    projectTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 6,
    },
    projectDescription: {
      fontSize: 10,
      color: '#374151',
      lineHeight: 1.6,
      marginBottom: 8,
    },
    techStack: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 6,
    },
    techTag: {
      backgroundColor: `${accentColor}20`,
      color: accentColor,
      fontSize: 8,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
      fontWeight: 'bold',
    },
    experienceGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15,
      marginBottom: 20,
    },
    experienceCard: {
      width: '48%',
      padding: 12,
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: 6,
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center',
      marginTop: 10,
    },
    skillBadge: {
      backgroundColor: accentColor,
      color: '#ffffff',
      fontSize: fontSize,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderRadius: 15,
      fontWeight: 'bold',
    },
  })
}

// Portfolio Template Component
export function PortfolioTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects = [], certifications = [], languages = [], volunteer = [], awards = [], sectionVisibility = {}, customization = {} } = resumeData
  const styles = createPortfolioStyles(customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={styles.photo} />
          )}
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {summary && (
            <Text style={styles.tagline}>
              {summary.length > 150 ? summary.substring(0, 150) + '...' : summary}
            </Text>
          )}
          <View style={styles.contactRow}>
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
          </View>
          <View style={styles.contactRow}>
            {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
            {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Featured Projects */}
          {projects.length > 0 && sectionVisibility.projects !== false && (
            <View>
              <Text style={styles.sectionTitle}>Featured Projects</Text>
              {projects.map((proj) => (
                <View key={proj.id} style={styles.projectCard} wrap={false}>
                  <Text style={styles.projectTitle}>{proj.name}</Text>
                  {proj.description && (
                    <Text style={styles.projectDescription}>{proj.description}</Text>
                  )}
                  {proj.link && (
                    <Text style={{ fontSize: 9, color: '#2563eb', marginBottom: 6 }}>
                      {proj.link}
                    </Text>
                  )}
                  {proj.technologies.length > 0 && (
                    <View style={styles.techStack}>
                      {proj.technologies.map((tech, i) => (
                        <Text key={i} style={styles.techTag}>{tech}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Experience */}
          {experience.length > 0 && sectionVisibility.experience !== false && (
            <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              <View style={styles.experienceGrid}>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceCard} wrap={false}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#111827', marginBottom: 3 }}>
                      {exp.title}
                    </Text>
                    <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 2 }}>
                      {exp.company}
                    </Text>
                    <Text style={{ fontSize: 9, color: '#9ca3af' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && sectionVisibility.skills !== false && (
            <View wrap={false}>
              <Text style={styles.sectionTitle}>Skills & Expertise</Text>
              <View style={styles.skillsGrid}>
                {skills.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>{skill}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Education */}
          {education.length > 0 && sectionVisibility.education !== false && (
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 12, textAlign: 'center' }} wrap={false}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#111827' }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#374151' }}>
                    {edu.school} • {edu.graduationDate}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Awards */}
          {awards.length > 0 && sectionVisibility.awards !== false && (
            <View>
              <Text style={styles.sectionTitle}>Recognition</Text>
              {awards.map((award) => (
                <View key={award.id} style={{ marginBottom: 10, textAlign: 'center' }} wrap={false}>
                  <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#111827' }}>
                    {award.title}
                  </Text>
                  <Text style={{ fontSize: 9, color: '#6b7280' }}>
                    {award.issuer} • {award.date}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
