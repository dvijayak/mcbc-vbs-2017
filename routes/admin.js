var express = require('express');
var router = express.Router();
var path = require('path');

// TODO: Add login authentication first
router.use(function(req, res, next)
{
   console.log("TODO - add login");
   next();
})


// Serve the angular-based admin SPA (single-page application)
router.use(express.static(path.join(__dirname, '../ui/dist')));

module.exports = router;
