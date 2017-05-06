const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   username: String,
   password: String,
   last_login: Date
});

UserSchema.methods.validPassword = function (password) {
   return this.password === password; // TODO: salty hash
}

UserSchema.statics.findByUserName = function (username) {
   return this.find({username: new RegExp(username)}); // returns a promise
}

const User = mongoose.model('User', UserSchema);

module.exports = {
   schema: UserSchema,
   model: User
};