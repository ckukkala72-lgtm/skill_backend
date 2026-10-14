const { getPublishedRoadmap } = require("../services/roadmapService");

const getRoadmap = async (_req, res) => {
  try {
    const roadmap = await getPublishedRoadmap();

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap content not found",
      });
    }

    const tracks = [...roadmap.tracks].sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      data: {
        eyebrow: roadmap.eyebrow,
        title: roadmap.title,
        description: roadmap.description,
        tracks,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load roadmap",
      error: error.message,
    });
  }
};

module.exports = { getRoadmap };
