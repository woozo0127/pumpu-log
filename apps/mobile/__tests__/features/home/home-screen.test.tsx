import { render, screen } from '~/test/test-utils';
import { HomeScreenContent } from '~/features/home/home-screen';

const props = {
  greeting: '좋은 아침이에요!',
  programName: 'PHUL',
  routineName: 'Day 2 · 하체 파워',
  dayProgress: '2 / 4',
  exercises: ['스쿼트', '레그 프레스', '레그 컬 외 2개'],
  recentSessions: [
    { day: '20', month: '3월', name: '상체 파워', detail: 'PHUL Day 1 · 5개 운동 · 48분' },
    { day: '18', month: '3월', name: '하체 근비대', detail: 'PHUL Day 4 · 5개 운동 · 52분' },
  ],
  onStartWorkout: jest.fn(),
  onViewAllHistory: jest.fn(),
};

describe('HomeScreenContent', () => {
  it('renders greeting section', () => {
    render(<HomeScreenContent {...props} />);
    expect(screen.getByText('좋은 아침이에요!')).toBeTruthy();
    expect(screen.getByText('오늘도 펌핑할 준비 되셨나요?')).toBeTruthy();
  });

  it('renders today workout section', () => {
    render(<HomeScreenContent {...props} />);
    expect(screen.getByText('오늘의 운동')).toBeTruthy();
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('Day 2 · 하체 파워')).toBeTruthy();
  });

  it('renders recent workout section', () => {
    render(<HomeScreenContent {...props} />);
    expect(screen.getByText('최근 운동')).toBeTruthy();
    expect(screen.getByText('상체 파워')).toBeTruthy();
    expect(screen.getByText('하체 근비대')).toBeTruthy();
  });
});
