import { Child } from './child';
import { Address } from './address';

// A (super crude) DB of children. In a less contrived scenario,
// we would be populating such a structure via an actual DB
// backend like MongoDB or MySQL.
export const CHILDREN: Child[] = [
   {
      id: 1
      , first_name: 'Darren'
      , last_name: 'Korb'
      , dob: new Date(2008, 4, 23)
      , grade: "2"
      , shirt_size: "L" // must normalize sizes
      , address: {
         street_number: "980"
         , street: "Eval Avenue"
         , city: "Mississauga"
         , province: "ON"
         , postal_code: "A3D 4D2"
      }
      , medical_info: "N/A"
      , is_photo_allowed: true
      , is_photo_public_use_allowed: false
      , is_in_waiting_list: false
      , parent_first_name: "Jasmine"
      , parent_last_name: "Korb"
      , parent_phone: "4564564567"
      , parent_email: "jasmine.korb@hotmail.com"
   },
   {
      id: 2
      , first_name: 'Beatrice'
      , last_name: 'Korb'
      , dob: new Date(2006, 2, 21)
      , grade: "4"
      , shirt_size: "M"
      , address: {
         street_number: "980"
         , street: "Eval Avenue"
         , city: "Mississauga"
         , province: "ON"
         , postal_code: "A3D 4D2"
      }
      , medical_info: "Peanut allergy"
      , is_photo_allowed: true
      , is_photo_public_use_allowed: false
      , is_in_waiting_list: false
      , parent_first_name: "Jasmine"
      , parent_last_name: "Korb"
      , parent_phone: "4564564567"
      , parent_email: "jasmine.korb@hotmail.com"
   },
   {
      id: 3
      , first_name: 'Amelia'
      , last_name: 'Jane'
      , dob: new Date(2009, 7, 19)
      , grade: "1"
      , shirt_size: "S"
      , address: {
         street_number: "316"
         , street: "Horseshoe Crescent"
         , city: "Mississauga"
         , province: "ON"
         , postal_code: "D7D 9H9"
      }
      , medical_info: "N/A"
      , is_photo_allowed: true
      , is_photo_public_use_allowed: true
      , is_in_waiting_list: false
      , parent_first_name: "Matthew"
      , parent_last_name: "Jane"
      , parent_phone: "6789870694"
      , parent_email: "matt.jane@outlook.com"
   },
];
