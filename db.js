const DBConfig = {
   url: 'localhost',
   port: 27018,
   db: 'vbs2017',
   username: "TODO", // read creds from file on server
   password: "TODO" // read creds from file on server
}; // TODO: Get all of this from environment variable or something?

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Mongoose comes with mpromises by default, but we want to use ES6 native promises

mongoose.connect(`mongodb://${DBConfig.url}:${DBConfig.port}/${DBConfig.db}`);
const db = mongoose.connection;

db.on('error', err => { throw err} ); // there is no point in continuing if we can't talk to the DB (TODO: perhaps we should keep trying to reconnect for some duration?)
db.once('open', function () {
   console.log("Successfully connected to MongoDB!");
});
// We want the connection to persist for the entire lifetime of the application.
// TODO: Should we write some code to attempt to re-establish connection upon failure?

module.exports = db;

