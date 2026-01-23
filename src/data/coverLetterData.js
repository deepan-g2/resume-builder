export const initialCoverLetterData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com"
  },
  jobInfo: {
    position: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    hiringManager: "Jane Smith",
    department: "Engineering"
  },
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  salutation: "Dear Hiring Manager",
  opening: "I am writing to express my strong interest in the [Position] position at [Company]. With my extensive background in software development and proven track record of delivering high-impact solutions, I am excited about the opportunity to contribute to your team.",
  body: [
    "In my current role as Senior Software Engineer at Tech Corp, I have led the development of scalable web applications serving over 1 million users. My expertise in modern web technologies, combined with my passion for creating intuitive user experiences, aligns perfectly with the requirements outlined in your job posting.",
    "What particularly excites me about [Company] is your commitment to innovation and your recent work on [specific project or initiative]. I am impressed by your company's approach to [relevant aspect], and I believe my experience in [relevant skills] would enable me to make meaningful contributions from day one.",
    "Beyond my technical skills, I bring strong leadership abilities and a collaborative mindset. I have mentored junior developers, conducted code reviews, and worked cross-functionally with product and design teams to deliver features that users love. I am confident that my combination of technical expertise and interpersonal skills would make me a valuable addition to your team."
  ],
  closing: "Thank you for considering my application. I am enthusiastic about the possibility of joining [Company] and contributing to your mission. I look forward to the opportunity to discuss how my background, skills, and enthusiasms align with your team's needs.",
  signature: "Sincerely",
  customization: {
    accentColor: "#2563eb",
    fontFamily: "Helvetica",
    fontSize: 11,
    lineSpacing: 1.5,
    paragraphSpacing: 12,
    pageMargin: 50
  }
};
