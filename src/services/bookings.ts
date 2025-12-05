import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';

import { Booking, ClassSession } from '@utils/types';

import { firestore } from './firebase';

export const subscribeToClasses = (
  callback: (classes: ClassSession[]) => void,
  activity?: ClassSession['activity'],
) => {
  const classesRef = collection(firestore, 'classes');
  const classQuery = activity
    ? query(classesRef, where('activity', '==', activity), orderBy('startTime', 'asc'))
    : query(classesRef, orderBy('startTime', 'asc'));

  const unsubscribe = onSnapshot(classQuery, (snapshot) => {
    const sessions: ClassSession[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<ClassSession, 'id'>),
    }));
    callback(sessions);
  });

  return unsubscribe;
};

export const reserveClass = async (userId: string, session: ClassSession) => {
  const bookingsRef = collection(firestore, 'bookings');
  const booking: Omit<Booking, 'id'> = {
    userId,
    classId: session.id,
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  await addDoc(bookingsRef, { ...booking, createdAt: serverTimestamp() });
  await updateDoc(doc(firestore, 'classes', session.id), {
    reserved: session.reserved + 1,
  });
};

export const cancelReservation = async (booking: Booking, session: ClassSession) => {
  await updateDoc(doc(firestore, 'bookings', booking.id), { status: 'cancelled' });
  await updateDoc(doc(firestore, 'classes', session.id), {
    reserved: Math.max(0, session.reserved - 1),
  });
};

export const subscribeToUserBookings = (
  userId: string,
  callback: (bookings: Booking[]) => void,
) => {
  const bookingsRef = collection(firestore, 'bookings');
  const bookingsQuery = query(bookingsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
    const userBookings: Booking[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Booking, 'id'>),
    }));
    callback(userBookings);
  });

  return unsubscribe;
};
