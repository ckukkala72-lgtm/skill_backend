const Payment = require("../models/Payment");
const { getUserById, listUsers } = require("./userService");

let useMemoryStore = false;
let memoryPayments = [];

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryPayments = [];
};

const requireUser = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
};

const snapshotFromUser = (user, payload) => ({
  userId: user._id,
  fullName: user.fullName,
  email: user.email,
  program: payload.program?.trim() || user.program || "",
  amount: Number(payload.amount),
  currency: payload.currency?.trim() || "INR",
  method: payload.method || "upi",
  status: payload.status || "pending",
  paidAt: payload.paidAt
    ? new Date(payload.paidAt)
    : payload.status === "paid"
      ? new Date()
      : null,
  reference: payload.reference?.trim() || "",
  notes: payload.notes?.trim() || "",
});

const validatePayment = (payload) => {
  if (Number.isNaN(Number(payload.amount)) || Number(payload.amount) < 0) {
    const error = new Error("A valid amount is required");
    error.status = 400;
    throw error;
  }
};

const listPayments = async ({ status, method, q } = {}) => {
  const matches = (payment) => {
    if (status && payment.status !== status) return false;
    if (method && payment.method !== method) return false;
    if (q) {
      const haystack = `${payment.fullName} ${payment.email} ${payment.reference}`.toLowerCase();
      if (!haystack.includes(q.toLowerCase())) return false;
    }
    return true;
  };

  if (useMemoryStore) {
    return [...memoryPayments].filter(matches).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  const filter = {};
  if (status) filter.status = status;
  if (method) filter.method = method;
  if (q) {
    filter.$or = [
      { fullName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { reference: { $regex: q, $options: "i" } },
    ];
  }

  return Payment.find(filter).sort({ createdAt: -1 }).lean();
};

const createPayment = async (payload) => {
  validatePayment(payload);
  const user = await requireUser(payload.userId);
  const document = snapshotFromUser(user, payload);

  if (useMemoryStore) {
    const saved = {
      ...document,
      _id: `pay_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryPayments.push(saved);
    return saved;
  }

  return Payment.create(document);
};

const updatePayment = async (id, payload) => {
  if (useMemoryStore) {
    const index = memoryPayments.findIndex((item) => item._id === id);
    if (index < 0) return null;
    memoryPayments[index] = {
      ...memoryPayments[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    return memoryPayments[index];
  }

  return Payment.findByIdAndUpdate(id, { $set: payload }, { new: true }).lean();
};

const summarizePayments = (payments) => {
  const paid = payments.filter((item) => item.status === "paid");
  const pending = payments.filter((item) => item.status === "pending");
  const collected = paid.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return {
    total: payments.length,
    paid: paid.length,
    pending: pending.length,
    collected,
  };
};

const ensurePaymentsCollection = async () => {
  if (useMemoryStore) return;

  await Payment.createCollection();
  const demo = await Payment.find({ reference: "SV-DEMO-001" }).sort({ createdAt: 1 });
  if (demo.length > 1) {
    await Payment.deleteMany({
      _id: { $in: demo.slice(1).map((item) => item._id) },
    });
  }
  if (demo.length > 0) return;

  const users = await listUsers();
  const user = users[0];
  if (!user) return;

  await Payment.create({
    userId: user._id,
    fullName: user.fullName,
    email: user.email,
    program: user.program,
    amount: 15000,
    currency: "INR",
    method: "upi",
    status: "paid",
    paidAt: new Date(),
    reference: "SV-DEMO-001",
    notes: "Demo fee payment",
  });
  console.log("Default payments collection seeded");
};

module.exports = {
  enableMemoryStore,
  listPayments,
  createPayment,
  updatePayment,
  summarizePayments,
  ensurePaymentsCollection,
};
