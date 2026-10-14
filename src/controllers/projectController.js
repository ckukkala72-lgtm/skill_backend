const { getPublishedProjectPage } = require("../services/projectService");

const getProjectPage = async (_req, res) => {
  try {
    const page = await getPublishedProjectPage();

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Projects content not found",
      });
    }

    const groups = [...page.groups].sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      data: {
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        groups,
        cta: page.cta,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load projects",
      error: error.message,
    });
  }
};

module.exports = { getProjectPage };
