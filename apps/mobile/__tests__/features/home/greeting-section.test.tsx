import { render, screen } from '~/test/test-utils';
import { GreetingSection } from '~/features/home/components/greeting-section';

describe('GreetingSection', () => {
  it('renders greeting and subtitle', () => {
    render(<GreetingSection greeting="좋은 아침이에요!" subtitle="오늘도 펌핑할 준비 되셨나요?" />);
    expect(screen.getByText('좋은 아침이에요!')).toBeTruthy();
    expect(screen.getByText('오늘도 펌핑할 준비 되셨나요?')).toBeTruthy();
  });
});
