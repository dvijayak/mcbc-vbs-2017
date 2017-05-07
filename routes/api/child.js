const express = require('express');
const router = express.Router();
const path = require('path');

const Status = require('./helper').helper.Status;
const ChildModel = require('../../models/child');

// Create: one
router.put('/', function (req, res, next) {
   // TODO
   res.respond(Status.ok);
});

// Read: all
router.get('/', function (req, res, next) {
   ChildModel.model.find()
        .then(children => res.respond(Status.ok, { submissions: children.map(doc => req.query.pretty ? doc.toJSON() : doc.toObject()), headers: ChildModel.propertyNames }))
        .catch(err => next(err));
});

module.exports = router;