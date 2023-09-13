function login_required(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/signin");
  }

  next();
}


function noauth_required(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  next();
}


module.exports = {
  login_required,
  noauth_required
};

