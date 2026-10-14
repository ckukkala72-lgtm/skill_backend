const {
  getPublishedContactPage,
  createEnquiry,
} = require("../services/contactService");

const getContactPage = async (_req, res) => {
  try {
    const page = await getPublishedContactPage();

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Contact content not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        eyebrow: page.eyebrow,
        title: page.title,
        description: page.description,
        phoneLabel: page.phoneLabel,
        phone: page.phone,
        phoneHref: page.phoneHref,
        emailLabel: page.emailLabel,
        email: page.email,
        emailHref: page.emailHref,
        locationLabel: page.locationLabel,
        location: page.location,
        whatsappLabel: page.whatsappLabel,
        whatsappHref: page.whatsappHref,
        formTitle: page.formTitle,
        submitLabel: page.submitLabel,
        courses: page.courses,
        learnerTypes: page.learnerTypes,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load contact content",
      error: error.message,
    });
  }
};

const postEnquiry = async (req, res) => {
  try {
    const enquiry = await createEnquiry(req.body);
    return res.status(201).json({
      success: true,
      message: "Enquiry received",
      data: enquiry,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to submit enquiry",
    });
  }
};

module.exports = { getContactPage, postEnquiry };
