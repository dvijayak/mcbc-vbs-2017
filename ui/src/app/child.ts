import { Address } from './address';

/// Child class
/// This is our app's "model".
export class Child {
   id: number;
   first_name: string;
   last_name: string;
   dob: Date;
   grade: string;
   shirt_size: string;
   address: Address;
   medical_info: string;
   is_photo_allowed: boolean;
   is_photo_public_use_allowed: boolean; // only set if is_photo_allowed === true
   is_in_waiting_list: boolean;
   parent_first_name: string;
   parent_last_name: string;
   parent_phone: string;
   parent_email: string;
   // parent_address: Address; <-- is this needed?
}