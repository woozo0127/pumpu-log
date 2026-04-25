import { LinearGradient } from 'expo-linear-gradient';
import { View, type ViewProps } from 'react-native';
import { palette, theme } from '#/components/ui/theme';

type GradientHeroProps = ViewProps & {
  rounded?: 'bottom' | 'all' | 'none';
  glow?: boolean;
  colors?: readonly [string, string];
};

export function GradientHero({
  rounded = 'all',
  glow,
  colors = [palette.lime[400], palette.orange[400]],
  style,
  children,
  ...rest
}: GradientHeroProps) {
  const radius =
    rounded === 'all'
      ? theme.radius['3xl']
      : rounded === 'bottom'
        ? {
            borderBottomLeftRadius: theme.radius['3xl'],
            borderBottomRightRadius: theme.radius['3xl'],
          }
        : 0;
  return (
    <View
      style={[
        typeof radius === 'number'
          ? { borderRadius: radius, overflow: 'hidden' }
          : { ...radius, overflow: 'hidden' },
        style,
      ]}
      {...rest}
    >
      <LinearGradient
        colors={[colors[0], colors[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: theme.space.xl }}
      >
        {glow ? (
          <View
            style={{
              position: 'absolute',
              right: -60,
              bottom: -60,
              width: 240,
              height: 240,
              borderRadius: 120,
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}
          />
        ) : null}
        {children}
      </LinearGradient>
    </View>
  );
}
