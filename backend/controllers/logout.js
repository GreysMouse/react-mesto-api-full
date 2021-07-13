const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Logged out' });
};

module.exports = { logout };
