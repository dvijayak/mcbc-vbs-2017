import { Address } from '../helper';
import { Child } from '../models/child';

export const MAX_CHILDREN = 5; // as per requirement

export class Submission {
   parent_first_name: string;
   parent_last_name: string;
   parent_phone: string;
   parent_email: string;
   address: Address = new Address();
   emergency_first_name: string;
   emergency_last_name: string;
   emergency_relationship: string;
   emergency_phone: string;
   children: Child[] = [];
}