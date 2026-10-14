require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const {
  enableMemoryStore,
  ensureDefaultHeader,
} = require("./src/services/headerService");
const careerPathService = require("./src/services/careerPathService");
const roadmapService = require("./src/services/roadmapService");
const projectService = require("./src/services/projectService");
const jobReadyService = require("./src/services/jobReadyService");
const aboutService = require("./src/services/aboutService");
const contactService = require("./src/services/contactService");
const registerService = require("./src/services/registerService");
const userService = require("./src/services/userService");
const paymentService = require("./src/services/paymentService");
const attendanceService = require("./src/services/attendanceService");

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    await ensureDefaultHeader();
    await careerPathService.ensureDefaultCareerPaths();
    await roadmapService.ensureDefaultRoadmap();
    await projectService.ensureDefaultProjectPage();
    await jobReadyService.ensureDefaultJobReadyPage();
    await aboutService.ensureDefaultAboutPage();
    await contactService.ensureDefaultContactPage();
    await registerService.ensureDefaultRegisterPage();
    try {
      await paymentService.ensurePaymentsCollection();
      await attendanceService.ensureAttendanceCollection();
    } catch (setupError) {
      console.warn(`Payments/attendance setup skipped: ${setupError.message}`);
    }
  } catch (error) {
    enableMemoryStore();
    careerPathService.enableMemoryStore();
    roadmapService.enableMemoryStore();
    projectService.enableMemoryStore();
    jobReadyService.enableMemoryStore();
    aboutService.enableMemoryStore();
    contactService.enableMemoryStore();
    registerService.enableMemoryStore();
    userService.enableMemoryStore();
    paymentService.enableMemoryStore();
    attendanceService.enableMemoryStore();
    console.warn(`MongoDB unavailable (${error.message}). Using in-memory CMS data.`);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
