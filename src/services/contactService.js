const ContactPage = require("../models/ContactPage");
const Enquiry = require("../models/Enquiry");
const { defaultContactPage } = require("../seed/contactDefaults");

let useMemoryStore = false;
let memoryContactPage = { ...defaultContactPage };
let memoryEnquiries = [];

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryContactPage = { ...defaultContactPage };
  memoryEnquiries = [];
};

const getPublishedContactPage = async () => {
  if (useMemoryStore) {
    return memoryContactPage;
  }

  return ContactPage.findOne({ isPublished: true }).lean();
};

const ensureDefaultContactPage = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await ContactPage.findOne().lean();
  if (!existing) {
    await ContactPage.create(defaultContactPage);
    console.log("Default contact page created");
    return;
  }

  if (existing.contentVersion !== defaultContactPage.contentVersion) {
    await ContactPage.updateOne(
      { _id: existing._id },
      {
        $set: {
          ...defaultContactPage,
        },
      }
    );
    console.log("Contact content updated");
  }
};

const createEnquiry = async (payload) => {
  const enquiry = {
    name: payload.name?.trim(),
    phone: payload.phone?.trim(),
    email: payload.email?.trim(),
    course: payload.course?.trim() || "",
    learnerType: payload.learnerType?.trim() || "",
    message: payload.message?.trim() || "",
  };

  if (!enquiry.name || !enquiry.phone || !enquiry.email) {
    const error = new Error("Name, phone and email are required");
    error.status = 400;
    throw error;
  }

  if (useMemoryStore) {
    const saved = { ...enquiry, createdAt: new Date().toISOString() };
    memoryEnquiries.push(saved);
    return saved;
  }

  return Enquiry.create(enquiry);
};

module.exports = {
  enableMemoryStore,
  getPublishedContactPage,
  ensureDefaultContactPage,
  createEnquiry,
};
