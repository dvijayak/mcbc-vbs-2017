const express = require('express');
const router = express.Router();
const path = require('path');

var Status = require('./helper').helper.Status;

// TODO !!!
router.get('*', function (req, res) {
   res.respond(Status.ok, { submissions: [{first_name: "Daniel", last_name: "Vijayakumar"}], headers: { first_name: "First Name", last_name: "Last Name"} });
});

module.exports = router;