// ATS Analyzer - Analyzes resume for ATS compatibility and provides scoring

// Industry-specific keywords database
export const industryKeywords = {
  technology: {
    technical: [
      'javascript', 'python', 'java', 'react', 'node.js', 'angular', 'vue', 'typescript',
      'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'gcp', 'docker',
      'kubernetes', 'ci/cd', 'git', 'agile', 'scrum', 'rest api', 'graphql', 'microservices',
      'cloud', 'devops', 'machine learning', 'ai', 'data structures', 'algorithms',
      'full-stack', 'front-end', 'back-end', 'mobile', 'ios', 'android', 'react native',
      'flutter', 'swift', 'kotlin', 'c++', 'c#', '.net', 'ruby', 'rails', 'php', 'laravel',
      'django', 'flask', 'spring', 'hibernate', 'redis', 'elasticsearch', 'jenkins',
      'terraform', 'ansible', 'linux', 'bash', 'webpack', 'npm', 'yarn', 'test automation',
      'unit testing', 'integration testing', 'tdd', 'bdd', 'selenium', 'jest', 'cypress'
    ],
    soft: [
      'problem-solving', 'analytical', 'collaboration', 'communication', 'leadership',
      'team player', 'adaptable', 'innovative', 'creative', 'detail-oriented', 'self-motivated',
      'time management', 'project management', 'mentoring', 'code review', 'technical documentation'
    ]
  },
  marketing: {
    technical: [
      'seo', 'sem', 'google analytics', 'google ads', 'facebook ads', 'social media',
      'content marketing', 'email marketing', 'marketing automation', 'hubspot', 'salesforce',
      'marketo', 'mailchimp', 'hootsuite', 'buffer', 'canva', 'adobe creative suite',
      'photoshop', 'illustrator', 'indesign', 'wordpress', 'html', 'css', 'copywriting',
      'content strategy', 'brand management', 'digital marketing', 'influencer marketing',
      'conversion optimization', 'a/b testing', 'analytics', 'roi', 'kpi', 'campaign management',
      'lead generation', 'crm', 'market research', 'competitive analysis', 'ppc', 'display ads'
    ],
    soft: [
      'creativity', 'communication', 'storytelling', 'strategic thinking', 'collaboration',
      'project management', 'attention to detail', 'analytical', 'adaptable', 'persuasive',
      'brand awareness', 'customer focus', 'data-driven', 'innovative'
    ]
  },
  finance: {
    technical: [
      'financial analysis', 'financial modeling', 'excel', 'bloomberg', 'quickbooks',
      'sap', 'oracle', 'gaap', 'ifrs', 'sox', 'budgeting', 'forecasting', 'variance analysis',
      'financial reporting', 'accounts payable', 'accounts receivable', 'general ledger',
      'reconciliation', 'audit', 'tax preparation', 'investment analysis', 'portfolio management',
      'risk management', 'valuation', 'mergers and acquisitions', 'due diligence', 'equity research',
      'fixed income', 'derivatives', 'python', 'r', 'sql', 'tableau', 'power bi', 'vba',
      'financial planning', 'fp&a', 'treasury', 'cash management'
    ],
    soft: [
      'analytical', 'detail-oriented', 'problem-solving', 'communication', 'ethical',
      'trustworthy', 'time management', 'deadline-driven', 'team player', 'leadership',
      'strategic thinking', 'decision-making', 'adaptable', 'organized'
    ]
  },
  healthcare: {
    technical: [
      'patient care', 'ehr', 'epic', 'cerner', 'meditech', 'emr', 'hipaa', 'medical terminology',
      'clinical documentation', 'icd-10', 'cpt', 'medical billing', 'medical coding',
      'phlebotomy', 'vital signs', 'medication administration', 'iv therapy', 'wound care',
      'infection control', 'patient assessment', 'care planning', 'discharge planning',
      'case management', 'quality assurance', 'clinical research', 'healthcare compliance',
      'nursing', 'rn', 'lpn', 'cna', 'bls', 'acls', 'pals', 'medical records'
    ],
    soft: [
      'compassionate', 'empathetic', 'patient', 'communication', 'teamwork', 'attention to detail',
      'problem-solving', 'critical thinking', 'stress management', 'reliability', 'ethical',
      'adaptable', 'multitasking', 'time management', 'leadership'
    ]
  },
  sales: {
    technical: [
      'salesforce', 'crm', 'hubspot', 'pipedrive', 'lead generation', 'prospecting',
      'cold calling', 'email outreach', 'sales presentations', 'product demonstrations',
      'negotiation', 'closing', 'account management', 'customer retention', 'upselling',
      'cross-selling', 'b2b sales', 'b2c sales', 'saas', 'solution selling', 'consultative selling',
      'sales forecasting', 'pipeline management', 'quota attainment', 'territory management',
      'contract negotiation', 'proposal writing', 'sales strategy', 'market analysis',
      'linkedin sales navigator', 'outreach.io', 'sales enablement'
    ],
    soft: [
      'persuasive', 'communication', 'relationship building', 'listening', 'resilience',
      'self-motivated', 'competitive', 'goal-oriented', 'adaptable', 'problem-solving',
      'negotiation', 'time management', 'organization', 'customer focus', 'team player'
    ]
  },
  design: {
    technical: [
      'adobe creative suite', 'photoshop', 'illustrator', 'indesign', 'xd', 'figma', 'sketch',
      'invision', 'zeplin', 'after effects', 'premiere pro', 'ui design', 'ux design',
      'user research', 'wireframing', 'prototyping', 'user testing', 'design systems',
      'typography', 'color theory', 'layout design', 'responsive design', 'mobile design',
      'web design', 'html', 'css', 'javascript', 'brand identity', 'logo design',
      'print design', 'illustration', 'animation', 'motion graphics', 'video editing',
      'accessibility', 'usability', 'information architecture', 'interaction design'
    ],
    soft: [
      'creativity', 'attention to detail', 'communication', 'collaboration', 'problem-solving',
      'time management', 'adaptable', 'open to feedback', 'critical thinking', 'empathy',
      'visual thinking', 'storytelling', 'innovation', 'organization'
    ]
  },
  education: {
    technical: [
      'curriculum development', 'lesson planning', 'classroom management', 'differentiated instruction',
      'assessment', 'grading', 'student engagement', 'educational technology', 'google classroom',
      'canvas', 'blackboard', 'moodle', 'zoom', 'microsoft teams', 'smartboard', 'iep',
      '504 plans', 'special education', 'esl', 'literacy', 'stem', 'project-based learning',
      'inquiry-based learning', 'formative assessment', 'summative assessment', 'rubrics',
      'parent communication', 'professional development', 'data analysis', 'standardized testing'
    ],
    soft: [
      'patience', 'communication', 'adaptability', 'creativity', 'organization', 'leadership',
      'collaboration', 'empathy', 'problem-solving', 'time management', 'motivational',
      'cultural sensitivity', 'conflict resolution', 'mentoring', 'passionate'
    ]
  },
  hr: {
    technical: [
      'recruitment', 'talent acquisition', 'applicant tracking system', 'ats', 'workday',
      'bamboohr', 'adp', 'payroll', 'hris', 'employee relations', 'onboarding', 'offboarding',
      'performance management', 'compensation', 'benefits administration', 'compliance',
      'labor law', 'employment law', 'flsa', 'fmla', 'eeo', 'diversity and inclusion',
      'employee engagement', 'retention', 'training and development', 'succession planning',
      'hr analytics', 'organizational development', 'change management', 'policy development',
      'conflict resolution', 'disciplinary action', 'termination', 'exit interviews'
    ],
    soft: [
      'communication', 'confidentiality', 'ethical', 'empathy', 'problem-solving',
      'conflict resolution', 'negotiation', 'organization', 'attention to detail',
      'relationship building', 'adaptable', 'decision-making', 'strategic thinking',
      'time management', 'multitasking'
    ]
  }
}

// ATS-friendly formatting rules
const atsRules = {
  // Section headers that ATS systems recognize
  recognizedHeaders: [
    'summary', 'professional summary', 'profile', 'objective',
    'experience', 'work experience', 'employment history', 'professional experience',
    'education', 'academic background',
    'skills', 'technical skills', 'core competencies',
    'projects', 'key projects',
    'certifications', 'certificates', 'professional certifications',
    'languages', 'language skills',
    'volunteer', 'volunteer experience', 'community involvement',
    'awards', 'honors', 'achievements', 'recognition'
  ],

  // Common ATS-problematic elements
  problematicElements: {
    tables: 'Tables can confuse ATS parsers',
    images: 'Images and graphics are not readable by ATS',
    headers: 'Text in headers/footers may be missed',
    columns: 'Multiple columns can cause parsing errors',
    special_chars: 'Special characters may not parse correctly'
  },

  // Minimum word counts for quality content
  minimumCounts: {
    summary: 30,
    experienceDescription: 20,
    projectDescription: 15
  }
}

// Extract all text content from resume data
function extractAllText(resumeData) {
  const texts = []

  // Personal info
  if (resumeData.personalInfo) {
    Object.values(resumeData.personalInfo).forEach(value => {
      if (typeof value === 'string') texts.push(value)
    })
  }

  // Summary
  if (resumeData.summary) {
    texts.push(resumeData.summary)
  }

  // Experience
  if (resumeData.experience) {
    resumeData.experience.forEach(exp => {
      texts.push(exp.title, exp.company, exp.location)
      if (exp.description && Array.isArray(exp.description)) {
        texts.push(...exp.description)
      }
    })
  }

  // Education
  if (resumeData.education) {
    resumeData.education.forEach(edu => {
      texts.push(edu.degree, edu.school, edu.location)
    })
  }

  // Skills
  if (resumeData.skills && Array.isArray(resumeData.skills)) {
    texts.push(...resumeData.skills)
  }

  // Projects
  if (resumeData.projects) {
    resumeData.projects.forEach(proj => {
      texts.push(proj.name, proj.description)
      if (proj.technologies) texts.push(...proj.technologies)
    })
  }

  // Certifications
  if (resumeData.certifications) {
    resumeData.certifications.forEach(cert => {
      texts.push(cert.name, cert.issuer)
    })
  }

  // Languages
  if (resumeData.languages) {
    resumeData.languages.forEach(lang => {
      texts.push(lang.language, lang.proficiency)
    })
  }

  // Volunteer
  if (resumeData.volunteer) {
    resumeData.volunteer.forEach(vol => {
      texts.push(vol.role, vol.organization, vol.location)
      if (vol.description && Array.isArray(vol.description)) {
        texts.push(...vol.description)
      }
    })
  }

  // Awards
  if (resumeData.awards) {
    resumeData.awards.forEach(award => {
      texts.push(award.title, award.issuer)
      if (award.description) texts.push(award.description)
    })
  }

  return texts.filter(Boolean).join(' ').toLowerCase()
}

// Extract keywords from text
function extractKeywords(text) {
  const words = text.toLowerCase()
    .replace(/[^\w\s.-]/g, ' ') // Keep dots and hyphens for things like "node.js"
    .split(/\s+/)
    .filter(word => word.length > 2) // Filter out very short words

  // Also extract multi-word phrases (bigrams and trigrams)
  const phrases = []
  for (let i = 0; i < words.length - 1; i++) {
    phrases.push(`${words[i]} ${words[i + 1]}`)
    if (i < words.length - 2) {
      phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`)
    }
  }

  return { words: [...new Set(words)], phrases: [...new Set(phrases)] }
}

// Match keywords against industry database
function matchIndustryKeywords(resumeText, industry) {
  if (!industry || !industryKeywords[industry]) {
    return { technical: [], soft: [], missingTechnical: [], missingSoft: [] }
  }

  const { technical, soft } = industryKeywords[industry]
  const foundTechnical = []
  const foundSoft = []

  technical.forEach(keyword => {
    if (resumeText.includes(keyword.toLowerCase())) {
      foundTechnical.push(keyword)
    }
  })

  soft.forEach(keyword => {
    if (resumeText.includes(keyword.toLowerCase())) {
      foundSoft.push(keyword)
    }
  })

  // Suggest missing important keywords (top 10)
  const missingTechnical = technical
    .filter(k => !foundTechnical.includes(k))
    .slice(0, 10)

  const missingSoft = soft
    .filter(k => !foundSoft.includes(k))
    .slice(0, 5)

  return {
    technical: foundTechnical,
    soft: foundSoft,
    missingTechnical,
    missingSoft
  }
}

// Calculate ATS score
function calculateATSScore(resumeData, industry = 'technology') {
  const scores = {
    formatting: 0,
    keywords: 0,
    content: 0,
    completeness: 0
  }
  const issues = []
  const suggestions = []

  const resumeText = extractAllText(resumeData)

  // 1. FORMATTING SCORE (25 points)
  let formattingScore = 25

  // Check for contact information
  if (!resumeData.personalInfo?.email) {
    formattingScore -= 5
    issues.push('Missing email address')
  }
  if (!resumeData.personalInfo?.phone) {
    formattingScore -= 3
    issues.push('Missing phone number')
  }
  if (!resumeData.personalInfo?.location) {
    formattingScore -= 2
    suggestions.push('Add location for better local job matching')
  }

  scores.formatting = Math.max(0, formattingScore)

  // 2. KEYWORDS SCORE (35 points)
  const keywordMatch = matchIndustryKeywords(resumeText, industry)
  const technicalCoverage = keywordMatch.technical.length /
    (industryKeywords[industry]?.technical.length || 1)
  const softCoverage = keywordMatch.soft.length /
    (industryKeywords[industry]?.soft.length || 1)

  scores.keywords = Math.round((technicalCoverage * 25) + (softCoverage * 10))

  if (technicalCoverage < 0.15) {
    issues.push('Very few technical keywords found for your industry')
  }
  if (keywordMatch.missingTechnical.length > 0) {
    suggestions.push(`Consider adding: ${keywordMatch.missingTechnical.slice(0, 5).join(', ')}`)
  }

  // 3. CONTENT QUALITY SCORE (25 points)
  let contentScore = 25

  // Check summary length
  const summaryWords = (resumeData.summary || '').split(/\s+/).length
  if (summaryWords < 20) {
    contentScore -= 5
    issues.push('Summary is too short (minimum 20 words recommended)')
  }

  // Check experience descriptions
  if (resumeData.experience && resumeData.experience.length > 0) {
    let hasDetailedExperience = false
    resumeData.experience.forEach(exp => {
      if (exp.description && exp.description.length >= 2) {
        hasDetailedExperience = true
      }
    })
    if (!hasDetailedExperience) {
      contentScore -= 8
      issues.push('Experience descriptions need more detail (2-4 bullet points per role)')
    }
  }

  // Check for quantifiable achievements
  const hasNumbers = /\d+[%+]?|\$\d+|[0-9]+\s*(million|thousand|hours|days|users|customers)/i.test(resumeText)
  if (!hasNumbers) {
    contentScore -= 7
    suggestions.push('Add quantifiable achievements (e.g., "increased sales by 30%")')
  }

  // Check for action verbs
  const actionVerbs = [
    'led', 'managed', 'developed', 'created', 'improved', 'increased', 'decreased',
    'designed', 'implemented', 'launched', 'built', 'achieved', 'reduced', 'optimized'
  ]
  const hasActionVerbs = actionVerbs.some(verb => resumeText.includes(verb))
  if (!hasActionVerbs) {
    contentScore -= 5
    suggestions.push('Start bullet points with strong action verbs')
  }

  scores.content = Math.max(0, contentScore)

  // 4. COMPLETENESS SCORE (15 points)
  let completenessScore = 0

  if (resumeData.personalInfo?.fullName) completenessScore += 2
  if (resumeData.personalInfo?.email) completenessScore += 2
  if (resumeData.personalInfo?.phone) completenessScore += 2
  if (resumeData.summary && summaryWords >= 20) completenessScore += 3
  if (resumeData.experience && resumeData.experience.length > 0) completenessScore += 3
  if (resumeData.education && resumeData.education.length > 0) completenessScore += 2
  if (resumeData.skills && resumeData.skills.length >= 5) completenessScore += 1

  scores.completeness = completenessScore

  // Calculate total score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)

  return {
    totalScore: Math.min(100, totalScore),
    scores,
    issues,
    suggestions,
    keywordMatch,
    industry
  }
}

// Get recommendations based on score
export function getRecommendations(analysisResult) {
  const { totalScore, issues, suggestions, keywordMatch } = analysisResult
  const recommendations = []

  if (totalScore < 60) {
    recommendations.push({
      priority: 'high',
      category: 'Overall',
      message: 'Your resume needs significant improvements for ATS compatibility'
    })
  } else if (totalScore < 80) {
    recommendations.push({
      priority: 'medium',
      category: 'Overall',
      message: 'Your resume is good but could be optimized further'
    })
  }

  // Convert issues to recommendations
  issues.forEach(issue => {
    recommendations.push({
      priority: 'high',
      category: 'Critical',
      message: issue
    })
  })

  // Convert suggestions to recommendations
  suggestions.forEach(suggestion => {
    recommendations.push({
      priority: 'medium',
      category: 'Improvement',
      message: suggestion
    })
  })

  // Add keyword recommendations
  if (keywordMatch.missingTechnical.length > 0) {
    recommendations.push({
      priority: 'medium',
      category: 'Keywords',
      message: `Missing technical keywords: ${keywordMatch.missingTechnical.slice(0, 5).join(', ')}`
    })
  }

  if (keywordMatch.missingSoft.length > 0) {
    recommendations.push({
      priority: 'low',
      category: 'Keywords',
      message: `Consider adding soft skills: ${keywordMatch.missingSoft.slice(0, 3).join(', ')}`
    })
  }

  return recommendations
}

// Main export function
export function analyzeResume(resumeData, industry = 'technology') {
  const analysis = calculateATSScore(resumeData, industry)
  const recommendations = getRecommendations(analysis)

  return {
    ...analysis,
    recommendations
  }
}

// Get score color for UI display
export function getScoreColor(score) {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

// Get score background color
export function getScoreBgColor(score) {
  if (score >= 80) return 'bg-green-100'
  if (score >= 60) return 'bg-yellow-100'
  return 'bg-red-100'
}

// Get priority color
export function getPriorityColor(priority) {
  switch (priority) {
    case 'high': return 'text-red-600 bg-red-50'
    case 'medium': return 'text-yellow-600 bg-yellow-50'
    case 'low': return 'text-blue-600 bg-blue-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}
