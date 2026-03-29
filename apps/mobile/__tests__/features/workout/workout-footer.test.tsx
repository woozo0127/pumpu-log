import { fireEvent, render, screen } from '~/test/test-utils';
import { WorkoutFooter } from '~/features/workout/components/workout-footer';

describe('WorkoutFooter', () => {
  it('renders progress and next button', () => {
    render(
      <WorkoutFooter
        current={1}
        total={5}
        onNext={jest.fn()}
        onShowExercises={jest.fn()}
      />,
    );
    expect(screen.getByText('1/5')).toBeTruthy();
    expect(screen.getByText('다음 운동')).toBeTruthy();
  });

  it('shows finish button on last exercise', () => {
    render(
      <WorkoutFooter
        current={5}
        total={5}
        onNext={jest.fn()}
        onShowExercises={jest.fn()}
      />,
    );
    expect(screen.getByText('운동 완료')).toBeTruthy();
  });

  it('calls onNext when button pressed', () => {
    const onNext = jest.fn();
    render(
      <WorkoutFooter current={1} total={5} onNext={onNext} onShowExercises={jest.fn()} />,
    );
    fireEvent.press(screen.getByText('다음 운동'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
