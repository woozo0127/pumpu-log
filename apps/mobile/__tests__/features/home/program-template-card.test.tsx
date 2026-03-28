import { render, screen, fireEvent } from '~/test/test-utils';
import { ProgramTemplateCard } from '~/features/home/components/program-template-card';

describe('ProgramTemplateCard', () => {
  it('renders program info', () => {
    render(
      <ProgramTemplateCard
        badge="4D"
        name="PHUL"
        description="파워 + 근비대 · 주 4일"
        onPress={jest.fn()}
      />,
    );
    expect(screen.getByText('4D')).toBeTruthy();
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('파워 + 근비대 · 주 4일')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(
      <ProgramTemplateCard badge="4D" name="PHUL" description="desc" onPress={onPress} />,
    );
    fireEvent.press(screen.getByText('PHUL'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
