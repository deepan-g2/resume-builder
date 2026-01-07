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
  customization: {
    accentColor: "#2563eb", // Default blue
    fontFamily: "Helvetica", // Helvetica, Times-Roman, Courier
    fontSize: 11, // Base font size (10-14)
    lineSpacing: 1.5, // Line height multiplier (1.2-2.0)
    paragraphSpacing: 12, // Spacing between paragraphs (8-20)
    pageMargin: 40, // Page margins in pixels (20-60)
    showPageBorder: false, // Show border around page
    borderWidth: 2, // Border width (1-4)
    borderColor: "#e5e7eb" // Border color
  },
  sectionVisibility: {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    volunteer: true,
    awards: true
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
  ],
  projects: [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform with payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "github.com/johndoe/ecommerce",
      date: "2023"
    }
  ],
  certifications: [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "June 2023",
      expiryDate: "",
      credentialId: ""
    }
  ],
  languages: [
    {
      id: 1,
      language: "English",
      proficiency: "Native"
    },
    {
      id: 2,
      language: "Spanish",
      proficiency: "Professional"
    }
  ],
  volunteer: [
    {
      id: 1,
      role: "Volunteer Web Developer",
      organization: "Local Non-Profit",
      location: "New York, NY",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description: [
        "Redesigned organization website increasing donations by 30%",
        "Trained staff on content management system"
      ]
    }
  ],
  awards: [
    {
      id: 1,
      title: "Employee of the Year",
      issuer: "Tech Corp",
      date: "December 2023",
      description: "Recognized for outstanding performance and leadership"
    }
  ]
};
