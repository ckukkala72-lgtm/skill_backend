const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    learnerType: { type: String, required: true, trim: true },
    program: { type: String, required: true, trim: true },
    answers: { type: mongoose.Schema.Types.Mixed, default: {} },
    resumeName: { type: String, default: "" },
    consent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
