const mongoose = require('mongoose');

const SALT = "123vbsparty!!"; // TODO: Get this from a file, whose path is passed as an environment variable
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
   username: String,
   password: String,
   last_login: Date
});

UserSchema.methods.validPassword = function (password) {
   const hash = crypto.createHash('sha512');
   hash.update(SALT + password + SALT);
   return this.password === hash.digest('hex');
}

UserSchema.statics.findByUserName = function (username) {
   return this.find({username: new RegExp(username)}); // returns a promise
}

const User = mongoose.model('User', UserSchema);

module.exports = {
   schema: UserSchema,
   model: User
};