import { fireEvent, render, screen } from '~/test/test-utils';
import { PopularProgramItem } from '~/features/programs/components/popular-program-item';

describe('PopularProgramItem', () => {
  it('renders rank, name, and description', () => {
    render(
      <PopularProgramItem
        rank={1}
        name="PHUL"
        description="파워 + 근비대 균형 · 중급자 추천"
        onPress={jest.fn()}
      />,
    );
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('파워 + 근비대 균형 · 중급자 추천')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<PopularProgramItem rank={1} name="PHUL" description="desc" onPress={onPress} />);
    fireEvent.press(screen.getByText('PHUL'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
