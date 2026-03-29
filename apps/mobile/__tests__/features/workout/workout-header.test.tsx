import { fireEvent, render, screen } from '~/test/test-utils';
import { WorkoutHeader } from '~/features/workout/components/workout-header';

describe('WorkoutHeader', () => {
  it('renders routine name and timer', () => {
    render(
      <WorkoutHeader routineName="하체 파워" elapsed="12:34" onBack={jest.fn()} />,
    );
    expect(screen.getByText('하체 파워')).toBeTruthy();
    expect(screen.getByText('12:34')).toBeTruthy();
  });

  it('calls onBack when back pressed', () => {
    const onBack = jest.fn();
    render(<WorkoutHeader routineName="하체 파워" elapsed="12:34" onBack={onBack} />);
    fireEvent.press(screen.getByText('하체 파워'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
