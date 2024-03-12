const data = require("../data");
const User = require("../models/user.model");
const seedUser = async (req, res, next) => {
  try {
    // Delete all user
    await User.deleteMany({});

    // Create user
    const user = await User.insertMany(data.users);

    // success
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = seedUser;
