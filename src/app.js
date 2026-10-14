const express = require("express");
const cors = require("cors");
const headerRoutes = require("./routes/headerRoutes");
const careerPathRoutes = require("./routes/careerPathRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const projectRoutes = require("./routes/projectRoutes");
const jobReadyRoutes = require("./routes/jobReadyRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const contactRoutes = require("./routes/contactRoutes");
const registerRoutes = require("./routes/registerRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://skilvantage.com",
  "https://www.skilvantage.com",
  ...(process.env.CLIENT_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

const isSkilvantageHost = (hostname) =>
  hostname === "skilvantage.com" || hostname.endsWith(".skilvantage.com");

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  try {
    const { protocol, hostname } = new URL(origin);
    return (
      protocol === "https:" &&
      (hostname.endsWith(".vercel.app") || isSkilvantageHost(hostname))
    );
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "SkilVantage API is running" });
});

app.use("/api/headers", headerRoutes);
app.use("/api/career-paths", careerPathRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/job-ready", jobReadyRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/attendance", attendanceRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;
