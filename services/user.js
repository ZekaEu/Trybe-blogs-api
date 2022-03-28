const { User } = require('../models');

const create = async (userData) => {
  const { email } = userData;
  const emailCheck = await User.findOne({ where: { email } });
  if (emailCheck) return false;
  const created = await User.create(userData);
  return created;
};

module.exports = {
  create,
};
