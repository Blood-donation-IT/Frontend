import { BloodType } from "./user";

export interface Application {
  application_id: string;
  user_id: number;
  blood_type: BloodType;
  application_time: string;
  application_day: string;
  slot_index: number;
  location_id: string;
  status: 'pending' | 'cancelled' | string; 
  created_at: string | Date;
  updated_at: string | Date;
}