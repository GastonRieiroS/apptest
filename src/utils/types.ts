export type ActivityType = 'functional' | 'pilates';

export type ClassSession = {
  id: string;
  activity: ActivityType;
  startTime: string;
  endTime: string;
  capacity: number;
  reserved: number;
  coach: string;
  location: string;
};

export type Booking = {
  id: string;
  userId: string;
  classId: string;
  status: 'active' | 'cancelled';
  createdAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photoURL?: string;
  upcomingBookings: Booking[];
  history: Booking[];
  isAdmin?: boolean;
};
