import { render, screen } from '~/test/test-utils';
import { ActiveProgramCard } from '~/features/programs/components/active-program-card';

const props = {
  name: 'PHUL',
  dayProgress: '2 / 4',
  days: [
    { name: 'Day 1 · 상체 파워', isCompleted: true },
    { name: 'Day 2 · 하체 파워', isCurrent: true },
    { name: 'Day 3 · 상체 근비대' },
    { name: 'Day 4 · 하체 근비대' },
  ],
  onPress: jest.fn(),
};

describe('ActiveProgramCard', () => {
  it('renders program name and progress', () => {
    render(<ActiveProgramCard {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('2 / 4')).toBeTruthy();
  });

  it('renders day list', () => {
    render(<ActiveProgramCard {...props} />);
    expect(screen.getByText('Day 1 · 상체 파워')).toBeTruthy();
    expect(screen.getByText('Day 2 · 하체 파워')).toBeTruthy();
    expect(screen.getByText('Day 3 · 상체 근비대')).toBeTruthy();
    expect(screen.getByText('Day 4 · 하체 근비대')).toBeTruthy();
  });
});
