import { BookingPolicy, useAppStore } from '@services/store';
import { Booking, ClassSession } from '@utils/types';

export const isCancellationAllowed = (now: Date, classStart: Date, policy: BookingPolicy) => {
  const diffMinutes = (classStart.getTime() - now.getTime()) / (1000 * 60);
  return diffMinutes >= policy.cancelMinutesBefore;
};

export const canReserve = (session: ClassSession) => session.reserved < session.capacity;

export const appendBookingHistory = (currentHistory: Booking[], booking: Booking) => [
  booking,
  ...currentHistory,
];

export const useBookingViewModel = () => {
  const { bookings, sessions, policy } = useAppStore();

  const upcoming = bookings.filter((booking) => booking.status === 'active');
  const history = bookings.filter((booking) => booking.status === 'cancelled');

  const withSessions = upcoming.map((booking) => ({
    booking,
    session: sessions.find((session) => session.id === booking.classId),
  }));

  const canCancel = (booking: Booking) => {
    const session = sessions.find((s) => s.id === booking.classId);
    if (!session) return false;
    return isCancellationAllowed(new Date(), new Date(session.startTime), policy);
  };

  return { upcoming: withSessions, history, canCancel };
};
