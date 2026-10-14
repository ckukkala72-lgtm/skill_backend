const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, trim: true },
    icon: { type: String, default: "cap" },
    title: { type: String, required: true, trim: true },
    body: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const includedSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "file" },
    label: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const jobReadyPageSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "Job Readiness" },
    title: { type: String, default: "Become Job Ready" },
    description: { type: String, default: "" },
    steps: { type: [stepSchema], default: [] },
    includedTitle: { type: String, default: "What is included" },
    included: { type: [includedSchema], default: [] },
    disclaimer: { type: String, default: "" },
    contentVersion: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobReadyPage", jobReadyPageSchema);
