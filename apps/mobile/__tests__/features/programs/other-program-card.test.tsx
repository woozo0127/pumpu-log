import { fireEvent, render, screen } from '~/test/test-utils';
import { OtherProgramCard } from '~/features/programs/components/other-program-card';

describe('OtherProgramCard', () => {
  it('renders program info', () => {
    render(
      <OtherProgramCard name="PPL" description="6일 프로그램" onPress={jest.fn()} />,
    );
    expect(screen.getByText('PPL')).toBeTruthy();
    expect(screen.getByText('6일 프로그램')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<OtherProgramCard name="PPL" description="desc" onPress={onPress} />);
    fireEvent.press(screen.getByText('PPL'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
