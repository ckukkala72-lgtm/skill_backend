const mongoose = require("mongoose");

const contactPageSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "Contact" },
    title: { type: String, default: "Talk to SkilVantage" },
    description: { type: String, default: "" },
    phoneLabel: { type: String, default: "Phone" },
    phone: { type: String, default: "" },
    phoneHref: { type: String, default: "" },
    emailLabel: { type: String, default: "Email" },
    email: { type: String, default: "" },
    emailHref: { type: String, default: "" },
    locationLabel: { type: String, default: "Location" },
    location: { type: String, default: "" },
    whatsappLabel: { type: String, default: "Chat on WhatsApp" },
    whatsappHref: { type: String, default: "" },
    formTitle: { type: String, default: "Send an enquiry" },
    submitLabel: { type: String, default: "Talk to SkilVantage" },
    courses: { type: [String], default: [] },
    learnerTypes: { type: [String], default: [] },
    contentVersion: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactPage", contactPageSchema);
