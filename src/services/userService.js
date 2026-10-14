const User = require("../models/User");

let useMemoryStore = false;
let memoryUsers = [];

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryUsers = [];
};

const buildUserDocument = (payload) => {
  const answers = payload.answers || {};
  const email = answers.email?.trim().toLowerCase();

  return {
    learnerType: payload.learnerType?.trim(),
    program: payload.program?.trim(),
    fullName: answers.fullName?.trim(),
    gender: answers.gender?.trim() || "",
    phone: answers.phone?.trim(),
    email,
    city: answers.city?.trim() || "",
    state: answers.state?.trim() || "",
    college: answers.college?.trim() || "",
    degree: answers.degree?.trim() || "",
    branch: answers.branch?.trim() || "",
    passedOutYear: answers.passedOutYear?.trim() || "",
    currentYear: answers.currentYear?.trim() || "",
    company: answers.company?.trim() || "",
    designation: answers.designation?.trim() || "",
    experience: answers.experience?.trim() || "",
    domain: answers.domain?.trim() || "",
    qualification: answers.qualification?.trim() || "",
    skillSet: answers.skillSet?.trim() || "",
    languages: answers.languages?.trim() || "",
    tools: answers.tools?.trim() || "",
    certifications: answers.certifications?.trim() || "",
    previousProjects: answers.previousProjects?.trim() || "",
    careerTrack: answers.careerTrack?.trim() || "",
    expectedSalary: answers.expectedSalary?.trim() || "",
    jobRole: answers.jobRole?.trim() || "",
    lookingFor: answers.lookingFor?.trim() || "",
    learningMode: answers.learningMode?.trim() || "",
    availability: answers.availability?.trim() || "",
    hearAbout: answers.hearAbout?.trim() || "",
    linkedin: answers.linkedin?.trim() || "",
    github: answers.github?.trim() || "",
    resumeName: payload.resumeName || "",
    consent: Boolean(payload.consent),
    status: "registered",
    answers,
  };
};

const createUser = async (payload) => {
  const user = buildUserDocument(payload);

  if (!user.learnerType || !user.program) {
    const error = new Error("Learner type and program are required");
    error.status = 400;
    throw error;
  }

  if (!user.fullName || !user.phone || !user.email) {
    const error = new Error("Full name, phone and email are required");
    error.status = 400;
    throw error;
  }

  if (!user.consent) {
    const error = new Error("Please accept the privacy policy to continue");
    error.status = 400;
    throw error;
  }

  if (useMemoryStore) {
    const index = memoryUsers.findIndex((item) => item.email === user.email);
    const saved = { ...user, updatedAt: new Date().toISOString() };
    if (index >= 0) {
      memoryUsers[index] = { ...memoryUsers[index], ...saved };
      return memoryUsers[index];
    }
    saved.createdAt = new Date().toISOString();
    memoryUsers.push(saved);
    return saved;
  }

  return User.findOneAndUpdate(
    { email: user.email },
    { $set: user },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

const listUsers = async ({ learnerType, program, q } = {}) => {
  const matches = (user) => {
    if (learnerType && user.learnerType !== learnerType) return false;
    if (program && user.program !== program) return false;
    if (q) {
      const haystack = `${user.fullName} ${user.email} ${user.phone}`.toLowerCase();
      if (!haystack.includes(q.toLowerCase())) return false;
    }
    return true;
  };

  if (useMemoryStore) {
    return memoryUsers.filter(matches).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }

  const filter = {};
  if (learnerType) filter.learnerType = learnerType;
  if (program) filter.program = program;
  if (q) {
    filter.$or = [
      { fullName: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { phone: { $regex: q, $options: "i" } },
    ];
  }

  return User.find(filter)
    .sort({ createdAt: -1 })
    .select("-answers -__v")
    .lean();
};

const getUserById = async (id) => {
  if (useMemoryStore) {
    return memoryUsers.find((user) => user._id === id || user.email === id);
  }

  return User.findById(id).select("-answers -__v").lean();
};

module.exports = {
  enableMemoryStore,
  createUser,
  listUsers,
  getUserById,
};
