const passport = require("passport");
const router = require("express").Router();

const CLIENT_URL = "http://localhost:3000";

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/login/success", (req, res) => {
  // console.log(req);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      //   cookies: req.cookies
    });
    
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL + "/login");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// i changed the callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL + "/notes",
    failureRedirect: "/login/failed",
  })
);

module.exports = {
  authRoutes: router,
};
