import { render, screen } from '~/test/test-utils';
import { StatsScreenContent } from '~/features/stats/stats-screen';

const props = {
  selectedPeriod: '1주',
  periods: ['1주', '1개월', '3개월', '전체'],
  weeklyCount: '12',
  totalVolume: '32,840',
  chartData: [
    { label: '월', value: 3 },
    { label: '화', value: 1 },
    { label: '수', value: 2 },
    { label: '목', value: 4 },
    { label: '금', value: 2 },
    { label: '토', value: 3 },
    { label: '일', value: 0 },
  ],
  exerciseStats: [
    { id: 'squat', name: '스쿼트', trend: '+5kg', detail: '최근 80kg × 8' },
    { id: 'bench', name: '벤치프레스', trend: '+2.5kg', detail: '최근 60kg × 10' },
  ],
  onPeriodChange: jest.fn(),
  onExercisePress: jest.fn(),
};

describe('StatsScreenContent', () => {
  it('renders title', () => {
    render(<StatsScreenContent {...props} />);
    expect(screen.getByText('통계')).toBeTruthy();
  });

  it('renders period selector', () => {
    render(<StatsScreenContent {...props} />);
    expect(screen.getByText('1주')).toBeTruthy();
    expect(screen.getByText('1개월')).toBeTruthy();
    expect(screen.getByText('3개월')).toBeTruthy();
    expect(screen.getByText('전체')).toBeTruthy();
  });

  it('renders metric cards', () => {
    render(<StatsScreenContent {...props} />);
    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByText('이번 주 운동')).toBeTruthy();
    expect(screen.getByText('32,840')).toBeTruthy();
    expect(screen.getByText('총 볼륨 (kg)')).toBeTruthy();
  });

  it('renders chart section', () => {
    render(<StatsScreenContent {...props} />);
    expect(screen.getByText('주간 운동 빈도')).toBeTruthy();
  });

  it('renders exercise stats', () => {
    render(<StatsScreenContent {...props} />);
    expect(screen.getByText('운동별 추이')).toBeTruthy();
    expect(screen.getByText('스쿼트')).toBeTruthy();
    expect(screen.getByText('벤치프레스')).toBeTruthy();
  });
});
