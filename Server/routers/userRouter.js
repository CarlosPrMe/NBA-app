var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var userModel = require("../models/user.model");

class UsersRouter {
  static async addUser(req, res) {
    let user = req.body;
    let newUser = await new userModel(user).save();
    if (newUser.id) {
      res.status(200).send(newUser);
    } else {
      res.status(400);
    }
  }

  static async getUsers(req, res) {
    let users = await userModel.find();
    res.status(200).send(users);
  }

  static async modifyUser(req, res) {
    let user = req.body;
    let id = req.params.id;
    let newUSer = await userModel.findByIdAndUpdate({ _id: id }, user);
    newUSer ? res.status(200).send(newUSer) : res.status(400);
  }

  static async deleteUSer(req, res) {
    let user = req.params.id;
    let deleted = await userModel.findByIdAndDelete(user);
    if (deleted) {
      res.status(200).send(deleted);
    } else {
      res.status(400);
    }
  }

  static async getUser(req, res){
    let user = req.body;  
    let userFound= await userModel.findOne({email: user.email, password: user.password}, (err, user)=>{

      if(user){
        res.status(200).send(user);
      }else{
        res.status(400);
      }
    });
  }
}

router.get("/users", UsersRouter.getUsers);
router.post("/user-register", jsonParser, UsersRouter.addUser);
router.post("/oauth", jsonParser, UsersRouter.getUser);
router.delete("/user/:id", UsersRouter.deleteUSer);
router.patch("user/:id", jsonParser, UsersRouter.modifyUser);

module.exports = router;
