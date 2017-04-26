import { Address } from './address';

/// Volunteer class
/// This is our app's "model".
export class Volunteer {
   id: number;
   first_name: string;
   last_name: string;
   address: Address;
   email: string;
   home_phone: string;
   cell_phone: string;
   is_minor: boolean;
   grade: string; // only set if is_minor === true
   is_police_check_done: boolean; // only set if is_minor === false
   // TODO: emergency contact
   // TODO: Ranked areas of interest
}