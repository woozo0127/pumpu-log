import { render, screen } from '~/test/test-utils';
import { SetRow } from '~/features/workout/components/set-row';

describe('SetRow', () => {
  it('renders set number, weight, and reps', () => {
    render(
      <SetRow
        setNumber={1}
        weight={80}
        reps={8}
        isCompleted={false}
        onToggle={jest.fn()}
      />,
    );
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('80')).toBeTruthy();
    expect(screen.getByText('8')).toBeTruthy();
  });

  it('renders completed state differently', () => {
    render(
      <SetRow
        setNumber={1}
        weight={80}
        reps={8}
        isCompleted={true}
        onToggle={jest.fn()}
      />,
    );
    expect(screen.getByText('1')).toBeTruthy();
  });
});
