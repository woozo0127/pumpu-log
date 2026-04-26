import { Link } from 'expo-router';
import { View } from 'react-native';
import { ScreenContainer } from '#/components/ui/screen-container';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

const ENTRIES: { href: string; label: string }[] = [
  { href: '/preview/gallery', label: 'UI Kit Gallery' },
  { href: '/preview/home', label: 'Preview · Home' },
  { href: '/preview/routine', label: 'Preview · Routine' },
  { href: '/preview/workout', label: 'Preview · Workout' },
  { href: '/preview/tabs/home', label: 'Preview · Native Tabs (Liquid Glass)' },
];

export default function PreviewIndex() {
  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: theme.space.md,
          paddingHorizontal: 20,
        }}
      >
        <Text typography="title" color={palette.neutral[0]}>
          Preview · 디자인 시스템 진열장
        </Text>
        <View style={{ gap: 8, marginTop: theme.space.md }}>
          {ENTRIES.map((e) => (
            <Link
              key={e.href}
              href={e.href as never}
              style={{
                padding: theme.space.lg,
                backgroundColor: palette.neutral[900],
                borderRadius: theme.radius.lg,
                borderWidth: 1,
                borderColor: palette.alpha['white-7'],
                color: palette.neutral[0],
              }}
            >
              {e.label}
            </Link>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
}
