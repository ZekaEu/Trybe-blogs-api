const checkName = (req, res, next) => {
  try {
    const { displayName } = req.body;
    if (displayName.length < 8) {
      return res.status(400).json(
        { message: '"displayName" length must be at least 8 characters long' },
      );
    }
    next();
  } catch (e) {
    next(e);
  }
};

const checkEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: '"email" is required' });
    const checkerRegex = /.+@.+\.com/i;
    if (!checkerRegex.test(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const checkPassword = (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: '"password" is required' });
    if (password.length !== 6) {
      return res.status(400).json({ message: '"password" length must be 6 characters long' });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  checkName,
  checkEmail,
  checkPassword,
};
