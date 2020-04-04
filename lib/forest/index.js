module.exports = function(app) {
  app.get("/", function(req, res) {
    if (!req.session.username) return res.redirect("/login");
    res.render("index", {
      user: {
        username: req.session.username,
        pp: req.session.pp,
        token: req.session.token
      }
    });
  });
};
