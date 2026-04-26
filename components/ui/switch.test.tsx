import { fireEvent, render } from '@testing-library/react-native';
import { Switch } from '#/components/ui/switch';

describe('Switch', () => {
  test('renders without crashing', () => {
    const { UNSAFE_getByType } = render(
      <Switch value={false} onValueChange={() => {}} />,
    );
    const Pressable = require('react-native').Pressable;
    expect(UNSAFE_getByType(Pressable)).toBeTruthy();
  });

  test('press triggers onValueChange with toggled value (false → true)', () => {
    const onValueChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <Switch value={false} onValueChange={onValueChange} />,
    );
    const Pressable = require('react-native').Pressable;
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onValueChange).toHaveBeenCalledWith(true);
  });

  test('press triggers onValueChange with toggled value (true → false)', () => {
    const onValueChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <Switch value={true} onValueChange={onValueChange} />,
    );
    const Pressable = require('react-native').Pressable;
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onValueChange).toHaveBeenCalledWith(false);
  });

  test('disabled prevents onValueChange', () => {
    const onValueChange = jest.fn();
    const { UNSAFE_getByType } = render(
      <Switch value={false} onValueChange={onValueChange} disabled />,
    );
    const Pressable = require('react-native').Pressable;
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
