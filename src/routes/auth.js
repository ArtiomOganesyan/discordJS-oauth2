const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "forbidden",
    successRedirect: "/",
  })
);
router.get("/forbidden", (req, res) => {
  res.status(400).json({
    msg: "Something went wrong",
  });
});
router.get("/logout", (req, res) => {
  if (req.user) {
    req.logOut();
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
