import { isCancellationAllowed } from '../../logic';

describe('booking policy', () => {
  it('allows cancellation before cutoff', () => {
    const now = new Date('2024-01-01T10:00:00Z');
    const classStart = new Date('2024-01-01T13:00:00Z');
    const result = isCancellationAllowed(now, classStart, { cancelMinutesBefore: 180 });
    expect(result).toBe(true);
  });

  it('blocks cancellation inside cutoff', () => {
    const now = new Date('2024-01-01T12:00:00Z');
    const classStart = new Date('2024-01-01T13:00:00Z');
    const result = isCancellationAllowed(now, classStart, { cancelMinutesBefore: 90 });
    expect(result).toBe(false);
  });
});
