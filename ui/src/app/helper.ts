/// Provinces of Canada ///

export class CanadianProvince {
   name: string
   shortname: string
};

export const CANADIANPROVINCES: CanadianProvince[] = [
   {name: "Ontario", shortname: "ON"},
   {name: "Alberta", shortname: "AB"},
   {name: "British Columbia", shortname: "BC"},
   {name: "Manitoba", shortname: "MB"},
   {name: "New Brunswick", shortname: "NB"},
   {name: "Newfoundland and Labrador", shortname: "NL"},
   {name: "Northwest Territories", shortname: "NT"},
   {name: "Nova Scotia", shortname: "NS"},
   {name: "Nunavut", shortname: "NU"},
   {name: "Prince Edward Island", shortname: "PE"},
   {name: "Quebec", shortname: "QC"},
   {name: "Saskatchewan", shortname: "SK"},
   {name: "Yukon", shortname: "YT"}
];

/// Address class
export class Address {
   street_number: string;
   street: string;
   city: string;
   province: string;
   postal_code: string;

   transform () {
      // TODO
   }
}

/// PhoneNumber class
export class PhoneNumber {
   phone: string;

   transform () {
      // TODO
   }
}