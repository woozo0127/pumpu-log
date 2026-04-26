import { BlurView } from 'expo-blur';
import { type ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

const BEZIER = Easing.bezier(0.32, 0.72, 0.24, 1.1);

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
};

function Root({ open, onClose, children, header, footer }: BottomSheetProps) {
  const [mounted, setMounted] = useState(open);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(24);

  useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = withTiming(1, { duration: 240, easing: BEZIER });
      translateY.value = withTiming(0, { duration: 360, easing: BEZIER });
    } else if (mounted) {
      opacity.value = withTiming(0, { duration: 240, easing: BEZIER });
      translateY.value = withTiming(
        24,
        { duration: 260, easing: BEZIER },
        (finished) => {
          if (finished) {
            runOnJS(setMounted)(false);
          }
        },
      );
    }
  }, [open, mounted, opacity, translateY]);

  const scrimStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const sheetStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!mounted) return null;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      <Pressable
        testID="bottom-sheet-scrim"
        style={StyleSheet.absoluteFillObject}
        onPress={onClose}
      >
        <Animated.View style={[StyleSheet.absoluteFillObject, scrimStyle]}>
          <BlurView
            intensity={50}
            tint="dark"
            style={StyleSheet.absoluteFillObject}
          >
            <View
              style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: 'rgba(0,0,0,0.62)' },
              ]}
            />
          </BlurView>
        </Animated.View>
      </Pressable>
      <View style={styles.bottomWrap} pointerEvents="box-none">
        <Animated.View style={[styles.sheet, sheetStyle]}>
          {header ? (
            <View style={{ marginBottom: theme.space.sm, gap: 8 }}>
              {header}
            </View>
          ) : null}
          {children}
          {footer ? (
            <View style={{ marginTop: theme.space.xl, gap: 10 }}>{footer}</View>
          ) : null}
        </Animated.View>
      </View>
    </View>
  );
}

function Eyebrow({ color, children }: { color?: string; children: ReactNode }) {
  return (
    <Text typography="label" color={color ?? palette.lime[400]}>
      {children}
    </Text>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <Text typography="subtitle" color={palette.neutral[0]}>
      {children}
    </Text>
  );
}

function Description({ children }: { children: ReactNode }) {
  return (
    <Text typography="body" color={palette.alpha['white-55']}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  bottomWrap: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 28,
  },
  sheet: {
    backgroundColor: palette.neutral[900],
    borderRadius: theme.radius['3xl'],
    borderWidth: 1,
    borderColor: palette.alpha['white-7'],
    padding: theme.space.xl,
  },
});

export const BottomSheet = Object.assign(Root, {
  Eyebrow,
  Title,
  Description,
});
