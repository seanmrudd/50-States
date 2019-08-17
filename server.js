const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require('cookie-session');
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

const app = express();
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Road_Trip", { useNewUrlParser: true });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.use(routes);

app.listen(PORT, function() {
  console.log(`Server now listening on PORT ${PORT}!`);
});

module.exports = app;