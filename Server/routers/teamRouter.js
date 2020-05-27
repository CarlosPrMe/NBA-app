const express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const TeamModel = require("../models/team_model");
jsonParser = bodyParser.json();

class TeamRouter {
  static async getTeams(req, res) {
    await TeamModel.find((err, docs) => {
      docs ? res.status(200).send(docs) : res.status(400);
    });
  }

  static async getTeamById(req, res) {
    let id = +req.params.id_team;
    let team = await TeamModel.findOne({ id_team: id });
    team.id ? res.status(200).send(team) : res.status(400);
  }

  static async getTeamByName(req, res) {
    let team = req.body.team_name;
    let foundTeam = await TeamModel.find({ full_name: new RegExp(`${team}`, 'gi') });
    foundTeam ? res.status(200).send(foundTeam) : res.status(400)
  }

  static async addTeam(req, res) {
    let team = req.body;
    let newTeam = await new TeamModel(team).save();
    newTeam.id ? res.status(200).send(newTeam) : res.status(400);
  }

  static async getTeamImagesByIds(req, res) {
    let teams = req.body;
    let images = [];
    let teamsFound = await TeamModel.find({
      id_team: { $in: teams },
    });
    teamsFound.forEach((team) => {
      let teamData = {};
      teamData.image_url = team.image_url;
      teamData.id_team = team.id_team;
      teamData._id = team._id;
      teamData.team_color = team.team_color;
      teamData.full_name = team.full_name;
      images.push(teamData);
    });
    res.status(200).send(images);
  }
}

router.get("/teams", TeamRouter.getTeams);
router.get("/team/:id_team", TeamRouter.getTeamById);
router.post("/team-image", jsonParser, TeamRouter.getTeamImagesByIds);
router.post("/team-name", jsonParser, TeamRouter.getTeamByName);
router.post("/team-add", jsonParser, TeamRouter.addTeam);
module.exports = router;
