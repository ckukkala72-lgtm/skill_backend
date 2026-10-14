const projectBody =
  "Real-time build on live data, reviewed by a mentor and documented for your portfolio.";

const defaultProjectPage = {
  contentVersion: 1,
  eyebrow: "Projects",
  title: "Build Real-Time Projects",
  description:
    'Every program takes you from beginner to advanced through real-time projects on live datasets — so you can answer the interviewer\'s first question: "What have you built?"',
  isPublished: true,
  groups: [
    {
      title: "Data Analyst Projects",
      slug: "data-analyst",
      programPath: "/programs",
      programLabel: "View Program",
      order: 1,
      projects: [
        { title: "Sales Dashboard", body: projectBody, icon: "folder" },
        { title: "Customer Analytics", body: projectBody, icon: "folder" },
        { title: "Financial Analytics", body: projectBody, icon: "folder" },
        { title: "Marketing Analytics", body: projectBody, icon: "folder" },
      ],
    },
    {
      title: "Data Scientist Projects",
      slug: "data-scientist",
      programPath: "/programs",
      programLabel: "View Program",
      order: 2,
      projects: [
        { title: "Customer Churn Prediction", body: projectBody, icon: "folder" },
        { title: "House Price Prediction", body: projectBody, icon: "folder" },
        { title: "Fraud Detection", body: projectBody, icon: "folder" },
        { title: "Recommendation System", body: projectBody, icon: "folder" },
      ],
    },
    {
      title: "AI / ML Engineer Projects",
      slug: "ai-ml",
      programPath: "/programs",
      programLabel: "View Program",
      order: 3,
      projects: [
        { title: "NLP Application", body: projectBody, icon: "folder" },
        {
          title: "Computer Vision Application",
          body: projectBody,
          icon: "folder",
        },
        { title: "Prediction System", body: projectBody, icon: "folder" },
        {
          title: "Intelligent Classification System",
          body: projectBody,
          icon: "folder",
        },
      ],
    },
    {
      title: "Generative AI Projects",
      slug: "generative-ai",
      programPath: "/programs",
      programLabel: "View Program",
      order: 4,
      projects: [
        { title: "RAG Chatbot", body: projectBody, icon: "folder" },
        { title: "Document Q&A", body: projectBody, icon: "folder" },
        { title: "AI Assistant", body: projectBody, icon: "folder" },
        { title: "Knowledge Base", body: projectBody, icon: "folder" },
      ],
    },
    {
      title: "Agentic AI Projects",
      slug: "agentic-ai",
      programPath: "/programs",
      programLabel: "View Program",
      order: 5,
      projects: [
        { title: "Research Agent", body: projectBody, icon: "folder" },
        { title: "Customer Support Agent", body: projectBody, icon: "folder" },
        { title: "Multi-Agent Workflow", body: projectBody, icon: "folder" },
        { title: "AI Automation System", body: projectBody, icon: "folder" },
      ],
    },
  ],
  cta: {
    title: "Don't just learn technology. Learn how to apply it.",
    buttonLabel: "Start Learning",
    buttonPath: "/register",
  },
};

module.exports = { defaultProjectPage };
