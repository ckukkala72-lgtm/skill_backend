const Attendance = require("../models/Attendance");
const { getUserById, listUsers } = require("./userService");

let useMemoryStore = false;
let memoryAttendance = [];

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryAttendance = [];
};

const today = () => new Date().toISOString().slice(0, 10);

const requireUser = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
};

const buildRecord = (user, payload) => ({
  userId: user._id,
  fullName: user.fullName,
  email: user.email,
  program: payload.program?.trim() || user.program || "",
  date: payload.date || today(),
  session: payload.session?.trim() || "class",
  status: payload.status || "present",
  notes: payload.notes?.trim() || "",
});

const listAttendance = async ({ status, date, q } = {}) => {
  const matches = (row) => {
    if (status && row.status !== status) return false;
    if (date && row.date !== date) return false;
    if (q) {
      const haystack = `${row.fullName} ${row.email} ${row.session}`.toLowerCase();
      if (!haystack.includes(q.toLowerCase())) return false;
    }
    return true;
  };

  if (useMemoryStore) {
    return [...memoryAttendance].filter(matches).sort((a, b) => {
      return String(b.date).localeCompare(String(a.date));
    });
  }

  const filter = {};
  if (status) filter.status = status;
  if (date) filter.date = date;
  if (q) {
    filter.$or = [
      { fullName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { session: { $regex: q, $options: "i" } },
    ];
  }

  return Attendance.find(filter).sort({ date: -1, createdAt: -1 }).lean();
};

const markAttendance = async (payload) => {
  const user = await requireUser(payload.userId);
  const document = buildRecord(user, payload);

  if (useMemoryStore) {
    const index = memoryAttendance.findIndex(
      (item) =>
        String(item.userId) === String(document.userId) &&
        item.date === document.date &&
        item.session === document.session
    );
    const saved = {
      ...document,
      updatedAt: new Date().toISOString(),
    };
    if (index >= 0) {
      memoryAttendance[index] = { ...memoryAttendance[index], ...saved };
      return memoryAttendance[index];
    }
    saved._id = `att_${Date.now()}`;
    saved.createdAt = new Date().toISOString();
    memoryAttendance.push(saved);
    return saved;
  }

  return Attendance.findOneAndUpdate(
    { userId: document.userId, date: document.date, session: document.session },
    { $set: document },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

const summarizeAttendance = (rows) => ({
  total: rows.length,
  present: rows.filter((row) => row.status === "present").length,
  absent: rows.filter((row) => row.status === "absent").length,
  late: rows.filter((row) => row.status === "late").length,
});

const ensureAttendanceCollection = async () => {
  if (useMemoryStore) return;

  await Attendance.createCollection();
  const count = await Attendance.countDocuments();
  if (count > 0) return;

  const users = await listUsers();
  const user = users[0];
  if (!user) return;

  await Attendance.create({
    userId: user._id,
    fullName: user.fullName,
    email: user.email,
    program: user.program,
    date: today(),
    session: "class",
    status: "present",
    notes: "Demo attendance",
  });
  console.log("Default attendances collection seeded");
};

module.exports = {
  enableMemoryStore,
  listAttendance,
  markAttendance,
  summarizeAttendance,
  ensureAttendanceCollection,
};
