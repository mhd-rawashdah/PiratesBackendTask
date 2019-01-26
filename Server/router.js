const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../Database/index");
const helpers = require("../Server/helperFunctions");

// route to get all pirates
router.route("/").get((req, res) => {
  db.selectAllPirates((err, result) => {
    if (!err) {
      res.send(result);
    }
  });
});

// route to get number of pirates faces
router.route("/countPirates")
  .get(passport.authenticate("bearer", { session: false }), (req, res) => {
    // call getPiratesFacesFromApi from helper functions to retreive the array of faces
    helpers.getPiratesFacesFromApi((err, data) => {
      // call catchPiratesFaces function to compute how many faces depend on specific attribute
      // that return number of faces and saved in numberOfFaces
      let numberOfFaces = helpers.catchPiratesFaces(data);
      res.send({ piratesFound: numberOfFaces });
    });
  });

module.exports = router;
