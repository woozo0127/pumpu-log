import { fireEvent, render, screen } from '~/test/test-utils';
import { WorkoutSummaryContent } from '~/features/workout-summary/workout-summary-screen';

const props = {
  routineLabel: '하체 파워 · PHUL Day 2',
  duration: '42:18',
  exerciseCount: '5',
  totalVolume: '8,420',
  exercises: [
    { name: '스쿼트', detail: '3세트 · 80kg' },
    { name: '레그 프레스', detail: '3세트 · 120kg' },
    { name: '레그 컬', detail: '3세트 · 40kg' },
  ],
  onDone: jest.fn(),
};

describe('WorkoutSummaryContent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders title and subtitle', () => {
    render(<WorkoutSummaryContent {...props} />);
    expect(screen.getByText('운동 완료!')).toBeTruthy();
    expect(screen.getByText('하체 파워 · PHUL Day 2')).toBeTruthy();
  });

  it('renders stat cards', () => {
    render(<WorkoutSummaryContent {...props} />);
    expect(screen.getByText('42:18')).toBeTruthy();
    expect(screen.getByText('소요 시간')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByText('운동 수')).toBeTruthy();
    expect(screen.getByText('8,420')).toBeTruthy();
    expect(screen.getByText('총 볼륨(kg)')).toBeTruthy();
  });

  it('renders exercise summary list', () => {
    render(<WorkoutSummaryContent {...props} />);
    expect(screen.getByText('운동별 요약')).toBeTruthy();
    expect(screen.getByText('스쿼트')).toBeTruthy();
    expect(screen.getByText('3세트 · 80kg')).toBeTruthy();
    expect(screen.getByText('레그 프레스')).toBeTruthy();
    expect(screen.getByText('레그 컬')).toBeTruthy();
  });

  it('calls onDone when button pressed', () => {
    render(<WorkoutSummaryContent {...props} />);
    fireEvent.press(screen.getByText('홈으로'));
    expect(props.onDone).toHaveBeenCalledTimes(1);
  });
});
