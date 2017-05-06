var express = require('express');
var router = express.Router();
var path = require('path');

var ApiHelper = require('./helper');

// We must always be logged in prior to having access to APIs
router.use(function(req, res, next) {
   if (req.isAuthenticated()) {
      [req, res] = ApiHelper.inject(req, res);
      return next();
   }

   res.redirect('/login');
});

// Basic error handler
router.use(function(err, req, res, next) {
   console.error(err.message, err.stack);
   ApiHelper.helper.respond.call(res, ApiHelper.helper.Status.error, err, err.statusCode);
});

module.exports = router;