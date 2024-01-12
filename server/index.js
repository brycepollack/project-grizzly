require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const port = process.env.PORT || 8080;
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./config/passport");
const app = express();
const { authRoutes } = require("./routes/auth");
const isDev = require("./config/isDev");
const ORIGIN_URL = isDev ? "http://localhost:3000" : "https://project-grizzly.pages.dev";
console.log("Origin: " + ORIGIN_URL);

// Connect to database
connectDB();

app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  next();
});

app.use(
  cors({
    origin: ORIGIN_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.use("/auth", authRoutes);

app.enable("trust proxy");

app.listen(port, console.log(`Server running on port ${port}`));
