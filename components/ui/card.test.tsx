import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '#/components/ui/card';

describe('Card', () => {
  test('renders children as body', () => {
    const { getByText } = render(
      <Card>
        <Text>body</Text>
      </Card>,
    );
    expect(getByText('body')).toBeTruthy();
  });

  test('renders header slot', () => {
    const { getByText } = render(
      <Card header={<Card.Title>제목</Card.Title>}>
        <Text>body</Text>
      </Card>,
    );
    expect(getByText('제목')).toBeTruthy();
  });

  test('renders footer slot', () => {
    const { getByText } = render(
      <Card footer={<Text>액션</Text>}>
        <Text>body</Text>
      </Card>,
    );
    expect(getByText('액션')).toBeTruthy();
  });

  test('Card.Description renders provided text', () => {
    const { getByText } = render(<Card.Description>설명</Card.Description>);
    expect(getByText('설명')).toBeTruthy();
  });
});
