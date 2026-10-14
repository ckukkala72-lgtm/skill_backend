const Header = require("../models/Header");
const { defaultHeader } = require("../seed/headerDefaults");

let useMemoryStore = false;
let memoryHeader = { ...defaultHeader };

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryHeader = { ...defaultHeader };
};

const isMemoryStore = () => useMemoryStore;

const getPublishedHeader = async () => {
  if (useMemoryStore) {
    return memoryHeader;
  }

  return Header.findOne({ isPublished: true }).lean();
};

const ensureDefaultHeader = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await Header.findOne();
  if (!existing) {
    await Header.create(defaultHeader);
    console.log("Default header created");
  }
};

module.exports = {
  enableMemoryStore,
  isMemoryStore,
  getPublishedHeader,
  ensureDefaultHeader,
};
