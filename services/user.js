const { User } = require('../models');

const create = async (userData) => {
  const { email } = userData;
  const emailCheck = await User.findOne({ where: { email } });
  if (emailCheck) return false;
  const created = await User.create(userData);
  return created;
};

const getAll = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  return result;
};

const getById = async (id) => {
  const gotUser = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!gotUser) return false;
  return gotUser;
};

const obliterate = async (email) => {
  const deleted = await User.destroy({ where: { email } });
  return deleted;
};

module.exports = {
  create,
  getAll,
  getById,
  obliterate,
};
