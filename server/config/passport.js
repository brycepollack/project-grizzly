const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");
const Folder = require("../models/Folder");

const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
      const newUser = {
        authId: profile.id,
        password: hashedPassword,
        displayName: profile.displayName,
        image: profile.photos[0].value
      };
      try {
        let user = await User.findOne({ authId: profile.id });
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

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
      const newUser = {
        authId: profile.id,
        password: hashedPassword,
        displayName: profile.displayName,
        image: profile.photos[0].value
      };
      try {
        let user = await User.findOne({ authId: profile.id });
        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);

          // CREATE HOME FOLDER AND LINK ON CREATION
          // const homeFolder = {
          //   name: "home",
          //   userId: user._id,
          //   subfolders: [],
          //   notes: []
          // }
          // await Folder.create(homeFolder);
          // findOneAndUpdate?
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
      // done(null, profile);
    }
  )
);

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      let user = await User.findOne({ authId: username });
      if (!user) return done(null, false);
      let result = await bcrypt.compare(password, user.password);
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
        
      }
  )
)

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

module.exports = {
  passport: passport,
};
