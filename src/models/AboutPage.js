const mongoose = require("mongoose");

const highlightSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const aboutPageSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "About Us" },
    title: { type: String, default: "About SkilVantage" },
    description: { type: String, default: "" },
    storyTitle: { type: String, default: "" },
    story: { type: [String], default: [] },
    quote: { type: String, default: "" },
    cta: {
      label: { type: String, default: "Explore Programs" },
      path: { type: String, default: "/programs" },
    },
    highlights: { type: [highlightSchema], default: [] },
    contentVersion: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutPage", aboutPageSchema);
