const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router.js");
const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;
const db = require("../Database/index");
let app = new express();
// add bodyParser
app.use(bodyParser.json());

// configure the Bearer strategy for use by Passport.
passport.use(
  new Strategy(function(token, cb) {
    db.findUserByToken(token, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (user.length === 0) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

//activate the router
app.use("/pirates", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.error(`Server listening on port ${PORT}`);
});
