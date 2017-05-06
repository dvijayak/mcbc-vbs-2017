/// This file is used to create test data in the MongoDB store, for development testing

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Mongoose comes with mpromises by default, but we want to use ES6 native promises
mongoose.connect('mongodb://localhost:27018/vbs2017');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   console.log("We're in!");

   // Create the admin user
   const User = require('./models/user').model;
   const admin = new User({
      username: 'admin',
      password: 'password' // TODO: salty hash
   });

   // Create test children
   const Child = require('./models/child').model;
   const children = [
      new Child({
         first_name: "Alexandria",
         last_name: "Bennett",
         dob: new Date('2009-05-06'),
         grade: "3",
         shirt_size: "L",
         address: {
            street: "412 Knockers Crescent",
            city: "Mississauga",
            province: "Ontario",
            postal_code: "L4R 2Z3"
         },
         medical_info: "N/A",
         is_photo_allowed: true,
         is_photo_public_use_allowed: true,
         parent_first_name: "Brooklyn",
         parent_last_name: "Bennett",
         parent_phone: "4162540978",
         parent_email: "brooklyn.bennett@yahoo.ca",
         emergency_first_name: "Bent",
         emergency_last_name: "Galloway" ,
         emergency_relationship: "Uncle",
         emergency_phone: "6479801932",
      }),
      new Child({
         first_name: "Rose",
         last_name: "Sparks",
         dob: new Date('2007-02-28'),
         grade: "5",
         shirt_size: "M",
         address: {
            street: "1835 Bramlea Drive",
            city: "Oakville",
            province: "Ontario",
            postal_code: "S4R 1B5"
         },
         medical_info: "Allergic to peanuts",
         is_photo_allowed: true,
         is_photo_public_use_allowed: false,
         parent_first_name: "Paul",
         parent_last_name: "Bentley",
         parent_phone: "9058897920",
         parent_email: "paul.bent@outlook.com",
         emergency_first_name: "Caitlyn",
         emergency_last_name: "Bentley" ,
         emergency_relationship: "Mother",
         emergency_phone: "6475294720",
      }),
      new Child({
         first_name: "Thomas",
         last_name: "Goodson",
         dob: new Date('2010-08-13'),
         grade: "1",
         shirt_size: "XS",
         address: {
            street: "34 Marvin Court",
            city: "Mississauga",
            province: "Ontario",
            postal_code: "L8X 9F4"
         },
         medical_info: "",
         is_photo_allowed: false,
         is_photo_public_use_allowed: false,
         parent_first_name: "Rita",
         parent_last_name: "Alfonso",
         parent_phone: "9050280923",
         parent_email: "thealfonsoes@gmail.com",
         emergency_first_name: "Juan",
         emergency_last_name: "Pervez" ,
         emergency_relationship: "Family friend",
         emergency_phone: "4168560409",
      }),
   ];

   // Create test volunteers
   // TODO:

   // Clear all existing data, save all data, and close
   User.remove()
       .then(() => Child.remove())
       .then(() => admin.save())
       .then(user => console.log(`Saved user: ${user}`) || Child.insertMany(children))
       .then(children => console.log(`Saved children: ${children}`) || db.close())
       .then(() => console.log("Goodbye!"))
       .catch(err => console.error(err));
});