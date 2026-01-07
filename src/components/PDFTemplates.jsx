import { Document, Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer'

// Modern Template Styles
const modernStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 32,
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
    padding: 40,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    borderBottom: '2px solid #2563eb',
    paddingBottom: 6,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  dateText: {
    fontSize: 10,
    color: '#6b7280',
  },
  company: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 6,
  },
  bulletList: {
    marginLeft: 16,
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
    backgroundColor: '#374151',
    marginRight: 8,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 12,
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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  school: {
    fontSize: 11,
    color: '#374151',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillTag: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
})

// Modern Template Component
export function ModernTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, sectionVisibility = {} } = resumeData

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

        {/* Content */}
        <View style={modernStyles.content}>
          {/* Summary */}
          {summary && sectionVisibility.summary !== false && (
            <View style={modernStyles.section} wrap={false}>
              <Text style={modernStyles.sectionTitle}>Professional Summary</Text>
              <Text style={modernStyles.summaryText}>{summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience.length > 0 && sectionVisibility.experience !== false && (
            <View style={modernStyles.section}>
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
                    {exp.company} | {exp.location}
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
          )}

          {/* Education */}
          {education.length > 0 && sectionVisibility.education !== false && (
            <View style={modernStyles.section}>
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
          )}

          {/* Skills */}
          {skills.length > 0 && sectionVisibility.skills !== false && (
            <View style={modernStyles.section} wrap={false}>
              <Text style={modernStyles.sectionTitle}>Skills</Text>
              <View style={modernStyles.skillsContainer}>
                {skills.map((skill, i) => (
                  <Text key={i} style={modernStyles.skillTag}>{skill}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}

// Classic Template Styles
const classicStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Times-Roman',
    padding: 40,
  },
  header: {
    borderBottom: '4px solid #1f2937',
    paddingBottom: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    border: '4px solid #1f2937',
    marginBottom: 12,
    objectFit: 'cover',
  },
  name: {
    fontSize: 36,
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    fontFamily: 'Times-Bold',
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
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
    fontSize: 13,
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
    fontSize: 11,
    color: '#374151',
    fontStyle: 'italic',
    fontFamily: 'Times-Italic',
  },
  dateLocation: {
    fontSize: 10,
    color: '#6b7280',
  },
  bulletList: {
    marginLeft: 20,
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
    backgroundColor: '#374151',
    marginRight: 8,
    marginTop: 5,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    fontFamily: 'Times-Bold',
  },
  school: {
    fontSize: 11,
    color: '#374151',
    fontFamily: 'Times-Italic',
  },
  skills: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
  },
})

// Classic Template Component
export function ClassicTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, sectionVisibility = {} } = resumeData

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

        {/* Summary */}
        {summary && sectionVisibility.summary !== false && (
          <View style={classicStyles.section} wrap={false}>
            <Text style={classicStyles.sectionTitle}>Professional Summary</Text>
            <Text style={classicStyles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && sectionVisibility.experience !== false && (
          <View style={classicStyles.section}>
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
        )}

        {/* Education */}
        {education.length > 0 && sectionVisibility.education !== false && (
          <View style={classicStyles.section}>
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
        )}

        {/* Skills */}
        {skills.length > 0 && sectionVisibility.skills !== false && (
          <View style={classicStyles.section} wrap={false}>
            <Text style={classicStyles.sectionTitle}>Skills</Text>
            <Text style={classicStyles.skills}>{skills.join(' • ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}

// Minimal Template Styles
const minimalStyles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
    padding: 40,
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
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    borderBottom: '1px solid #d1d5db',
    paddingBottom: 6,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.6,
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
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.6,
  },
})

// Minimal Template Component
export function MinimalTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, sectionVisibility = {} } = resumeData

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

        {/* Summary */}
        {summary && sectionVisibility.summary !== false && (
          <View style={minimalStyles.summaryText} wrap={false}>
            <Text>{summary}</Text>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && sectionVisibility.experience !== false && (
          <View style={minimalStyles.section}>
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
                  {exp.company} | {exp.location}
                </Text>
                <View style={minimalStyles.bulletList}>
                  {exp.description.map((desc, i) => desc && (
                    <Text key={i} style={minimalStyles.bulletItem}>{desc}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && sectionVisibility.education !== false && (
          <View style={minimalStyles.section}>
            <Text style={minimalStyles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={minimalStyles.educationItem} wrap={false}>
                <View>
                  <Text style={minimalStyles.degree}>{edu.degree}</Text>
                  <Text style={minimalStyles.school}>{edu.school} | {edu.location}</Text>
                  {edu.gpa && <Text style={minimalStyles.school}>GPA: {edu.gpa}</Text>}
                </View>
                <Text style={minimalStyles.dateText}>{edu.graduationDate}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && sectionVisibility.skills !== false && (
          <View style={minimalStyles.section} wrap={false}>
            <Text style={minimalStyles.sectionTitle}>Skills</Text>
            <Text style={minimalStyles.skills}>{skills.join(', ')}</Text>
          </View>
        )}
      </Page>
    </Document>
  )
}
