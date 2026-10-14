const { listUsers, getUserById } = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const [allUsers, users] = await Promise.all([
      listUsers(),
      listUsers({
        learnerType: req.query.learnerType,
        program: req.query.program,
        q: req.query.q,
      }),
    ]);

    const students = allUsers.filter((user) => user.learnerType === "student").length;
    const professionals = allUsers.filter(
      (user) => user.learnerType === "professional"
    ).length;
    const programs = [
      ...new Set(allUsers.map((user) => user.program).filter(Boolean)),
    ].sort();

    return res.status(200).json({
      success: true,
      data: {
        users,
        programs,
        stats: {
          total: allUsers.length,
          students,
          professionals,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load users",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load user",
      error: error.message,
    });
  }
};

module.exports = { getUsers, getUser };
