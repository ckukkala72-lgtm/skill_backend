const selectOptions = {
  gender: ["Male", "Female", "Other", "Prefer not to say"],
  careerTrack: [
    "Data Analyst",
    "Data Scientist",
    "AI / ML Engineer",
    "Generative AI",
    "Agentic AI",
  ],
  lookingFor: ["Internship", "Full-time role", "Career switch", "Upskilling"],
  learningMode: ["Online", "Offline / Classroom", "Hybrid"],
  hearAbout: [
    "Instagram",
    "LinkedIn",
    "Google",
    "Friend / Referral",
    "College",
    "Other",
  ],
};

const personalFields = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: selectOptions.gender,
  },
  { name: "phone", label: "Phone Number", type: "tel", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
];

const technicalFields = [
  { name: "skillSet", label: "Current Skill Set", type: "text" },
  {
    name: "languages",
    label: "Programming Languages Known",
    type: "text",
  },
  { name: "tools", label: "Tools / Technologies Known", type: "text" },
  { name: "certifications", label: "Certifications", type: "text" },
  {
    name: "previousProjects",
    label: "Previous Projects",
    type: "textarea",
    span: 2,
  },
];

const careerFields = [
  {
    name: "careerTrack",
    label: "Preferred Career Track",
    type: "select",
    options: selectOptions.careerTrack,
  },
  { name: "expectedSalary", label: "Expected Salary / Package", type: "text" },
  { name: "jobRole", label: "Preferred Job Role", type: "text" },
  {
    name: "lookingFor",
    label: "Looking for",
    type: "select",
    options: selectOptions.lookingFor,
  },
  {
    name: "learningMode",
    label: "Preferred Learning Mode",
    type: "select",
    options: selectOptions.learningMode,
  },
  {
    name: "availability",
    label: "Availability",
    type: "text",
    placeholder: "Weekends / Evenings",
  },
  {
    name: "hearAbout",
    label: "How did you hear about SkilVantage?",
    type: "select",
    options: selectOptions.hearAbout,
  },
];

const optionalFields = [
  { name: "linkedin", label: "LinkedIn Profile", type: "url" },
  { name: "github", label: "GitHub Profile", type: "url" },
  {
    name: "resume",
    label: "Resume Upload (PDF / DOC / DOCX, max 5 MB)",
    type: "file",
    span: 2,
    accept: ".pdf,.doc,.docx",
  },
];

const defaultRegisterPage = {
  contentVersion: 1,
  isPublished: true,
  learnerStep: {
    title: "Select Your Learner Type",
    description: "Choose one — the registration form is tailored to your answer.",
    continueLabel: "Continue",
    types: [
      {
        id: "student",
        icon: "cap",
        title: "Student / Fresher",
        body: "College students, final-year students, graduates and career starters.",
      },
      {
        id: "professional",
        icon: "briefcase",
        title: "Working Professional",
        body: "IT and non-IT professionals growing or changing their career track.",
      },
    ],
  },
  programStep: {
    title: "Select Your Program",
  },
  form: {
    studentTitle: "Student Registration",
    professionalTitle: "Professional Registration",
    programLabel: "Program:",
    changeLabel: "Change",
    submitLabel: "Start My Career Journey",
    consentLabel:
      "I agree to the SkilVantage privacy policy and allow SkilVantage to contact me regarding training programs and career opportunities.",
    studentSections: [
      { id: "personal", title: "Personal Information", fields: personalFields },
      {
        id: "academic",
        title: "Academic Information",
        fields: [
          {
            name: "college",
            label: "College / University Name",
            type: "text",
          },
          { name: "degree", label: "Degree", type: "text" },
          {
            name: "branch",
            label: "Branch / Specialization",
            type: "text",
          },
          { name: "passedOutYear", label: "Passed Out Year", type: "text" },
          {
            name: "currentYear",
            label: "Current Year of Study (if applicable)",
            type: "text",
          },
        ],
      },
      {
        id: "technical",
        title: "Technical Information",
        fields: technicalFields,
      },
      { id: "career", title: "Career Information", fields: careerFields },
      { id: "optional", title: "Optional", fields: optionalFields },
    ],
    professionalSections: [
      { id: "personal", title: "Personal Information", fields: personalFields },
      {
        id: "professional",
        title: "Professional Information",
        fields: [
          { name: "company", label: "Current Company", type: "text" },
          { name: "designation", label: "Current Designation", type: "text" },
          {
            name: "experience",
            label: "Years of Experience",
            type: "text",
          },
          { name: "domain", label: "Current Domain", type: "text" },
          {
            name: "qualification",
            label: "Highest Qualification",
            type: "text",
          },
        ],
      },
      {
        id: "technical",
        title: "Technical Information",
        fields: technicalFields,
      },
      { id: "career", title: "Career Information", fields: careerFields },
      { id: "optional", title: "Optional", fields: optionalFields },
    ],
  },
};

module.exports = { defaultRegisterPage };
