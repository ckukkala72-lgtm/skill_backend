const { getPublishedAboutPage } = require("../services/aboutService");

const getAboutPage = async (_req, res) => {
  try {
    const page = await getPublishedAboutPage();

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "About content not found",
      });
    }

    const highlights = [...page.highlights].sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      data: {
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        storyTitle: page.storyTitle,
        story: page.story,
        quote: page.quote,
        cta: page.cta,
        highlights,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load about content",
      error: error.message,
    });
  }
};

module.exports = { getAboutPage };
