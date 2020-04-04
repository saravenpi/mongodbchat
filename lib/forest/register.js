const sha512 = require("js-sha512").sha512;

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = function(app, user) {
  app.get("/register", function(req, res) {
    res.render("register");
  });
  app.post("/register", function(req, res) {
    let username = req.body.user.username,
      password = req.body.user.password;

    user.find({ username: username }).exec(function(err, doc) {
      if (doc[0]) {
        res.send("Un compte existe déjà avec ce pseudo");
      } else {
        const doggy = new user({
          username: username,
          password: sha512(password),
          pp: "https://i.stack.imgur.com/34AD2.jpg",
          token: makeid(120)
        });
        doggy.save().then(console.log("wouf"));

           res.redirect("/login");
      }
    });
  });
};
