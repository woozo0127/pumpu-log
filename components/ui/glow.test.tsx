import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Glow } from '#/components/ui/glow';
import { theme } from '#/components/ui/theme';

describe('Glow', () => {
  test('renders children', () => {
    const { getByText } = render(
      <Glow>
        <Text>child</Text>
      </Glow>,
    );
    expect(getByText('child')).toBeTruthy();
  });

  test('default variant uses lime shadowColor', () => {
    const { UNSAFE_getByType } = render(
      <Glow>
        <Text>child</Text>
      </Glow>,
    );
    const view = UNSAFE_getByType(require('react-native').View);
    const flatStyle = Array.isArray(view.props.style)
      ? Object.assign({}, ...view.props.style.filter(Boolean))
      : view.props.style;
    expect(flatStyle.shadowColor).toBe(theme.shadow.glow.shadowColor);
  });

  test('color prop overrides shadowColor', () => {
    const { UNSAFE_getByType } = render(
      <Glow color="#ff0000">
        <Text>child</Text>
      </Glow>,
    );
    const view = UNSAFE_getByType(require('react-native').View);
    const flatStyle = Array.isArray(view.props.style)
      ? Object.assign({}, ...view.props.style.filter(Boolean))
      : view.props.style;
    expect(flatStyle.shadowColor).toBe('#ff0000');
  });

  test('color prop overrides shadowColor on variant="card"', () => {
    const { UNSAFE_getByType } = render(
      <Glow variant="card" color="#abc123">
        <Text>child</Text>
      </Glow>,
    );
    const view = UNSAFE_getByType(require('react-native').View);
    const flatStyle = Array.isArray(view.props.style)
      ? Object.assign({}, ...view.props.style.filter(Boolean))
      : view.props.style;
    expect(flatStyle.shadowColor).toBe('#abc123');
  });
});
