module.exports = function(app, user) {
  app.get("/config", function(req, res) {
    if (!req.session.username) return res.redirect("/login");

    res.render("config", {
      user: {
        username: req.session.username,
        token: req.session.token,
        pp: req.session.pp
      }
    });
  });

  app.post("/config", function(req, res) {
    console.log("cc");
    let username = req.body.user.username;
    let pp = req.body.user.pp;
    console.log(username);

    user.findOne({ token: req.session.token }).exec(function(err, new_profil) {
      user.find({ username: username }).exec(function(err, doc) {
    
        if (doc[0] && doc[0].username == req.session.username) {
           
          new_profil.pp = pp;
          new_profil.save();
          req.session.username = username;
          req.session.pp = pp;
          res.redirect("/");
         
        } else {
          if (doc[0] && doc[0].username != req.session.username) {
            res.send("Un compte existe déjà avec ce pseudo");
          }
          else {
          new_profil.username = username;
          new_profil.pp = pp;
          new_profil.save();
          req.session.username = username;
          req.session.pp = pp;
          res.redirect("/");
         
            
          }
            
        }
      });
    });
  });
};
