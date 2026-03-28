import { render, screen, fireEvent } from '~/test/test-utils';
import { TodayWorkoutCard } from '~/features/home/components/today-workout-card';

const props = {
  programName: 'PHUL',
  routineName: 'Day 2 · 하체 파워',
  dayProgress: '2 / 4',
  exercises: ['스쿼트', '레그 프레스', '레그 컬 외 2개'],
  onStart: jest.fn(),
};

describe('TodayWorkoutCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders program and routine info', () => {
    render(<TodayWorkoutCard {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('Day 2 · 하체 파워')).toBeTruthy();
    expect(screen.getByText('2 / 4')).toBeTruthy();
  });

  it('renders exercise list', () => {
    render(<TodayWorkoutCard {...props} />);
    expect(screen.getByText('스쿼트')).toBeTruthy();
    expect(screen.getByText('레그 프레스')).toBeTruthy();
    expect(screen.getByText('레그 컬 외 2개')).toBeTruthy();
  });

  it('calls onStart when button pressed', () => {
    render(<TodayWorkoutCard {...props} />);
    fireEvent.press(screen.getByText('운동 시작'));
    expect(props.onStart).toHaveBeenCalledTimes(1);
  });
});
