import { Volunteer } from './volunteer';
import { Address } from './address';

// A (super crude) DB of volunteers. In a less contrived scenario,
// we would be populating such a structure via an actual DB
// backend like MongoDB or MySQL.
export const VOLUNTEERS: Volunteer[] = [
   {
      id: 1
      , first_name: 'Dante'
      , last_name: 'Jemmott'
      , address: {
         street_number: "123"
         , street: "Test Road"
         , city: "Mississauga"
         , province: "ON" // need a function to convert full province names to the two-letter abbreviation
         , postal_code: "D43 1D1" // need a function to normalize postal code format
      }
      , email: "dante.jemmott@gmail.com"
      , home_phone: "1231231234" // need normalize function
      , cell_phone: "2342342345" // need normalize function
      , is_minor: false
      , is_police_check_done: true
      , grade: undefined
   },
   {
      id: 2
      , first_name: 'Michelle'
      , last_name: 'Marques'
      , address: {
         street_number: "978"
         , street: "Exam Drive"
         , city: "Mississauga"
         , province: "ON"
         , postal_code: "R5T 3F3"
      }
      , email: "michelle.marques@gmail.com"
      , home_phone: "4564564567"
      , cell_phone: "5675675678"
      , is_minor: false
      , is_police_check_done: true
      , grade: undefined
   },
   {
      id: 3
      , first_name: 'Cailin'
      , last_name: 'Jemmott'
      , address: {
         street_number: "123"
         , street: "Test Road"
         , city: "Mississauga"
         , province: "ON"
         , postal_code: "D43 1D1"
      }
      , email: "cailin.jemmott@gmail.com"
      , home_phone: "1231231234"
      , cell_phone: "3243243245"
      , is_minor: true
      , is_police_check_done: undefined
      , grade: "7"
   },
];
