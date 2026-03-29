import { fireEvent, render, screen } from '~/test/test-utils';
import { HistoryDetailContent } from '~/features/history-detail/history-detail-screen';

const props = {
  dateLabel: '3월 20일 (목)',
  duration: '45분',
  exerciseCount: '5',
  volume: '8,420',
  programName: 'PHUL',
  routineLabel: 'Day 2 · 하체 파워',
  exercises: [
    {
      name: '스쿼트',
      sets: [
        { number: 1, weight: '80kg', reps: '8회' },
        { number: 2, weight: '80kg', reps: '8회' },
        { number: 3, weight: '80kg', reps: '6회' },
      ],
    },
    {
      name: '레그 프레스',
      sets: [
        { number: 1, weight: '120kg', reps: '10회' },
        { number: 2, weight: '120kg', reps: '10회' },
      ],
    },
  ],
  onBack: jest.fn(),
};

describe('HistoryDetailContent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders header with date', () => {
    render(<HistoryDetailContent {...props} />);
    expect(screen.getByText('3월 20일 (목)')).toBeTruthy();
  });

  it('renders stat summary', () => {
    render(<HistoryDetailContent {...props} />);
    expect(screen.getByText('45분')).toBeTruthy();
    expect(screen.getByText('소요 시간')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText('8,420')).toBeTruthy();
  });

  it('renders program info', () => {
    render(<HistoryDetailContent {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('Day 2 · 하체 파워')).toBeTruthy();
  });

  it('renders exercise details with sets', () => {
    render(<HistoryDetailContent {...props} />);
    expect(screen.getByText('스쿼트')).toBeTruthy();
    expect(screen.getByText('레그 프레스')).toBeTruthy();
    expect(screen.getAllByText('80kg').length).toBe(3);
    expect(screen.getAllByText('120kg').length).toBe(2);
  });

  it('calls onBack when back pressed', () => {
    render(<HistoryDetailContent {...props} />);
    fireEvent.press(screen.getByTestId('back-button'));
    expect(props.onBack).toHaveBeenCalledTimes(1);
  });
});
