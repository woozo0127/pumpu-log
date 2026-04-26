import { fireEvent, render } from '@testing-library/react-native';
import { Pressable } from 'react-native';
import { ToggleGroup } from '#/components/ui/toggle-group';

describe('ToggleGroup', () => {
  test('single item press triggers onValueChange', () => {
    const onValueChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <ToggleGroup type="single" value="a" onValueChange={onValueChange}>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  test('multiple item press appends inactive value', () => {
    const onValueChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <ToggleGroup type="multiple" value={['a']} onValueChange={onValueChange}>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onValueChange).toHaveBeenCalledWith(['a', 'b']);
  });
});
