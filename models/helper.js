const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
   street: String,
   city: String,
   province: String,
   postal_code: String,
});

AddressSchema.methods.toString = function () {
   return `${this.street}, ${this.city}, ${this.province} ${this.postal_code}`;
}

module.exports = {
   models: {
      Address: {
         schema: AddressSchema,
         model: mongoose.model('Address', AddressSchema)
      }
   },
   transforms: {
      yesNo: x => x ? "Yes" : "No",
      date: date => date.toDateString(),
      phone: phone => phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      address: address => address.toString()
   }
};
