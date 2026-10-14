const mongoose = require("mongoose");

const registerPageSchema = new mongoose.Schema(
  {
    learnerStep: { type: mongoose.Schema.Types.Mixed, default: {} },
    programStep: { type: mongoose.Schema.Types.Mixed, default: {} },
    form: { type: mongoose.Schema.Types.Mixed, default: {} },
    contentVersion: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegisterPage", registerPageSchema);
