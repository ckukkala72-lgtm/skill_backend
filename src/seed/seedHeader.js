require("dotenv").config();

const connectDB = require("../config/db");
const Header = require("../models/Header");
const { defaultHeader } = require("./headerDefaults");
const mongoose = require("mongoose");

const seedHeader = async () => {
  await connectDB();
  await Header.deleteMany({});
  await Header.create(defaultHeader);
  console.log("Header content seeded");
  await mongoose.connection.close();
};

seedHeader().catch(async (error) => {
  console.error("Seed failed:", error.message);
  await mongoose.connection.close();
  process.exit(1);
});
