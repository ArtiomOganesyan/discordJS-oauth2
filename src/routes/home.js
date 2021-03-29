const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/isAuth");

router.get("/", (req, res) => {
  if (req.user) {
    res.json({ user: req.user, session: req.session });
  } else {
    res.json({ msg: "no user" });
  }
});

router.get("/profile", isAuthenticated, (req, res) => {
  res.json({ show: "Profile" });
});

module.exports = router;
