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

router.post("/local", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: CLIENT_URL + "/notes",
    failureRedirect: "/login/failed",
  }, (err, user, info) => {
    if (err) throw err;
    if (!user){
      return res.status(302).json({ redirectUrl: "/login/failed" });
    }
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        //console.log(req.user);
        //res.redirect(CLIENT_URL + "/notes");
        return res.status(302).json({ redirectUrl: CLIENT_URL + "/notes" });
      });
    }
  })(req, res, next);
});

// router.post(
//   "/local",
//   passport.authenticate("local", {
//     successRedirect: CLIENT_URL + "/notes",
//     failureRedirect: "/login/failed",
//   })
// );

router.get("/google", passport.authenticate("google", { scope: ["profile"], })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL + "/notes",
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL + "/notes",
    failureRedirect: "/login/failed",
  })
);

module.exports = {
  authRoutes: router,
};
