const {
  getPublishedRegisterPage,
  createRegistration,
} = require("../services/registerService");

const getRegisterPage = async (_req, res) => {
  try {
    const page = await getPublishedRegisterPage();

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Register content not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        learnerStep: page.learnerStep,
        programStep: page.programStep,
        form: page.form,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load register content",
      error: error.message,
    });
  }
};

const postRegistration = async (req, res) => {
  try {
    const registration = await createRegistration(req.body);
    return res.status(201).json({
      success: true,
      message: "Registration received",
      data: registration,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to submit registration",
    });
  }
};

module.exports = { getRegisterPage, postRegistration };
