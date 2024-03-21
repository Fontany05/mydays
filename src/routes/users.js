const express = require("express");
const router = express.Router();

const User = require("../models/Users");

const passport = require("passport");

router.get("/users/signin", (req, res, next) => {
  res.render("users/signin");
});
 
router.post("/users/signin", passport.authenticate('local' ,{
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  passReqToCallback: true,
  failureFlash: true
}));


router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];

  if (name.length <= 0) {
    errors.push({ text: "por favor ingrese su nombre" });
  }

  if (!email && email <= 0) {
    errors.push({ text: "por favor ingrese su email" });
  }

  if (!password) {
    errors.push({ text: "por favor ingrese su contraseña" });
  }

  if (!confirm_password) {
    errors.push({ text: "por favor ingrese su contraseña" });
  }

  if (password != confirm_password) {
    errors.push({ text: "las contraseñas no son iguales" });
  }
  if (password.length < 5) {
    errors.push({ text: "la contraseña debe tener almenos 5 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    //hash clave y reemplazarla con la ingresada
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "tu usuario se ha registrado");
    res.redirect("/users/signin");
  }
});
//cierre de sesion
router.get("/users/logout", function (req, res, next) {
  req.logOut(function(err){
  if(err){
    return next(err);
  }else{
    req.session.destroy
    req.flash("success_msg", "sesion finalizada");
    res.redirect("/");
  }
  })
});

module.exports = router;
