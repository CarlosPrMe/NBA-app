const express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
jsonParser = bodyParser.json();

class FavFiveRouter {
  static async addFavFive(req, res) {
      let add = req.body
      let id = req.body.id

  }
}

router.patch("/add-favorite-player", jsonParser, FavFiveRouter.addFavFive);

module.exports = router;
