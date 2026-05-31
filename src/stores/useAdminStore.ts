import { create } from 'zustand';

export interface AdminEntry {
  id: string;
  initials: string;
  name: string;
  time: string;
  bloodType: string;
  status: 'pending' | 'accepted' | 'declined';
}

interface AdminState {
  entries: AdminEntry[];
  updateEntryStatus: (id: string, newStatus: 'pending' | 'accepted' | 'declined') => void;
}


const sortEntriesByTime = (entries: AdminEntry[]) => {
  return [...entries].sort((a, b) => a.time.localeCompare(b.time));
};

// фейк дані
const RAW_ENTRIES: AdminEntry[] = [
  { id: "1", initials: "SL", name: "Shevchenko Lyudmila Vasylivna", time: "08:30–09:00", bloodType: "AB(IV) Rh-", status: "pending" },
  { id: "2", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "09:00–09:30", bloodType: "AB(IV) Rh-", status: "pending" },
  { id: "3", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "13:00–13:30", bloodType: "Don't know", status: "pending" },
  { id: "4", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "11:00–11:30", bloodType: "B(III) Rh-", status: "pending" },
  { id: "5", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "14:00–14:30", bloodType: "Don't know", status: "pending" },
  { id: "6", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "13:00–13:30", bloodType: "AB(IV) Rh+", status: "pending" },
  { id: "7", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "12:00–12:30", bloodType: "AB(IV) Rh+", status: "pending" },
  { id: "8", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "12:00–12:30", bloodType: "AB(IV) Rh+", status: "pending" },
  { id: "9", initials: "BI", name: "Bondarenko Ivan Ivanovych", time: "12:30–13:00", bloodType: "AB(IV) Rh+", status: "pending" },
];


const INITIAL_ENTRIES = sortEntriesByTime(RAW_ENTRIES);

export const useAdminStore = create<AdminState>((set) => ({
  entries: INITIAL_ENTRIES,
  
  updateEntryStatus: (id, newStatus) => set((state) => ({
    entries: state.entries.map((item) => 
      item.id === id ? { ...item, status: newStatus } : item
    )
  })),
}));