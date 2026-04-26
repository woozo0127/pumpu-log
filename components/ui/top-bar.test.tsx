import { fireEvent, render } from '@testing-library/react-native';
import { Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TopBar } from '#/components/ui/top-bar';

const renderTopBar = (ui: React.ReactElement) =>
  render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: { top: 0, right: 0, bottom: 0, left: 0 },
      }}
    >
      {ui}
    </SafeAreaProvider>,
  );

describe('TopBar', () => {
  test('renders title and subtitle', () => {
    const { getByText } = renderTopBar(<TopBar title="제목" subtitle="서브" />);
    expect(getByText('제목')).toBeTruthy();
    expect(getByText('서브')).toBeTruthy();
  });

  test('back button press triggers onBack', () => {
    const onBack = jest.fn();
    const { UNSAFE_getByType } = renderTopBar(
      <TopBar title="Title" onBack={onBack} />,
    );
    fireEvent.press(UNSAFE_getByType(Pressable));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
