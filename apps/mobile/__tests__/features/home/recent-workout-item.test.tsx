import { render, screen } from '~/test/test-utils';
import { RecentWorkoutItem } from '~/features/home/components/recent-workout-item';

describe('RecentWorkoutItem', () => {
  it('renders date, name, and details', () => {
    render(
      <RecentWorkoutItem
        day="20"
        month="3월"
        name="상체 파워"
        detail="PHUL Day 1 · 5개 운동 · 48분"
      />,
    );
    expect(screen.getByText('20')).toBeTruthy();
    expect(screen.getByText('3월')).toBeTruthy();
    expect(screen.getByText('상체 파워')).toBeTruthy();
    expect(screen.getByText('PHUL Day 1 · 5개 운동 · 48분')).toBeTruthy();
  });
});
