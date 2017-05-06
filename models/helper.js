const mongoose = require('mongoose');

const AddressSchema = {
   street: String,
   city: String,
   province: String,
   postal_code: String,
};

module.exports = {
   models: {
      Address: {
         schema: AddressSchema,
         model: mongoose.model('Address', AddressSchema)
      }
   }
};
