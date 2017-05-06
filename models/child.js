const mongoose = require('mongoose');

const AddressSchema = require('./helper').models.Address.schema;

const ChildSchema = mongoose.Schema({
   first_name: String,
   last_name: String,
   dob: Date,
   grade: String,
   shirt_size: String,
   address: AddressSchema,
   medical_info: String,
   is_photo_allowed: { type: Boolean, default: false},
   is_photo_public_use_allowed: { type: Boolean, default: false},
   is_in_waiting_list: { type: Boolean, default: false},
   parent_first_name: String,
   parent_last_name: String,
   parent_phone: String,
   parent_email: String,
   emergency_first_name: String,
   emergency_last_name: String,
   emergency_relationship: String,
   emergency_phone: String,
});

const Child = mongoose.model('Child', ChildSchema);

module.exports = {
   schema: ChildSchema,
   model: Child
};