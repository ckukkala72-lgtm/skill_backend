const jobReadyStages = (skillsByStage) => [
  {
    number: "01",
    title: "Foundation",
    body: "Tools, language basics and the mindset the role needs.",
    skills: skillsByStage.foundation,
  },
  {
    number: "02",
    title: "Core Skills",
    body: "The everyday working skills employers test you on.",
    skills: skillsByStage.core,
  },
  {
    number: "03",
    title: "Advanced Skills",
    body: "Depth that separates a candidate from a hire.",
    skills: skillsByStage.advanced,
  },
  {
    number: "04",
    title: "Projects",
    body: "Real-time projects on live data, reviewed work.",
    skills: [],
  },
  {
    number: "05",
    title: "Portfolio",
    body: "GitHub, dashboards and case studies you can show.",
    skills: [],
  },
  {
    number: "06",
    title: "Resume",
    body: "A resume written around outcomes, not keywords.",
    skills: [],
  },
  {
    number: "07",
    title: "Interview Preparation",
    body: "Mock technical, HR and communication rounds.",
    skills: [],
  },
  {
    number: "08",
    title: "Job Ready",
    body: "You can learn, apply, communicate and perform.",
    skills: [],
  },
];

const defaultRoadmap = {
  contentVersion: 2,
  eyebrow: "Career Roadmaps",
  title: "From Foundation to Job Ready",
  description:
    "Pick a career track and see the exact progression — what you learn, what you build, and how you prepare for interviews.",
  isPublished: true,
  tracks: [
    {
      label: "Data Analyst",
      slug: "data-analyst",
      order: 1,
      heading: "Data Analyst Roadmap",
      summary:
        "Learn how to transform raw data into meaningful business insights and make data-driven decisions.",
      registerLabel: "Register for Data Analyst",
      detailsPath: "/programs",
      stages: jobReadyStages({
        foundation: [
          "Excel",
          "SQL",
          "Statistics Fundamentals",
          "Python Basics",
        ],
        core: [
          "Pandas & NumPy",
          "Data Cleaning",
          "Data Visualization",
          "Power BI / Tableau",
        ],
        advanced: [
          "Business Analytics",
          "Dashboard Development",
          "Real-world Projects",
          "Resume & Interview Preparation",
        ],
      }),
    },
    {
      label: "Data Scientist",
      slug: "data-scientist",
      order: 2,
      heading: "Data Scientist Roadmap",
      summary:
        "Build strong foundations in statistics, machine learning and predictive analytics to solve real-world problems.",
      registerLabel: "Register for Data Scientist",
      detailsPath: "/programs",
      stages: jobReadyStages({
        foundation: [
          "Python",
          "NumPy",
          "Pandas",
          "SQL",
          "Statistics",
          "Probability",
          "Data Cleaning",
        ],
        core: [
          "Exploratory Data Analysis",
          "Feature Engineering",
          "Data Visualization",
          "Machine Learning",
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
        ],
        advanced: [
          "Feature Selection",
          "Ensemble Methods",
          "Advanced Machine Learning",
          "Projects",
          "Deployment Basics",
          "Interview Preparation",
        ],
      }),
    },
    {
      label: "AI / ML",
      slug: "ai-ml",
      order: 3,
      heading: "AI / ML Engineer Roadmap",
      summary:
        "Develop practical skills to build, train, evaluate and deploy intelligent machine learning systems.",
      registerLabel: "Register for AI / ML",
      detailsPath: "/programs",
      stages: jobReadyStages({
        foundation: [
          "Python Programming",
          "Mathematics for ML",
          "Statistics",
          "Data Processing",
          "Machine Learning",
          "Deep Learning",
          "Neural Networks",
        ],
        core: [
          "CNN",
          "RNN",
          "Transformers",
          "NLP",
          "Computer Vision",
          "Model Optimization",
          "MLOps Fundamentals",
        ],
        advanced: [
          "Model Deployment",
          "APIs",
          "Cloud Fundamentals",
          "Real-world AI Projects",
          "System Design Basics",
          "Interview Preparation",
        ],
      }),
    },
    {
      label: "Generative AI",
      slug: "generative-ai",
      order: 4,
      heading: "Generative AI Roadmap",
      summary:
        "Learn how modern Generative AI systems work and build practical AI applications using LLMs.",
      registerLabel: "Register for Generative AI",
      detailsPath: "/programs",
      stages: jobReadyStages({
        foundation: [
          "Python",
          "LLMs",
          "Prompt Engineering",
          "Embeddings",
        ],
        core: ["Vector Databases", "RAG", "LangChain", "LLM APIs"],
        advanced: [
          "Evaluation",
          "Production Workflows",
          "Real-world GenAI Projects",
          "Interview Preparation",
        ],
      }),
    },
    {
      label: "Agentic AI",
      slug: "agentic-ai",
      order: 5,
      heading: "Agentic AI Roadmap",
      summary:
        "Learn how to build intelligent AI agents that can reason, plan, use tools and complete multi-step tasks.",
      registerLabel: "Register for Agentic AI",
      detailsPath: "/programs",
      stages: jobReadyStages({
        foundation: [
          "Python",
          "LLMs",
          "Prompt Engineering",
          "Function Calling",
        ],
        core: ["Tool Calling", "RAG", "Agents", "Agent Memory"],
        advanced: [
          "Multi-agent Systems",
          "Orchestration",
          "Evaluation",
          "Interview Preparation",
        ],
      }),
    },
  ],
};

module.exports = { defaultRoadmap };
