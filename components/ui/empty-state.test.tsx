import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { EmptyState } from '#/components/ui/empty-state';

describe('EmptyState', () => {
  test('wraps string eyebrow', () => {
    const { getByText } = render(<EmptyState eyebrow="hint" />);
    expect(getByText('hint')).toBeTruthy();
  });

  test('wraps string title', () => {
    const { getByText } = render(<EmptyState title="제목" />);
    expect(getByText('제목')).toBeTruthy();
  });

  test('wraps string body', () => {
    const { getByText } = render(<EmptyState body="설명" />);
    expect(getByText('설명')).toBeTruthy();
  });

  test('renders footer slot', () => {
    const { getByText } = render(
      <EmptyState title="t" footer={<Text>액션</Text>} />,
    );
    expect(getByText('액션')).toBeTruthy();
  });

  test('renders ReactNode title as-is', () => {
    const { getByText } = render(<EmptyState title={<Text>커스텀</Text>} />);
    expect(getByText('커스텀')).toBeTruthy();
  });
});
