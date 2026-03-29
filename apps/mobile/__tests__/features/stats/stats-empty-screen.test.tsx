import { fireEvent, render, screen } from '~/test/test-utils';
import { StatsEmptyScreenContent } from '~/features/stats/stats-empty-screen';

describe('StatsEmptyScreenContent', () => {
  it('renders title', () => {
    render(<StatsEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('통계')).toBeTruthy();
  });

  it('renders mock preview data', () => {
    render(<StatsEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByText('이번 주 운동')).toBeTruthy();
    expect(screen.getByText('32,840')).toBeTruthy();
    expect(screen.getByText('주간 운동 빈도')).toBeTruthy();
  });

  it('renders motivation section', () => {
    render(<StatsEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('운동을 시작하면')).toBeTruthy();
    expect(screen.getByText(/나의 운동 통계를/)).toBeTruthy();
  });

  it('calls onStartWorkout when button pressed', () => {
    const onStart = jest.fn();
    render(<StatsEmptyScreenContent onStartWorkout={onStart} />);
    fireEvent.press(screen.getByText('운동 시작하기'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
