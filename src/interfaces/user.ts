export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "N/A";

export enum UserRole {
  DONOR = "DONOR",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

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

  total_donations: number,
  has_donor_book: boolean,
  test_is_done: boolean,
  birth_date: string | Date;
  roles: UserRole[];
  is_active: boolean,
  is_banned: boolean,
  is_verified: boolean
}

export interface UpdateUserPayload {
  name?: string;
  blood_type?: BloodType;
  avatar?: string;
}