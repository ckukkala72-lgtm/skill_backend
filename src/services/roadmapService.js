const Roadmap = require("../models/Roadmap");
const { defaultRoadmap } = require("../seed/roadmapDefaults");

let useMemoryStore = false;
let memoryRoadmap = { ...defaultRoadmap };

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryRoadmap = { ...defaultRoadmap };
};

const getPublishedRoadmap = async () => {
  if (useMemoryStore) {
    return memoryRoadmap;
  }

  return Roadmap.findOne({ isPublished: true }).lean();
};

const ensureDefaultRoadmap = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await Roadmap.findOne().lean();
  if (!existing) {
    await Roadmap.create(defaultRoadmap);
    console.log("Default roadmap created");
    return;
  }

  if (
    !existing.tracks?.[0]?.stages?.length ||
    existing.contentVersion !== defaultRoadmap.contentVersion
  ) {
    await Roadmap.updateOne(
      { _id: existing._id },
      {
        $set: {
          contentVersion: defaultRoadmap.contentVersion,
          eyebrow: defaultRoadmap.eyebrow,
          title: defaultRoadmap.title,
          description: defaultRoadmap.description,
          tracks: defaultRoadmap.tracks,
          isPublished: true,
        },
      }
    );
    console.log("Roadmap content updated");
  }
};

module.exports = {
  enableMemoryStore,
  getPublishedRoadmap,
  ensureDefaultRoadmap,
};
