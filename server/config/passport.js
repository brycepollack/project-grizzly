const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log("profile: " + JSON.stringify(profile));
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        image: profile.photos[0].value
      };
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
      // done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  // process.nextTick(function () {
  //   return cb(null, {
  //     id: user.id,
  //     username: user.username,
  //     picture: user.picture,
  //   });
  // });
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // process.nextTick(function () {
  //   return cb(null, user);
  // });
  done(null, user);
});
