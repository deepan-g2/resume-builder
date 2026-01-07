import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react'

export default function Preview({ resumeData, template }) {
  const { personalInfo, summary, experience, education, skills } = resumeData

  // Modern Template
  if (template === 'modern') {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-sm page-break-section" style={{ minHeight: '11in', width: '210mm' }}>
        {/* Header with colored background */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 -m-8 mb-8 rounded-t-lg page-break-avoid">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{personalInfo.fullName}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 flex-shrink-0" />
                    <span>{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 flex-shrink-0" />
                    <span>{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Photo */}
            {personalInfo.photo && (
              <div className="flex-shrink-0">
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.fullName}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-8 page-break-avoid">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-2">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8 page-break-avoid">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-2">Work Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id} className="page-break-avoid">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-lg text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p className="font-medium">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                      <p className="text-sm">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    {exp.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8 page-break-avoid">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-2">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id} className="page-break-avoid">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                    </div>
                    <div className="text-right text-gray-600">
                      <p className="font-medium">{edu.graduationDate}</p>
                      <p className="text-sm">{edu.location}</p>
                      {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="page-break-avoid">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  }

  // Classic Template
  if (template === 'classic') {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 page-break-section" style={{ minHeight: '11in', width: '210mm' }}>
        {/* Header */}
        <header className="text-center mb-8 border-b-4 border-gray-800 pb-6 page-break-avoid">
          {personalInfo.photo && (
            <div className="flex justify-center mb-4">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"
              />
            </div>
          )}
          <h1 className="text-5xl font-serif font-bold mb-3 text-gray-900">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>•</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          {(personalInfo.linkedin || personalInfo.website) && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>•</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-8 page-break-avoid">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8 page-break-avoid">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">Professional Experience</h2>
            <div className="space-y-6">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                      <span className="text-gray-600 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-gray-700">
                      <p className="italic">{exp.company}</p>
                      <p className="text-sm">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.description.map((desc, i) => desc && <li key={i}>{desc}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8 page-break-avoid">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-gray-600 text-sm">{edu.graduationDate}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-gray-700">
                    <p className="italic">{edu.school}</p>
                    <p className="text-sm">{edu.location}</p>
                  </div>
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="page-break-avoid">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
            <p className="text-gray-700">{skills.join(' • ')}</p>
          </section>
        )}
      </div>
    )
  }

  // Minimal Template
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 page-break-section" style={{ minHeight: '11in', width: '210mm' }}>
      {/* Header */}
      <header className="mb-8 page-break-avoid">
        <div className="flex items-start justify-between gap-6 mb-4">
          <div className="flex-1">
            <h1 className="text-5xl font-light mb-2 text-gray-900">{personalInfo.fullName}</h1>
            <div className="text-sm text-gray-600 flex flex-wrap gap-x-3 gap-y-1">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>|</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>|</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.linkedin && <span>|</span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>|</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>
          {personalInfo.photo && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">Experience</h2>
          <div className="space-y-5">
            {experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{exp.company} | {exp.location}</p>
                <ul className="list-none space-y-1 text-sm text-gray-700">
                  {exp.description.map((desc, i) => desc && <li key={i} className="pl-4 border-l-2 border-gray-300">{desc}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">Education</h2>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-sm text-gray-700">{edu.school} | {edu.location}</p>
                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="page-break-avoid">
          <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider border-b border-gray-300 pb-2">Skills</h2>
          <p className="text-sm text-gray-700">{skills.join(', ')}</p>
        </section>
      )}
    </div>
  )
}
