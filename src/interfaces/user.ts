export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "N/A";

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  
  blood_type: BloodType;
  donations_count: number;
  last_donation: string | null; 
  donor_status: string;
  lives_saved_count: string;
}

export interface UpdateUserPayload {
  name?: string;
  blood_type?: BloodType;
  avatar?: string;
}