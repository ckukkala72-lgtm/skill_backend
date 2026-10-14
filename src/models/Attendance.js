const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    program: { type: String, default: "", trim: true, index: true },
    date: { type: String, required: true, trim: true, index: true },
    session: { type: String, default: "class", trim: true },
    status: {
      type: String,
      enum: ["present", "absent", "late"],
      default: "present",
      index: true,
    },
    notes: { type: String, default: "", trim: true },
  },
  { timestamps: true, collection: "attendances" }
);

attendanceSchema.index({ userId: 1, date: 1, session: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
