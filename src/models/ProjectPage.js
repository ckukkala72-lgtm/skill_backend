const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    icon: { type: String, default: "folder" },
  },
  { _id: false }
);

const groupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    programPath: { type: String, default: "/programs" },
    programLabel: { type: String, default: "View Program" },
    order: { type: Number, default: 0 },
    projects: { type: [projectSchema], default: [] },
  },
  { _id: false }
);

const projectPageSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "Projects" },
    title: { type: String, default: "Build Real-Time Projects" },
    description: { type: String, default: "" },
    groups: { type: [groupSchema], default: [] },
    cta: {
      title: { type: String, default: "" },
      buttonLabel: { type: String, default: "Start Learning" },
      buttonPath: { type: String, default: "/register" },
    },
    contentVersion: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectPage", projectPageSchema);
