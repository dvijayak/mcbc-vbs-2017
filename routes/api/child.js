const express = require('express');
const router = express.Router();
const path = require('path');

const Status = require('./helper').helper.Status;
const Child = require('../../models/child').model;

// Create: one
router.put('/', function (req, res, next) {
   // TODO
   res.respond(Status.ok);
});

// Read: all
router.get('/', function (req, res, next) {
   Child.find()
        .then( children => res.respond(Status.ok, {children: children}) )
        .catch(err => next(err));
});

module.exports = router;