var express = require('express');
var router = express.Router();
var path = require('path');

var ApiHelper = require('./helper');

// We must always be logged in prior to having access to APIs
router.use(function(req, res, next)
{
   if (req.isAuthenticated())
      return next();

   res.redirect('/login');
})


// Inject helpers to the appropriate express objects
router.use((req, res, next) => {
   res.respond = ApiHelper.respond; // a helper to normalize responses to API requests

   next();
});

module.exports = router;