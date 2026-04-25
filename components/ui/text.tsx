import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import { palette } from '#/components/ui/theme';
import {
  type FontWeight,
  fontWeight,
  type TypographyToken,
  typography,
} from '#/components/ui/typography';

type TextProps = RNTextProps & {
  typography?: TypographyToken;
  color?: string;
  weight?: FontWeight;
  align?: 'left' | 'center' | 'right';
};

export function Text({
  typography: typo = 'body',
  color = palette.neutral[0],
  weight,
  align,
  style,
  ...rest
}: TextProps) {
  const base = typography[typo];
  const overrides: TextStyle = {
    color,
    ...(weight ? { fontWeight: fontWeight[weight] } : null),
    ...(align ? { textAlign: align } : null),
  };
  return <RNText style={[base, overrides, style]} {...rest} />;
}
