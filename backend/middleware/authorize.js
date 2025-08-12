const { roles } = require("../config/roles");

function authorize(action) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === "Trader" && roles.Trader.includes(action)) {
      next();
    } else {
      res.status(403).json({ message: "permission denied" });
    }
  };
}

module.exports = authorize;
