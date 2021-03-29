require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3050;
const session = require("express-session");
const passport = require("passport");
const discordStratagy = require("./api/discordStratagy");
const db = require("./db/mongo");

app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    name: "discord-auth",
  })
);

//create passport
app.use(passport.initialize());
app.use(passport.session());

//routes
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");
app.use("/auth", authRoute);
app.use("/", homeRoute);

app.listen(PORT, () => {
  console.log("====\nServer Up...\n====");
});
