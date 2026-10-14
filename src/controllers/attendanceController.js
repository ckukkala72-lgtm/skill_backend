const {
  listAttendance,
  markAttendance,
  summarizeAttendance,
} = require("../services/attendanceService");

const getAttendance = async (req, res) => {
  try {
    const [allRows, attendance] = await Promise.all([
      listAttendance(),
      listAttendance({
        status: req.query.status,
        date: req.query.date,
        q: req.query.q,
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        attendance,
        stats: summarizeAttendance(allRows),
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to load attendance",
    });
  }
};

const postAttendance = async (req, res) => {
  try {
    const record = await markAttendance(req.body);
    return res.status(201).json({ success: true, data: record });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to mark attendance",
    });
  }
};

module.exports = { getAttendance, postAttendance };
