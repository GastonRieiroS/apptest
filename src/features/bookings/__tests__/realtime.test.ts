import { subscribeToClasses } from '@services/bookings';
import { ClassSession } from '@utils/types';

jest.mock('@services/firebase', () => ({ firestore: {} }));
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  onSnapshot: (_query: unknown, cb: (snapshot: any) => void) => {
    const fakeSnapshot = {
      docs: [
        { id: '1', data: () => ({ activity: 'functional', startTime: '2024-01-01T10:00:00Z', endTime: '2024-01-01T11:00:00Z', capacity: 10, reserved: 4, coach: 'Ana', location: 'Sala A' }) },
      ],
    };
    cb(fakeSnapshot);
    return jest.fn();
  },
}));

describe('subscribeToClasses', () => {
  it('invokes callback with parsed classes', () => {
    const cb = jest.fn();
    const unsubscribe = subscribeToClasses(cb);
    expect(cb).toHaveBeenCalledWith<Partial<ClassSession>[]>([
      expect.objectContaining({ activity: 'functional', reserved: 4 }),
    ]);
    expect(typeof unsubscribe).toBe('function');
  });
});
