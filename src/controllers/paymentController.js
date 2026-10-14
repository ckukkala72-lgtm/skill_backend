const {
  listPayments,
  createPayment,
  updatePayment,
  summarizePayments,
} = require("../services/paymentService");

const getPayments = async (req, res) => {
  try {
    const [allPayments, payments] = await Promise.all([
      listPayments(),
      listPayments({
        status: req.query.status,
        method: req.query.method,
        q: req.query.q,
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        payments,
        stats: summarizePayments(allPayments),
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to load payments",
    });
  }
};

const postPayment = async (req, res) => {
  try {
    const payment = await createPayment(req.body);
    return res.status(201).json({ success: true, data: payment });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to create payment",
    });
  }
};

const patchPayment = async (req, res) => {
  try {
    const payment = await updatePayment(req.params.id, req.body);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    return res.status(200).json({ success: true, data: payment });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to update payment",
    });
  }
};

module.exports = { getPayments, postPayment, patchPayment };
