const AboutPage = require("../models/AboutPage");
const { defaultAboutPage } = require("../seed/aboutDefaults");

let useMemoryStore = false;
let memoryAboutPage = { ...defaultAboutPage };

const enableMemoryStore = () => {
  useMemoryStore = true;
  memoryAboutPage = { ...defaultAboutPage };
};

const getPublishedAboutPage = async () => {
  if (useMemoryStore) {
    return memoryAboutPage;
  }

  return AboutPage.findOne({ isPublished: true }).lean();
};

const ensureDefaultAboutPage = async () => {
  if (useMemoryStore) {
    return;
  }

  const existing = await AboutPage.findOne().lean();
  if (!existing) {
    await AboutPage.create(defaultAboutPage);
    console.log("Default about page created");
    return;
  }

  if (
    !existing.highlights?.length ||
    existing.contentVersion !== defaultAboutPage.contentVersion
  ) {
    await AboutPage.updateOne(
      { _id: existing._id },
      {
        $set: {
          contentVersion: defaultAboutPage.contentVersion,
          eyebrow: defaultAboutPage.eyebrow,
          title: defaultAboutPage.title,
          description: defaultAboutPage.description,
          storyTitle: defaultAboutPage.storyTitle,
          story: defaultAboutPage.story,
          quote: defaultAboutPage.quote,
          cta: defaultAboutPage.cta,
          highlights: defaultAboutPage.highlights,
          isPublished: true,
        },
      }
    );
    console.log("About content updated");
  }
};

module.exports = {
  enableMemoryStore,
  getPublishedAboutPage,
  ensureDefaultAboutPage,
};
