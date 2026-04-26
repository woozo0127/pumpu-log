import { render } from '@testing-library/react-native';
import { StatTile } from '#/components/ui/stat-tile';

describe('StatTile', () => {
  test('wraps string label in StatTile.Label', () => {
    const { getByText } = render(<StatTile label="라벨" value={1} />);
    expect(getByText('라벨')).toBeTruthy();
  });

  test('wraps number value in StatTile.Value', () => {
    const { getByText } = render(<StatTile label="l" value={52} />);
    expect(getByText('52')).toBeTruthy();
  });

  test('wraps string unit in StatTile.Unit', () => {
    const { getByText } = render(<StatTile label="l" value={1} unit="kg" />);
    expect(getByText('kg')).toBeTruthy();
  });

  test('renders ReactNode value (typography override)', () => {
    const { getByText } = render(
      <StatTile
        label="l"
        value={<StatTile.Value typography="num-lg">52</StatTile.Value>}
      />,
    );
    expect(getByText('52')).toBeTruthy();
  });

  test('surface=true applies neutral[900] background', () => {
    const { UNSAFE_getByType } = render(
      <StatTile surface label="l" value={1} />,
    );
    const View = require('react-native').View;
    const node = UNSAFE_getByType(View);
    const flat = Array.isArray(node.props.style)
      ? Object.assign({}, ...node.props.style.filter(Boolean))
      : node.props.style;
    expect(flat.backgroundColor).toBe('#1A1A1A');
  });

  test('surface=false renders transparent', () => {
    const { UNSAFE_getByType } = render(<StatTile label="l" value={1} />);
    const View = require('react-native').View;
    const node = UNSAFE_getByType(View);
    const flat = Array.isArray(node.props.style)
      ? Object.assign({}, ...node.props.style.filter(Boolean))
      : node.props.style;
    expect(flat.backgroundColor).toBe('transparent');
  });
});
