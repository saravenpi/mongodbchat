const sha512 = require("js-sha512").sha512;

module.exports = function(app, user) {
  
  
  
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.post("/login", function(req, res) {
    let username = req.body.user.username,
      password = req.body.user.password;

    user.find({ username: username }).exec(function(err, doc) {
      if (!doc[0]) return res.redirect("/login");
      if (doc[0].password === sha512(password)) {
        req.session.username = username;
        req.session.pp = doc[0].pp;
        req.session.token = doc[0].token;

        res.redirect("/");
      } else {
        res.redirect("/login");
      }
    });
  });
};
