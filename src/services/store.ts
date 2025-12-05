import { create } from 'zustand';

import { Booking, ClassSession, UserProfile } from '@utils/types';

export type BookingPolicy = {
  cancelMinutesBefore: number;
};

type StoreState = {
  user: UserProfile | null;
  sessions: ClassSession[];
  bookings: Booking[];
  policy: BookingPolicy;
  setUser: (user: UserProfile | null) => void;
  setSessions: (sessions: ClassSession[]) => void;
  setBookings: (bookings: Booking[]) => void;
  setPolicy: (policy: BookingPolicy) => void;
};

export const useAppStore = create<StoreState>((set) => ({
  user: null,
  sessions: [],
  bookings: [],
  policy: { cancelMinutesBefore: 180 },
  setUser: (user) => set({ user }),
  setSessions: (sessions) => set({ sessions }),
  setBookings: (bookings) => set({ bookings }),
  setPolicy: (policy) => set({ policy }),
}));
