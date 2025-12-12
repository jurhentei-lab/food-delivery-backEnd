const User = require("../models/User");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.makeAdmin = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { role: "ADMIN" },
    { new: true }
  );
  res.json(updated);
};

exports.blockUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { isBlocked: true },
    { new: true }
  );
  res.json(updated);
};
