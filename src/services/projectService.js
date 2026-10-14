const ProjectPage = require("../models/ProjectPage");
const { defaultProjectPage } = require("../seed/projectDefaults");

let useMemoryStore = false;
let memoryProjectPage = { ...defaultProjectPage };

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryProjectPage = { ...defaultProjectPage };
};

const getPublishedProjectPage = async () => {
  if (useMemoryStore) {
    return memoryProjectPage;
  }

  return ProjectPage.findOne({ isPublished: true }).lean();
};

const ensureDefaultProjectPage = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await ProjectPage.findOne().lean();
  if (!existing) {
    await ProjectPage.create(defaultProjectPage);
    console.log("Default projects created");
    return;
  }

  if (
    !existing.groups?.length ||
    existing.contentVersion !== defaultProjectPage.contentVersion
  ) {
    await ProjectPage.updateOne(
      { _id: existing._id },
      {
        $set: {
          contentVersion: defaultProjectPage.contentVersion,
          eyebrow: defaultProjectPage.eyebrow,
          title: defaultProjectPage.title,
          description: defaultProjectPage.description,
          groups: defaultProjectPage.groups,
          cta: defaultProjectPage.cta,
          isPublished: true,
        },
      }
    );
    console.log("Projects content updated");
  }
};

module.exports = {
  enableMemoryStore,
  getPublishedProjectPage,
  ensureDefaultProjectPage,
};
