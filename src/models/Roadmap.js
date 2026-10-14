const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    body: { type: String, default: "" },
    skills: { type: [String], default: [] },
  },
  { _id: false }
);

const trackSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    heading: { type: String, default: "" },
    summary: { type: String, default: "" },
    registerLabel: { type: String, default: "Register" },
    detailsPath: { type: String, default: "/programs" },
    stages: { type: [stageSchema], default: [] },
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "Career Roadmaps" },
    title: { type: String, default: "From Foundation to Job Ready" },
    description: { type: String, default: "" },
    tracks: { type: [trackSchema], default: [] },
    contentVersion: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Roadmap", roadmapSchema);
