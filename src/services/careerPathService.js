const CareerPath = require("../models/CareerPath");
const { defaultCareerSection } = require("../seed/careerPathDefaults");

let useMemoryStore = false;
let memoryCareerSection = { ...defaultCareerSection };

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryCareerSection = { ...defaultCareerSection };
};

const getPublishedCareerPaths = async () => {
  if (useMemoryStore) {
    return memoryCareerSection;
  }

  return CareerPath.findOne({ isPublished: true }).lean();
};

const ensureDefaultCareerPaths = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await CareerPath.findOne().lean();
  if (!existing) {
    await CareerPath.create(defaultCareerSection);
    console.log("Default career paths created");
    return;
  }

  if (
    !existing.programs?.[0]?.modules ||
    existing.contentVersion !== defaultCareerSection.contentVersion
  ) {
    await CareerPath.updateOne(
      { _id: existing._id },
      {
        $set: {
          contentVersion: defaultCareerSection.contentVersion,
          eyebrow: defaultCareerSection.eyebrow,
          title: defaultCareerSection.title,
          programs: defaultCareerSection.programs,
          isPublished: true,
        },
      }
    );
    console.log("Career paths updated");
  }
};

module.exports = {
  enableMemoryStore,
  getPublishedCareerPaths,
  ensureDefaultCareerPaths,
};
