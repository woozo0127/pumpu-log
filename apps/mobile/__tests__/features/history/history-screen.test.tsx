import { render, screen } from '~/test/test-utils';
import { HistoryScreenContent } from '~/features/history/history-screen';

const props = {
  monthLabel: '2026년 3월',
  dayHeaders: ['일', '월', '화', '수', '목', '금', '토'],
  calendarDays: [
    { day: 17, hasWorkout: false },
    { day: 18, hasWorkout: true },
    { day: 19, hasWorkout: false },
    { day: 20, hasWorkout: true, isToday: true },
  ],
  selectedDate: '3월 20일 (목)',
  selectedWorkouts: [
    { id: 'w1', name: '하체 파워', detail: 'PHUL Day 2 · 5개 운동 · 45분' },
  ],
  onPrevMonth: jest.fn(),
  onNextMonth: jest.fn(),
  onSelectDay: jest.fn(),
  onWorkoutPress: jest.fn(),
};

describe('HistoryScreenContent', () => {
  it('renders title', () => {
    render(<HistoryScreenContent {...props} />);
    expect(screen.getByText('기록')).toBeTruthy();
  });

  it('renders month navigation', () => {
    render(<HistoryScreenContent {...props} />);
    expect(screen.getByText('2026년 3월')).toBeTruthy();
  });

  it('renders day headers', () => {
    render(<HistoryScreenContent {...props} />);
    expect(screen.getByText('일')).toBeTruthy();
    expect(screen.getByText('토')).toBeTruthy();
  });

  it('renders selected date section', () => {
    render(<HistoryScreenContent {...props} />);
    expect(screen.getByText('3월 20일 (목)')).toBeTruthy();
  });

  it('renders workout entry for selected date', () => {
    render(<HistoryScreenContent {...props} />);
    expect(screen.getByText('하체 파워')).toBeTruthy();
    expect(screen.getByText('PHUL Day 2 · 5개 운동 · 45분')).toBeTruthy();
  });
});
