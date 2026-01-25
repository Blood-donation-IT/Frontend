export interface UserBase {
  id: string;
  name: string;
  avatar: string;
}

export interface UserProfile extends UserBase {
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "N/A";
  has_donorBook: boolean;
  donations_count: number;
  last_donation: string | null; 
  donor_status: string;
  lives_saved_count: string;
}

export interface UserEdit extends UserBase {
  email: string;
  phone: string;
}