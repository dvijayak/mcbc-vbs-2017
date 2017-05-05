var express = require('express');
var router = express.Router();
var path = require('path');

// Serve the angular-based login page
router.use(express.static(path.join(__dirname, '../ui-login/dist')));

module.exports = router;
