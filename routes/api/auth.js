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

var ApiHelper = require('./helper');
var Status = ApiHelper.helper.Status;
module.exports = function (req, res, next) {
   [req, res] = ApiHelper.inject(req, res);

   passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }

      // Authentication failed if user was not set
      if (!user) {
         return res.respond(Status.unauthorized, {
            redirectUrl: "/login"
         })
      }

      // Otherwise, authentication succeeded...
      req.logIn(user, function (err) {
         if (err) { return next(err); }

         return res.respond(Status.ok, {
            redirectUrl: "/admin"
         });
      });
   })(req, res, next);
};