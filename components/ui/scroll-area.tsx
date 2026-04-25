import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, type ScrollViewProps, View } from 'react-native';
import { palette } from '#/components/ui/theme';

type ScrollAreaProps = ScrollViewProps & {
  orientation?: 'horizontal' | 'vertical';
  fadeEdges?: boolean;
};

export function ScrollArea({
  orientation = 'vertical',
  fadeEdges,
  children,
  style,
  contentContainerStyle,
  ...rest
}: ScrollAreaProps) {
  const horizontal = orientation === 'horizontal';
  return (
    <View style={style}>
      <ScrollView
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        {...rest}
      >
        {children}
      </ScrollView>
      {fadeEdges ? (
        <>
          <LinearGradient
            colors={[palette.neutral[900], 'rgba(26,26,26,0)']}
            start={horizontal ? { x: 0, y: 0.5 } : { x: 0.5, y: 0 }}
            end={horizontal ? { x: 1, y: 0.5 } : { x: 0.5, y: 1 }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              ...(horizontal
                ? { top: 0, bottom: 0, left: 0, width: 16 }
                : { left: 0, right: 0, top: 0, height: 16 }),
            }}
          />
          <LinearGradient
            colors={['rgba(26,26,26,0)', palette.neutral[900]]}
            start={horizontal ? { x: 0, y: 0.5 } : { x: 0.5, y: 0 }}
            end={horizontal ? { x: 1, y: 0.5 } : { x: 0.5, y: 1 }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              ...(horizontal
                ? { top: 0, bottom: 0, right: 0, width: 24 }
                : { left: 0, right: 0, bottom: 0, height: 24 }),
            }}
          />
        </>
      ) : null}
    </View>
  );
}
