var express = require('express');
var router = express.Router();
var path = require('path');

// First check if we are logged in, if not, redirect to /login
router.use(function(req, res, next)
{
   if (req.isAuthenticated())
      return next();

   res.redirect('/login');
})


// Serve the angular-based admin SPA (single-page application)
router.use(express.static(path.join(__dirname, '../ui/dist')));

module.exports = router;
