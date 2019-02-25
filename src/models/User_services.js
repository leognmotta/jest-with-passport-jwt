const createUser = User => (name, email, password) => {
  if ((!name, !email, !password)) {
    const error = new Error('All fields requireds');
    error.status = 400;
    throw error;
  }

  const user = new User({ name, email, password });
  return user.save();
};

const listUsers = User => () => {
  return User.find({});
};

module.exports = User => {
  return {
    createUser: createUser(User),
    listUsers: listUsers(User)
  };
};
