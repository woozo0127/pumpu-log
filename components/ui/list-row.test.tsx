import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ListRow } from '#/components/ui/list-row';

describe('ListRow', () => {
  test('wraps string title in ListRow.Title typography', () => {
    const { getByText } = render(<ListRow title="제목" />);
    expect(getByText('제목')).toBeTruthy();
  });

  test('wraps string subtitle in ListRow.Subtitle typography', () => {
    const { getByText } = render(<ListRow title="t" subtitle="서브" />);
    expect(getByText('서브')).toBeTruthy();
  });

  test('renders ReactNode title as-is', () => {
    const { getByText } = render(<ListRow title={<Text>커스텀</Text>} />);
    expect(getByText('커스텀')).toBeTruthy();
  });

  test('renders leading slot', () => {
    const { getByText } = render(
      <ListRow leading={<Text>L</Text>} title="t" />,
    );
    expect(getByText('L')).toBeTruthy();
  });

  test('renders trailing slot', () => {
    const { getByText } = render(
      <ListRow title="t" trailing={<Text>T</Text>} />,
    );
    expect(getByText('T')).toBeTruthy();
  });

  test('onPress triggers callback', () => {
    const onPress = jest.fn();
    const { UNSAFE_getByType } = render(
      <ListRow title="t" onPress={onPress} />,
    );
    const Pressable = require('react-native').Pressable;
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('without onPress renders View root (no Pressable)', () => {
    const { UNSAFE_queryByType } = render(<ListRow title="t" />);
    const Pressable = require('react-native').Pressable;
    expect(UNSAFE_queryByType(Pressable)).toBeNull();
  });
});
