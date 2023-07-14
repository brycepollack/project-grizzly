require("dotenv").config();
const express = require("express");
const colors = require("colors");
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

//require("./config/passport")(passport);

// Connect to database
connectDB();

// Handlebars: might wanna move this to client
// app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
// app.set("view engine", ".hbs");

// Sessions
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//   })
// );

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

// app.use(function (req, res, next) {
//   res.locals.user = req.user || null;
//   next();
// });
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:3000",
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
