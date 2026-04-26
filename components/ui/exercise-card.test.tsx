import { fireEvent, render } from '@testing-library/react-native';
import { Pressable } from 'react-native';
import { ExerciseCard } from '#/components/ui/exercise-card';

describe('ExerciseCard', () => {
  test('renders title and subtitle', () => {
    const { getByText } = render(
      <ExerciseCard index={1} title="벤치 프레스" subtitle="가슴" />,
    );
    expect(getByText('벤치 프레스')).toBeTruthy();
    expect(getByText('가슴')).toBeTruthy();
  });

  test('press triggers onPress when provided', () => {
    const onPress = jest.fn();
    const { UNSAFE_getByType } = render(
      <ExerciseCard index={1} title="벤치 프레스" onPress={onPress} />,
    );
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
