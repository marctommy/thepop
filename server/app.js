// require("dotenv").config();
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const express = require("express");
// const logger = require("morgan");
// const mongoose = require("mongoose");
// const MongoStore = require("connect-mongo");
// const passport = require("passport");
// const path = require("path");
// const session = require("express-session");
// const app = express();

// require("./configs/passport.js");
// const server = require("./configs/socketio")(app);

// const port = process.env.PORT;

// mongoose
//   .connect(process.env.MONGO_CONNECT || "mongodb://localhost/lads", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((x) => {
//     console.log(
//       `Connected to Mongo! Database name: "${x.connections[0].name}"`
//     );
//   })
//   .catch((err) => {
//     console.error("Error connecting to mongo", err);
//   });

// app.use(cors());

// const url = "mongodb://localhost/lads" || process.env.MONGO_URI;
// let store = new MongoStore({
//   mongoUrl: url,
//   collection: "sessions",
// });

// app.use(
//   session({
//     secret: "javascipt is fun",
//     resave: false,
//     store: store,
//     saveUninitialized: false,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// const app_name = require("./package.json").name;

// // Middleware Setup
// app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "frontend/build")));

// // default value for title local
// app.locals.title = "Express - Generated with IronGenerator";

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();
const server = require("./configs/socketio")(app);
require("./configs/passport");

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);

const url = process.env.MONGO_URI;
let store = new MongoStore({
  mongoUrl: url,
  collection: "sessions",
});

app.use(
  session({
    secret: "super cat",
    resave: false,
    store: store,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const index = require("./routes/index.routes");
app.use("/api", index);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const activitiesRoutes = require("./routes/activities.routes");
app.use("/api/activities", activitiesRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/user", userRoutes);

const chatRoutes = require("./routes/chat.routes");
app.use("/chat", chatRoutes);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log("listening on ", port));
module.exports = app;
