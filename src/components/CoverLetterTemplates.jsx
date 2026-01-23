import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

// Helper function to replace placeholders
const replacePlaceholders = (text, jobInfo) => {
  if (!text) return text
  return text
    .replace(/\[Position\]/g, jobInfo.position || '[Position]')
    .replace(/\[Company\]/g, jobInfo.company || '[Company]')
}

// Modern Cover Letter Template
const createModernCoverLetterStyles = (customization = {}) => {
  const {
    accentColor = '#2563eb',
    fontFamily = 'Helvetica',
    fontSize = 11,
    lineSpacing = 1.5,
    paragraphSpacing = 12,
    pageMargin = 50
  } = customization

  return StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: fontFamily,
      padding: pageMargin,
    },
    header: {
      backgroundColor: accentColor,
      color: '#ffffff',
      padding: 30,
      marginBottom: 30,
    },
    name: {
      fontSize: fontSize * 2,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      fontSize: fontSize * 0.9,
    },
    date: {
      fontSize: fontSize * 0.9,
      color: '#6b7280',
      marginBottom: paragraphSpacing,
    },
    addressBlock: {
      marginBottom: paragraphSpacing + 8,
      fontSize: fontSize,
      lineHeight: lineSpacing,
      color: '#374151',
    },
    salutation: {
      fontSize: fontSize,
      fontWeight: 'bold',
      marginBottom: paragraphSpacing,
      color: '#111827',
    },
    paragraph: {
      fontSize: fontSize,
      lineHeight: lineSpacing,
      marginBottom: paragraphSpacing + 4,
      color: '#374151',
      textAlign: 'justify',
    },
    signature: {
      fontSize: fontSize,
      marginTop: paragraphSpacing + 8,
      color: '#374151',
    },
    signatureName: {
      fontSize: fontSize,
      fontWeight: 'bold',
      marginTop: 4,
      color: '#111827',
    }
  })
}

export function ModernCoverLetterTemplate({ coverLetterData }) {
  const { personalInfo, jobInfo, date, salutation, opening, body, closing, signature } = coverLetterData
  const styles = createModernCoverLetterStyles(coverLetterData.customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text>• {personalInfo.phone}</Text>}
            {personalInfo.location && <Text>• {personalInfo.location}</Text>}
          </View>
          {(personalInfo.linkedin || personalInfo.website) && (
            <View style={[styles.contactRow, { marginTop: 6 }]}>
              {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
              {personalInfo.website && <Text>• {personalInfo.website}</Text>}
            </View>
          )}
        </View>

        {/* Date */}
        <Text style={styles.date}>{date}</Text>

        {/* Recipient Address */}
        <View style={styles.addressBlock}>
          {jobInfo.hiringManager && <Text>{jobInfo.hiringManager}</Text>}
          {jobInfo.department && <Text>{jobInfo.department}</Text>}
          {jobInfo.company && <Text>{jobInfo.company}</Text>}
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>{salutation},</Text>

        {/* Opening */}
        <Text style={styles.paragraph}>{replacePlaceholders(opening, jobInfo)}</Text>

        {/* Body Paragraphs */}
        {body.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {replacePlaceholders(paragraph, jobInfo)}
          </Text>
        ))}

        {/* Closing */}
        <Text style={styles.paragraph}>{replacePlaceholders(closing, jobInfo)}</Text>

        {/* Signature */}
        <Text style={styles.signature}>{signature},</Text>
        <Text style={styles.signatureName}>{personalInfo.fullName}</Text>
      </Page>
    </Document>
  )
}

// Classic Cover Letter Template
const createClassicCoverLetterStyles = (customization = {}) => {
  const {
    accentColor = '#2563eb',
    fontFamily = 'Times-Roman',
    fontSize = 11,
    lineSpacing = 1.5,
    paragraphSpacing = 12,
    pageMargin = 50
  } = customization

  return StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: fontFamily === 'Helvetica' ? 'Times-Roman' : fontFamily,
      padding: pageMargin,
    },
    header: {
      borderBottom: `3px solid ${accentColor}`,
      paddingBottom: 16,
      marginBottom: 24,
      alignItems: 'center',
    },
    name: {
      fontSize: fontSize * 2,
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: 8,
      fontFamily: 'Times-Bold',
    },
    contactRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 8,
      fontSize: fontSize * 0.9,
      color: '#374151',
    },
    separator: {
      marginHorizontal: 4,
    },
    date: {
      fontSize: fontSize * 0.9,
      color: '#6b7280',
      marginBottom: paragraphSpacing,
      textAlign: 'right',
    },
    addressBlock: {
      marginBottom: paragraphSpacing + 8,
      fontSize: fontSize,
      lineHeight: lineSpacing,
      color: '#374151',
    },
    salutation: {
      fontSize: fontSize,
      fontWeight: 'bold',
      marginBottom: paragraphSpacing,
      color: '#111827',
      fontFamily: 'Times-Bold',
    },
    paragraph: {
      fontSize: fontSize,
      lineHeight: lineSpacing,
      marginBottom: paragraphSpacing + 4,
      color: '#374151',
      textAlign: 'justify',
    },
    signature: {
      fontSize: fontSize,
      marginTop: paragraphSpacing + 8,
      color: '#374151',
      fontFamily: 'Times-Italic',
    },
    signatureName: {
      fontSize: fontSize,
      fontWeight: 'bold',
      marginTop: 4,
      color: '#111827',
      fontFamily: 'Times-Bold',
    }
  })
}

export function ClassicCoverLetterTemplate({ coverLetterData }) {
  const { personalInfo, jobInfo, date, salutation, opening, body, closing, signature } = coverLetterData
  const styles = createClassicCoverLetterStyles(coverLetterData.customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.separator}>•</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.separator}>•</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
          </View>
          {(personalInfo.linkedin || personalInfo.website) && (
            <View style={[styles.contactRow, { marginTop: 4 }]}>
              {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
              {personalInfo.website && <Text style={styles.separator}>•</Text>}
              {personalInfo.website && <Text>{personalInfo.website}</Text>}
            </View>
          )}
        </View>

        {/* Date */}
        <Text style={styles.date}>{date}</Text>

        {/* Recipient Address */}
        <View style={styles.addressBlock}>
          {jobInfo.hiringManager && <Text>{jobInfo.hiringManager}</Text>}
          {jobInfo.department && <Text>{jobInfo.department}</Text>}
          {jobInfo.company && <Text>{jobInfo.company}</Text>}
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>{salutation},</Text>

        {/* Opening */}
        <Text style={styles.paragraph}>{replacePlaceholders(opening, jobInfo)}</Text>

        {/* Body */}
        {body.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {replacePlaceholders(paragraph, jobInfo)}
          </Text>
        ))}

        {/* Closing */}
        <Text style={styles.paragraph}>{replacePlaceholders(closing, jobInfo)}</Text>

        {/* Signature */}
        <Text style={styles.signature}>{signature},</Text>
        <Text style={styles.signatureName}>{personalInfo.fullName}</Text>
      </Page>
    </Document>
  )
}

// Minimal Cover Letter Template
const createMinimalCoverLetterStyles = (customization = {}) => {
  const {
    accentColor = '#2563eb',
    fontFamily = 'Helvetica',
    fontSize = 11,
    lineSpacing = 1.5,
    paragraphSpacing = 12,
    pageMargin = 50
  } = customization

  return StyleSheet.create({
    page: {
      backgroundColor: '#ffffff',
      fontFamily: fontFamily,
      padding: pageMargin,
    },
    header: {
      marginBottom: 24,
    },
    name: {
      fontSize: fontSize * 1.8,
      fontWeight: 'light',
      color: '#111827',
      marginBottom: 6,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      fontSize: fontSize * 0.85,
      color: '#6b7280',
    },
    separator: {
      marginHorizontal: 4,
    },
    date: {
      fontSize: fontSize * 0.85,
      color: '#9ca3af',
      marginBottom: paragraphSpacing,
    },
    addressBlock: {
      marginBottom: paragraphSpacing + 6,
      fontSize: fontSize * 0.9,
      lineHeight: lineSpacing,
      color: '#6b7280',
    },
    salutation: {
      fontSize: fontSize,
      marginBottom: paragraphSpacing,
      color: '#111827',
    },
    paragraph: {
      fontSize: fontSize,
      lineHeight: lineSpacing,
      marginBottom: paragraphSpacing + 2,
      color: '#374151',
      textAlign: 'justify',
    },
    signature: {
      fontSize: fontSize,
      marginTop: paragraphSpacing + 6,
      color: '#6b7280',
    },
    signatureName: {
      fontSize: fontSize,
      marginTop: 4,
      color: '#111827',
    }
  })
}

export function MinimalCoverLetterTemplate({ coverLetterData }) {
  const { personalInfo, jobInfo, date, salutation, opening, body, closing, signature } = coverLetterData
  const styles = createMinimalCoverLetterStyles(coverLetterData.customization)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.separator}>|</Text>}
            {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.separator}>|</Text>}
            {personalInfo.location && <Text>{personalInfo.location}</Text>}
            {personalInfo.linkedin && <Text style={styles.separator}>|</Text>}
            {personalInfo.linkedin && <Text>{personalInfo.linkedin}</Text>}
          </View>
        </View>

        {/* Date */}
        <Text style={styles.date}>{date}</Text>

        {/* Recipient */}
        <View style={styles.addressBlock}>
          {jobInfo.hiringManager && <Text>{jobInfo.hiringManager}</Text>}
          {jobInfo.department && <Text>{jobInfo.department}</Text>}
          {jobInfo.company && <Text>{jobInfo.company}</Text>}
        </View>

        {/* Salutation */}
        <Text style={styles.salutation}>{salutation},</Text>

        {/* Opening */}
        <Text style={styles.paragraph}>{replacePlaceholders(opening, jobInfo)}</Text>

        {/* Body */}
        {body.map((paragraph, index) => (
          <Text key={index} style={styles.paragraph}>
            {replacePlaceholders(paragraph, jobInfo)}
          </Text>
        ))}

        {/* Closing */}
        <Text style={styles.paragraph}>{replacePlaceholders(closing, jobInfo)}</Text>

        {/* Signature */}
        <Text style={styles.signature}>{signature},</Text>
        <Text style={styles.signatureName}>{personalInfo.fullName}</Text>
      </Page>
    </Document>
  )
}

// Executive, Creative, and Technical templates follow similar patterns
export function ExecutiveCoverLetterTemplate({ coverLetterData }) {
  return <ModernCoverLetterTemplate coverLetterData={coverLetterData} />
}

export function CreativeCoverLetterTemplate({ coverLetterData }) {
  return <ModernCoverLetterTemplate coverLetterData={coverLetterData} />
}

export function TechnicalCoverLetterTemplate({ coverLetterData }) {
  const customData = {
    ...coverLetterData,
    customization: {
      ...coverLetterData.customization,
      fontFamily: 'Courier'
    }
  }
  return <ModernCoverLetterTemplate coverLetterData={customData} />
}

// Academic CV Cover Letter Template
export function AcademicCoverLetterTemplate({ coverLetterData }) {
  const customData = {
    ...coverLetterData,
    customization: {
      ...coverLetterData.customization,
      fontFamily: 'Times-Roman'
    }
  }
  return <ClassicCoverLetterTemplate coverLetterData={customData} />
}

// International (Europass) Cover Letter Template
export function InternationalCoverLetterTemplate({ coverLetterData }) {
  return <ClassicCoverLetterTemplate coverLetterData={coverLetterData} />
}

// Portfolio Cover Letter Template
export function PortfolioCoverLetterTemplate({ coverLetterData }) {
  return <ModernCoverLetterTemplate coverLetterData={coverLetterData} />
}
