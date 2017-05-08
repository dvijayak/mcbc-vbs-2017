const express = require('express');
const router = express.Router();
const path = require('path');

const ApiHelper = require('./helper');
const Status = ApiHelper.helper.Status;
const respond = ApiHelper.helper.respond;

const ChildModel = require('../../models/child');
const Child = ChildModel.model;

const MAX_CHILDREN = 130; // TODO: Get from configuration

// Update methods (PUT) don't need username/password authentication but must still only
// come from a valid source using a valid API token
router.put('*', function (req, res, next) {
   if (true) { // TODO: authenticate against API token
      [req, res] = ApiHelper.inject(req, res);
      return next();
   }

   respond.call(res, Status.unauthorized);
});

// Create: one child registration
router.put('/', function (req, res, next) {
   // We assume that the request body data is in the right format
   const doc = new Child(req.body);   

   // Check if child needs to be put in waiting list
   Child.count()
        .then(count => {
           doc.is_in_waiting_list = (count >= MAX_CHILDREN);
           return Promise.resolve(doc);
        })
        .then(doc => {
           // Attach other data that did not come from the user form
           doc.date_of_registration = new Date();
           return Promise.resolve(doc);
        })
        .then(doc => {
           console.log(`Saving child to DB:\n${doc}`);
           return doc.save();
        })
        .then(doc => {
           const message = `Successfully saved child ${doc.name}`;
           console.log(message);

           // TODO: Email parent and director about result, also letting them know about waiting list details

           res.respond(Status.ok, {is_in_waiting_list: doc.is_in_waiting_list});
        })
        .catch(err => {
           const message = `Failed to save child ${doc.name}: ${err}`;
           console.error(message);

           res.respond(Status.error, new Error(message));
        });
});

// Read: all
router.get('/', function (req, res, next) {
   const projection = {};
   if (req.query.pretty) {
      // Exclude the following fields when the object is to be prettified
      projection._id = 0;
      projection.__v = 0;
   }

   ChildModel.model.find(null, projection)
        .then(children => res.respond(Status.ok, { submissions: children.map(doc => req.query.pretty ? doc.toJSON() : doc.toObject()), headers: ChildModel.propertyNames }))
        .catch(err => next(err));
});

module.exports = router;