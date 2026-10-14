const defaultJobReadyPage = {
  contentVersion: 1,
  eyebrow: "Job Readiness",
  title: "Become Job Ready",
  description:
    "Technical skills get you started. Communication skills help you succeed. Our six-step process turns learning into hire-ready capability.",
  isPublished: true,
  steps: [
    {
      number: "01",
      icon: "cap",
      title: "Learn",
      body: "Structured modules with live guidance and revision checkpoints.",
      order: 1,
    },
    {
      number: "02",
      icon: "target",
      title: "Practice",
      body: "Daily practice sets and mentor-reviewed assignments.",
      order: 2,
    },
    {
      number: "03",
      icon: "folder",
      title: "Build Projects",
      body: "Real-time projects on live data, delivered end-to-end.",
      order: 3,
    },
    {
      number: "04",
      icon: "layers",
      title: "Build Portfolio",
      body: "GitHub, dashboards and documented case studies.",
      order: 4,
    },
    {
      number: "05",
      icon: "file",
      title: "Prepare Resume",
      body: "A resume written around outcomes, reviewed line by line.",
      order: 5,
    },
    {
      number: "06",
      icon: "user",
      title: "Practice Interviews",
      body: "Technical and HR mocks with structured feedback.",
      order: 6,
    },
  ],
  includedTitle: "What is included",
  included: [
    { icon: "file", label: "Resume Building", order: 1 },
    { icon: "linkedin", label: "LinkedIn Optimization", order: 2 },
    { icon: "folder", label: "GitHub Portfolio", order: 3 },
    { icon: "mic", label: "Mock Interviews", order: 4 },
    { icon: "target", label: "Technical Interviews", order: 5 },
    { icon: "user", label: "HR Interviews", order: 6 },
    { icon: "chat", label: "Communication Training", order: 7 },
    { icon: "briefcase", label: "Career Guidance", order: 8 },
  ],
  disclaimer:
    "SkilVantage provides job-readiness focused training. We do not make placement guarantees — we prepare you to earn the role.",
};

module.exports = { defaultJobReadyPage };
