import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DateTime } from 'luxon';
import { useDisplay } from 'vuetify';
import { useWeekdays } from '@/modules/appointment/composables/use-weekdays';

vi.mock('vuetify', () => ({
  useDisplay: vi.fn(),
}));

describe('useWeekdays', () => {
  let currentDateMock: DateTime;
  let mobileMock: boolean;

  beforeEach(() => {
    currentDateMock = DateTime.fromISO('2024-11-22T00:00:00.000Z');
    vi.spyOn(DateTime, 'now').mockReturnValue(currentDateMock);

    mobileMock = false; 
    (useDisplay as any).mockReturnValue({ mobile: { value: mobileMock } });
  });

  it('should return correct weekdays for desktop', () => {
    const { weekdays } = useWeekdays();

    expect(weekdays.value.length).toBe(7);
    expect(weekdays.value[0].dayName).toBe('Today');
    expect(weekdays.value[1].dayName).toBe('Tomorrow');
    expect(weekdays.value[6].dayDate).toBe('28 Nov');
  });

  it('should return correct weekdays for mobile', () => {
    mobileMock = true; 
    (useDisplay as any).mockReturnValue({ mobile: { value: mobileMock } });

    const { weekdays } = useWeekdays();
    expect(weekdays.value.length).toBe(3);
    expect(weekdays.value[0].dayName).toBe('Today');
    expect(weekdays.value[1].dayName).toBe('Tomorrow');
    expect(weekdays.value[2].dayName).toBe('Sun');
  });
  it('should not move the current date back past today', () => {
    const futureDate = DateTime.fromISO('2024-11-23T00:00:00.000Z');
    vi.spyOn(DateTime, 'now').mockReturnValue(futureDate as any);

    const { goBackward, currentDate } = useWeekdays();

    goBackward();
    expect(currentDate.value.toISO()).toBe(futureDate.toISO()); 
  });
  it('should correctly move the current date forward by 5 days', () => {
    const { goForward, currentDate } = useWeekdays();
    for (let i = 0; i < 5; i++) {
      goForward();
    }
    expect(currentDate.value.toISO()).toBe(currentDateMock.plus({ weeks: 5 }).toISO());
  });
});
