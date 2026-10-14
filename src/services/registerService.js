const RegisterPage = require("../models/RegisterPage");
const { defaultRegisterPage } = require("../seed/registerDefaults");
const userService = require("./userService");

let useMemoryStore = false;
let memoryRegisterPage = { ...defaultRegisterPage };

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryRegisterPage = { ...defaultRegisterPage };
  userService.enableMemoryStore();
};

const getPublishedRegisterPage = async () => {
  if (useMemoryStore) {
    return memoryRegisterPage;
  }

  return RegisterPage.findOne({ isPublished: true }).lean();
};

const ensureDefaultRegisterPage = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await RegisterPage.findOne().lean();
  if (!existing) {
    await RegisterPage.create(defaultRegisterPage);
    console.log("Default register page created");
    return;
  }

  if (existing.contentVersion !== defaultRegisterPage.contentVersion) {
    await RegisterPage.updateOne(
      { _id: existing._id },
      { $set: { ...defaultRegisterPage } }
    );
    console.log("Register content updated");
  }
};

const createRegistration = async (payload) => {
  return userService.createUser(payload);
};

module.exports = {
  enableMemoryStore,
  getPublishedRegisterPage,
  ensureDefaultRegisterPage,
  createRegistration,
};
