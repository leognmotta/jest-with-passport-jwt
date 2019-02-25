exports.getPrivateRoute = async (req, res, next) => {
  return res.status(200).json({ user: req.user });
};
