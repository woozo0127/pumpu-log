import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { BottomSheet } from '#/components/ui/bottom-sheet';

describe('BottomSheet', () => {
  test('scrim press triggers onClose', () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <BottomSheet open onClose={onClose}>
        <Text>본문</Text>
      </BottomSheet>,
    );
    const scrim = getByTestId('bottom-sheet-scrim');
    fireEvent.press(scrim);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
