const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "chart" },
    title: { type: String, required: true, trim: true },
    level: { type: String, default: "Beginner to Advanced" },
    duration: { type: String, required: true, trim: true },
    modules: { type: Number, default: 0 },
    targetRoles: { type: Number, default: 0 },
    body: { type: String, required: true, trim: true },
    skills: { type: [String], default: [] },
    roadmap: { type: String, default: "/roadmaps" },
    roadmapLabel: { type: String, default: "View Roadmap" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const careerPathSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "Five core career programs" },
    title: { type: String, default: "Choose Your Career Path" },
    programs: { type: [programSchema], default: [] },
    contentVersion: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CareerPath", careerPathSchema);
