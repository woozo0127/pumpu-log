import { fireEvent, render } from '@testing-library/react-native';
import { Pressable } from 'react-native';
import { Stepper } from '#/components/ui/stepper';

describe('Stepper', () => {
  test('pressing plus increments by step', () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <Stepper value={80} step={2.5} onChange={onChange} />,
    );
    const buttons = UNSAFE_getAllByType(Pressable);
    fireEvent.press(buttons[1]);
    expect(onChange).toHaveBeenCalledWith(82.5);
  });

  test('pressing minus respects min', () => {
    const onChange = jest.fn();
    const { UNSAFE_getAllByType } = render(
      <Stepper value={0} min={0} onChange={onChange} />,
    );
    const buttons = UNSAFE_getAllByType(Pressable);
    fireEvent.press(buttons[0]);
    expect(onChange).toHaveBeenCalledWith(0);
  });
});
