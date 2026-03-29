import { fireEvent, render, screen } from '~/test/test-utils';
import { HistoryEmptyScreenContent } from '~/features/history/history-empty-screen';

describe('HistoryEmptyScreenContent', () => {
  it('renders title', () => {
    render(<HistoryEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('기록')).toBeTruthy();
  });

  it('renders preview card', () => {
    render(<HistoryEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('운동하면 이렇게 채워져요')).toBeTruthy();
  });

  it('renders motivation section', () => {
    render(<HistoryEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('첫 운동을 기록해보세요')).toBeTruthy();
  });

  it('renders start workout button', () => {
    const onStart = jest.fn();
    render(<HistoryEmptyScreenContent onStartWorkout={onStart} />);
    fireEvent.press(screen.getByText('운동 시작하기'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
