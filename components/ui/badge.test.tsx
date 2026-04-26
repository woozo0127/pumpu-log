import { render } from '@testing-library/react-native';
import { Badge } from '#/components/ui/badge';

describe('Badge', () => {
  test('default size is medium', () => {
    const { UNSAFE_getByType } = render(<Badge>label</Badge>);
    const View = require('react-native').View;
    const node = UNSAFE_getByType(View);
    const flat = Array.isArray(node.props.style)
      ? Object.assign({}, ...node.props.style.filter(Boolean))
      : node.props.style;
    expect(flat.height).toBe(22);
  });

  test('size="small" yields height 18', () => {
    const { UNSAFE_getByType } = render(<Badge size="small">label</Badge>);
    const View = require('react-native').View;
    const node = UNSAFE_getByType(View);
    const flat = Array.isArray(node.props.style)
      ? Object.assign({}, ...node.props.style.filter(Boolean))
      : node.props.style;
    expect(flat.height).toBe(18);
  });
});
