import { render, screen } from '~/test/test-utils';
import { StatsScreenContent } from '~/features/stats/stats-screen';

describe('StatsScreenContent', () => {
  it('renders title', () => {
    render(<StatsScreenContent />);
    expect(screen.getByText('통계')).toBeTruthy();
  });

  it('renders coming soon message', () => {
    render(<StatsScreenContent />);
    expect(screen.getByText('곧 만나요!')).toBeTruthy();
  });

  it('renders description', () => {
    render(<StatsScreenContent />);
    expect(screen.getByText(/운동 통계 기능을/)).toBeTruthy();
  });

  it('renders coming soon badge', () => {
    render(<StatsScreenContent />);
    expect(screen.getByText('Coming Soon')).toBeTruthy();
  });
});
