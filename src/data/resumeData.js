export const initialResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com",
    photo: null
  },
  sectionVisibility: {
    summary: true,
    experience: true,
    education: true,
    skills: true
  },
  summary: "Experienced professional with a proven track record in delivering high-quality results. Skilled in problem-solving, teamwork, and effective communication.",
  experience: [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
      startDate: "Jan 2020",
      endDate: "Present",
      current: true,
      description: [
        "Led development of scalable web applications serving 1M+ users",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipelines reducing deployment time by 50%"
      ]
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      current: false,
      description: [
        "Developed and maintained RESTful APIs using Node.js and Express",
        "Collaborated with cross-functional teams to deliver features",
        "Optimized database queries improving performance by 40%"
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Boston, MA",
      graduationDate: "May 2017",
      gpa: "3.8/4.0"
    }
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "AWS",
    "Docker"
  ]
};
