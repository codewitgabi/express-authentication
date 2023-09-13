/*
 * Imports
 **/

const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

/*
 * Controllers
 **/

const homepage = (req, res) => {
  res.render("home", { user: req.user, layout: "base" });
};


const signup = (req, res) => {
  /*
   * Renders the signup view.
   **/

  console.log(req.user);

  let context = {
    layout: "base",
    title: "Auth | Signup",
  };
  res.render("signup", context)
};


const registerUser = async (req, res) => {
  /*
   * Post request handler for signup page.
   * Create user instance with req.body
   **/

  const { username, email, password } = req.body;

  if (password.length < 10) {
    req.flash("error", "Password must be a minimum of 10 characters");
    return res.redirect("/signup");
  }

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username, email, password: hashedPassword
      });

      req.flash("success", `Account for ${username} created successfully`);
      return res.redirect("/signin");
    } else {
      req.flash("error", "User with email already exists");
      return res.redirect("/signup");
    }
  } catch (error) {
    req.flash("error", "An error occured");
    return res.redirect("/signup");
  }
};


const login = (req, res) => {
  /*
   * Login user with username and password
   **/

  let context = {
    layout: "base",
    title: "Auth | Signin"
  };
  res.render("signin", context);
};


const initializePassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).exec()

      if (!user) {
        return done(null, false, { message: "User with provided email does not exist" });
      } else {
        try {
          if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Password is incorrect" });
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    } catch (err) {
      return done(err);
    }
  }

  passport.use(new LocalStrategy(
    { usernameField: "email" },
    authenticateUser
  ))

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      done(null, await User.findById(id).exec());
    } catch (err) {
      done(null, err);
    }
  });
};


const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err) }
    res.redirect("/");
  })
};


module.exports = {
  homepage,
  signup,
  registerUser,
  login,
  initializePassport,
  logoutUser
};

