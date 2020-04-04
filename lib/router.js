var port = process.env.PORT || 3000;

const express = require("express");
var app = express();

var http = require("http").Server(app);

const session = require("express-session");

var io = require("socket.io")(http);
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var messageSchema = new mongoose.Schema({
  author: String,
  id: String,
  pp: String,
  content: String,
  date: { type: Date, default: Date.now }
});

var message = mongoose.model("Message", messageSchema);

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  pp: String,
  token: String,
  status: Number
});

var user = mongoose.model("user", userSchema);

require("./config")(app, express, session);

require("./forest/index")(app);

require("./forest/register")(app, user);

require("./forest/login")(app, user);

require("./forest/logout")(app);

require("./forest/chat")(io, message, user);

require("./forest/config")(app,user);

require("./forest/deletemsg")(io, app,message);

http.listen(port, function() {
  console.log("Le serveur est ouvert sur le port :", port);
});
