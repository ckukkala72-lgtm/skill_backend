const { getPublishedCareerPaths } = require("../services/careerPathService");

const getCareerPaths = async (_req, res) => {
  try {
    const section = await getPublishedCareerPaths();

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Career paths not found",
      });
    }

    const programs = [...section.programs].sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      data: {
        eyebrow: section.eyebrow,
        title: section.title,
        programs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load career paths",
      error: error.message,
    });
  }
};

module.exports = { getCareerPaths };
