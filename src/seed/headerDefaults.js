const defaultHeader = {
  brandName: "SkilVantage",
  logoIcon: "graduation-cap",
  isPublished: true,
  cta: {
    label: "Register Now",
    path: "/register",
  },
  navItems: [
    { label: "Home", path: "/", order: 1, isActiveHighlight: true },
    { label: "Programs", path: "/programs", order: 2, isActiveHighlight: false },
    { label: "Roadmaps", path: "/roadmaps", order: 3, isActiveHighlight: false },
    { label: "Projects", path: "/projects", order: 4, isActiveHighlight: false },
    { label: "Job Ready", path: "/job-ready", order: 5, isActiveHighlight: false },
    { label: "About", path: "/about", order: 6, isActiveHighlight: false },
    { label: "Contact", path: "/contact", order: 7, isActiveHighlight: false },
  ],
};

module.exports = { defaultHeader };
