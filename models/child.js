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

const propertyNames = {
   first_name: "First Name",
   last_name: "Last Name",
   dob: "Date of Birth",
   grade: "Grade",
   shirt_size: "Shirt",
   address: "Address",
   medical_info: "Medical and Other Info",
   is_photo_allowed: "Is Photo Allowed?",
   is_photo_public_use_allowed: "Is Public Use of Photo Allowed?",
   is_in_waiting_list: "Waiting List?",
   parent_first_name: "Parent's First Name",
   parent_last_name: "Parent's Last Name",
   parent_phone: "Parent's Phone",
   parent_email: "Parent's Email",
   emergency_first_name: "Emergency Contact's First Name",
   emergency_last_name: "Emergency Contact's Last Name",
   emergency_relationship: "Emergency Contact's Relationship to Child",
   emergency_phone: "Emergency Contact's Phone",
}

const Child = mongoose.model('Child', ChildSchema);

module.exports = {
   schema: ChildSchema,
   model: Child,
   propertyNames: propertyNames,
};