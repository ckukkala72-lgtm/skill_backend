const { getPublishedJobReadyPage } = require("../services/jobReadyService");

const getJobReadyPage = async (_req, res) => {
  try {
    const page = await getPublishedJobReadyPage();

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Job ready content not found",
      });
    }

    const steps = [...page.steps].sort((a, b) => a.order - b.order);
    const included = [...page.included].sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      data: {
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        steps,
        includedTitle: page.includedTitle,
        included,
        disclaimer: page.disclaimer,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load job ready content",
      error: error.message,
    });
  }
};

module.exports = { getJobReadyPage };
