import { render, screen, fireEvent } from '~/test/test-utils';
import { QuickStartCard } from '~/features/home/components/quick-start-card';

describe('QuickStartCard', () => {
  it('renders quick start info', () => {
    render(<QuickStartCard onPress={jest.fn()} />);
    expect(screen.getByText('빠른 시작')).toBeTruthy();
    expect(screen.getByText('운동 종목을 직접 골라 바로 기록')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    render(<QuickStartCard onPress={onPress} />);
    fireEvent.press(screen.getByText('빠른 시작'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
