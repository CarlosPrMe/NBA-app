require("dotenv").config();
var express = require("express");
var app = express();
var cors = require("cors");
var routerUsers = require("./routers/userRouter");
var routerTeams = require("./routers/teamRouter");
var routerFavFive = require("./routers/fav_fiveRouter");
var mongoose = require("mongoose");
var db = mongoose.connection;
var uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_URI}`;

var onReady = function (params) {
  app.listen(3001, function () {
    console.log("Escuchando en puerto 3001");
  });
  app.use(cors());
  app.use(routerUsers);
  app.use(routerTeams);
  app.use(routerFavFive);
};

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  onReady
);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("conectados a la base de datos");
});
