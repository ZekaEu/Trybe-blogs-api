const { User } = require('../models');

const findLogin = async (email) => {
  const found = await User.findOne(({ where: { email } }));
  if (!found) return false;
  return found;
};

module.exports = findLogin;
