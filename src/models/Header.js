const mongoose = require("mongoose");

const navItemSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActiveHighlight: { type: Boolean, default: false },
  },
  { _id: false }
);

const headerSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true, trim: true },
    logoIcon: { type: String, default: "graduation-cap" },
    navItems: { type: [navItemSchema], default: [] },
    cta: {
      label: { type: String, default: "Register Now" },
      path: { type: String, default: "/register" },
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Header", headerSchema);
