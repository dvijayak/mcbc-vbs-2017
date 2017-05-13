var http = require('http');

var testchild = {
   first_name: "Alex",
   last_name: "Brunette",
   dob: new Date('2009-05-06'),
   date_of_registration: new Date('2017-07-03'),
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
   parent_first_name: "Betty",
   parent_last_name: "Brunette",
   parent_phone: "4162540978",
   parent_email: "brooklyn.bennett@yahoo.ca",
   emergency_first_name: "Bent",
   emergency_last_name: "Galloway" ,
   emergency_relationship: "Uncle",
   emergency_phone: "6479801932",
};

const req = http.request({
   host: 'localhost',
   port: 3000,
   path: '/api/child',
   method: 'PUT'
}, (res) => {
   let str ='';
   res.on('data', chunk => str += chunk);
   res.on('end', () => console.log(str));
});

req.write(JSON.stringify(testchild));
req.end();