const User = require('../models/User');
const { createUser } = require('../models');

exports.postSignUP = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ email: email })) {
      const error = new Error('User already registered');
      error.status = 400;
      throw error;
    }

    await createUser(name, email, password);

    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    next(error);
  }
};

exports.postSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if ((!email, !password)) {
      const error = new Error('Please fill all fields');
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email: email });
    const compare = await user.comparePassword(password);

    if (!user || !compare) {
      const error = new Error('Wrong password or email');
      error.status = 400;
      throw error;
    }

    const token = user.getToken();

    return res.status(200).json({ userId: user._id, token: token });
  } catch (error) {
    next(error);
  }
};
