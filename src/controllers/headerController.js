const { getPublishedHeader } = require("../services/headerService");

const getHeader = async (_req, res) => {
  try {
    const header = await getPublishedHeader();

    if (!header) {
      return res.status(404).json({
        success: false,
        message: "Header content not found",
      });
    }

    const navItems = [...header.navItems].sort((a, b) => a.order - b.order);

    return res.status(200).json({
      success: true,
      data: { ...header, navItems },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load header",
      error: error.message,
    });
  }
};

module.exports = { getHeader };
