const JobReadyPage = require("../models/JobReadyPage");
const { defaultJobReadyPage } = require("../seed/jobReadyDefaults");

let useMemoryStore = false;
let memoryJobReadyPage = { ...defaultJobReadyPage };

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryJobReadyPage = { ...defaultJobReadyPage };
};

const getPublishedJobReadyPage = async () => {
  if (useMemoryStore) {
    return memoryJobReadyPage;
  }

  return JobReadyPage.findOne({ isPublished: true }).lean();
};

const ensureDefaultJobReadyPage = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await JobReadyPage.findOne().lean();
  if (!existing) {
    await JobReadyPage.create(defaultJobReadyPage);
    console.log("Default job ready page created");
    return;
  }

  if (
    !existing.steps?.length ||
    existing.contentVersion !== defaultJobReadyPage.contentVersion
  ) {
    await JobReadyPage.updateOne(
      { _id: existing._id },
      {
        $set: {
          contentVersion: defaultJobReadyPage.contentVersion,
          eyebrow: defaultJobReadyPage.eyebrow,
          title: defaultJobReadyPage.title,
          description: defaultJobReadyPage.description,
          steps: defaultJobReadyPage.steps,
          includedTitle: defaultJobReadyPage.includedTitle,
          included: defaultJobReadyPage.included,
          disclaimer: defaultJobReadyPage.disclaimer,
          isPublished: true,
        },
      }
    );
    console.log("Job ready content updated");
  }
};

module.exports = {
  enableMemoryStore,
  getPublishedJobReadyPage,
  ensureDefaultJobReadyPage,
};
