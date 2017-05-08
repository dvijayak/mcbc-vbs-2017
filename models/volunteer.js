const mongoose = require('mongoose');

const AddressSchema = require('./helper').models.Address.schema;
const transforms = require('./helper').transforms;

const VolunteerSchema = mongoose.Schema({
   first_name: String,
   last_name: String,
   dob: { type: Date, get: transforms.date },
   date_of_registration: { type: Date, get: transforms.date },
   // grade: String, // TODO: do we need, if we are using DOB?
   shirt_size: String,
   address: { type: AddressSchema, get: transforms.address },
   phone: { type: String, get: transforms.phone },
   email: String,
   is_minor: {
      type: Boolean,
      default: false,
      get: transforms.yesNo
   },
   police_check_completed: {
      type: Date,
      default: undefined,
      get: transforms.date
   },
   ranked_aoi: { type: [String], get: transforms.splitLines },
   emergency_first_name: String,
   emergency_last_name: String,
   emergency_relationship: String,
   emergency_phone: { type: String, get: transforms.phone },
});

const eventDate = new Date('2017-08-14'); // used in minority evaluation
const targetDate = new Date(
   eventDate.getYear() - 18, // Anyone under the age of 18 from the first day of the
   // event; by definition for the province of Ontario, found at http://www.cic.gc.ca/english/resources/tools/refugees/canada/processing/minors-prov.asp
   eventDate.getMonth(),
   eventDate.getDate());
VolunteerSchema.methods.evaluateMinority = function () {
   if (!this.dob)
      return;

   this.is_minor = (this.dob <= targetDate); // TODO: dates are all in UTC...this *may* not be a problem for most cases but be aware of corner cases with some volunteers
}

/// Virtuals

VolunteerSchema.virtual('name').get(function () {
   return `${this.first_name} ${this.last_name}`;
});

VolunteerSchema.virtual('emergency_name').get(function () {
   return `${this.emergency_first_name} ${this.emergency_last_name}`;
});

/// Default settings
VolunteerSchema.set('toJSON', { getters: true, virtuals: false }); // deal with the transformed/prettified data
VolunteerSchema.set('toObject', { getters: false, virtuals: false }); // deal with the raw original data

const propertyNames = {
   first_name: "First Name",
   last_name: "Last Name",
   dob: "Date of Birth",
   date_of_registration: "Registered On",
   // grade: "Grade", // TODO: do we need, if we are using DOB?
   shirt_size: "Shirt",
   address: "Address",
   phone: "Phone",
   email: "Email",
   is_minor: "Minor?",
   police_check_completed: "Police Check Completed",
   ranked_aoi: "Ranked Areas of Interest",
   emergency_first_name: "Emergency Contact's First Name",
   emergency_last_name: "Emergency Contact's Last Name",
   emergency_relationship: "Emergency Contact's Relationship to Volunteer",
   emergency_phone: "Emergency Contact's Phone",
}

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

module.exports = {
   schema: VolunteerSchema,
   model: Volunteer,
   propertyNames: propertyNames,
};