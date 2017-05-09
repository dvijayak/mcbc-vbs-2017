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
   street: string;
   city: string;
   province: string;
   postal_code: string;
}

/// Areas of Interest for volunteers
export const AREASOFINTEREST: string[] = [
   "Small Group",
   "Music",
   "Arts and Crafts",
   "Snacks",
   "Sports",
   "Big Brother/Sister",
   "Photography/Video",
   "Stage Creation",
   "Registration",
   "Audio/Video",
   "First Aid",
   "Security",
];