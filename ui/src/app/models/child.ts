import { Address } from '../helper';

export class Child {
   id: number;
   first_name: string;
   last_name: string;
   dob: Date;
   grade: string;
   shirt_size: string;
   address: Address;
   medical_info: string;
   is_photo_allowed: boolean = false;
   is_photo_public_use_allowed: boolean = false;
   is_in_waiting_list: boolean;
   parent_first_name: string;
   parent_last_name: string;
   parent_phone: string;
   parent_email: string;
   emergency_first_name: string;
   emergency_last_name: string;
   emergency_relationship: string;
   emergency_phone: string;
}