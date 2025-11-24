// backend/middleware/auth.js
module.exports = (req, res, next) => {
  req.user = { id: 1 }; // simulate logged-in user
  next();
};
