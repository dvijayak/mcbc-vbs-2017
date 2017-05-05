var express = require('express');
var router = express.Router();
var path = require('path');

// Serve the angular-based login page
router.use(express.static(path.join(__dirname, '../ui-login/dist')));

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const ERROR = new Error('Failed to authenticate.');

passport.use(new LocalStrategy(
   function(username, password, done) {
      if (!username || !password)
         return done(ERROR);

      // TODO: Store creds in the DB
      const USER = 'admin';
      const PASS = 'password';
      if (username !== USER || password !== PASS)
         return done(null, false, { message: 'Failed to authenticate.' });        

      return done(null, username);
   }
));

passport.serializeUser(function(username, done) {
   done(null, username);
});

passport.deserializeUser(function(username, done) {
   done(null, username);
});

router.post('/', passport.authenticate('local', {
   successRedirect: '/admin'
   , failureRedirect: '/login'
   , failureFlash: 'true'
}));


module.exports = router;
