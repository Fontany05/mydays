const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/Users');


//almacena el id en el navegador cada vez que recorre una pagina
passport.serializeUser((user, done) => {
  done(null, user.id);

});

//se hace una consulta a la bdd si ese usuario existe,devuelve los datos del usuario y se los devuelve al navegador
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
})

//autenticacion de usuario
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user) {
      return done(null, false, { message: 'usuario no encontrado'});
    }
    if(!user.comparePassword(password)) {
      return done(null, false, { message: 'contraseña incorrecta'});
    }
    return done(null, user);
  }));