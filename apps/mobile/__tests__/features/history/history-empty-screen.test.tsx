import { fireEvent, render, screen } from '~/test/test-utils';
import { HistoryEmptyScreenContent } from '~/features/history/history-empty-screen';

describe('HistoryEmptyScreenContent', () => {
  it('renders title', () => {
    render(<HistoryEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('기록')).toBeTruthy();
  });

  it('renders mock calendar preview', () => {
    render(<HistoryEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('2026년 3월')).toBeTruthy();
    expect(screen.getByText('3월 20일 (목)')).toBeTruthy();
  });

  it('renders motivation section', () => {
    render(<HistoryEmptyScreenContent onStartWorkout={jest.fn()} />);
    expect(screen.getByText('첫 운동을 기록해보세요')).toBeTruthy();
    expect(screen.getByText(/운동할수록 성장하는/)).toBeTruthy();
  });

  it('calls onStartWorkout when button pressed', () => {
    const onStart = jest.fn();
    render(<HistoryEmptyScreenContent onStartWorkout={onStart} />);
    fireEvent.press(screen.getByText('운동 시작하기'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
