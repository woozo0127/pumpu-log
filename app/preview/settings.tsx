import type React from 'react';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  ListRow,
  ScreenContainer,
  Switch,
  Text,
  ToggleGroup,
  TopBar,
} from '#/components/ui';
import { palette, theme } from '#/components/ui/theme';

type Unit = 'kg' | 'lb';

export default function SettingsPreview() {
  const [unit, setUnit] = useState<Unit>('kg');
  const [autoStart, setAutoStart] = useState(true);
  const [restAlert, setRestAlert] = useState(true);
  const [haptics, setHaptics] = useState(true);
  const [sound, setSound] = useState(false);

  return (
    <ScreenContainer header={<TopBar title="설정" />}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
      >
        <Section title="운동">
          <ListRow
            title="단위"
            trailing={
              <ToggleGroup type="single" value={unit} onValueChange={setUnit}>
                <ToggleGroup.Item value="kg">kg</ToggleGroup.Item>
                <ToggleGroup.Item value="lb">lb</ToggleGroup.Item>
              </ToggleGroup>
            }
            divider
          />
          <ListRow
            title="자동 휴식 타이머"
            subtitle="세트 완료 시 자동 시작"
            trailing={<Switch value={autoStart} onValueChange={setAutoStart} />}
            divider
          />
          <ListRow
            title="휴식 종료 알림"
            subtitle="진동 + 알림으로 알려요"
            trailing={<Switch value={restAlert} onValueChange={setRestAlert} />}
            divider
          />
          <ListRow
            title="햅틱 피드백"
            subtitle="버튼 탭 시 진동"
            trailing={<Switch value={haptics} onValueChange={setHaptics} />}
            divider
          />
          <ListRow
            title="사운드"
            subtitle="휴식 종료음"
            trailing={<Switch value={sound} onValueChange={setSound} />}
          />
        </Section>

        <Section title="데이터">
          <ListRow
            title="데이터 내보내기"
            subtitle="CSV로 받기"
            chevron
            divider
            onPress={() => {}}
          />
          <ListRow
            title={
              <Text
                typography="body"
                weight="semibold"
                color={palette.red[400]}
              >
                모든 기록 초기화
              </Text>
            }
            chevron
            onPress={() => {}}
          />
        </Section>

        <Section title="앱">
          <ListRow
            title="테마"
            trailing={
              <Text typography="caption" color={palette.alpha['white-55']}>
                다크
              </Text>
            }
            chevron
            divider
            onPress={() => {}}
          />
          <ListRow
            title="언어"
            trailing={
              <Text typography="caption" color={palette.alpha['white-55']}>
                한국어
              </Text>
            }
            chevron
            onPress={() => {}}
          />
        </Section>

        <Section title="정보">
          <ListRow title="도움말 · 피드백" chevron divider onPress={() => {}} />
          <ListRow title="이용약관" chevron divider onPress={() => {}} />
          <ListRow
            title="개인정보 처리방침"
            chevron
            divider
            onPress={() => {}}
          />
          <ListRow
            title="버전"
            trailing={
              <Text typography="caption" color={palette.alpha['white-55']}>
                1.0.4
              </Text>
            }
          />
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ paddingTop: 24 }}>
      <Text
        typography="label"
        color={palette.alpha['white-55']}
        style={{ marginBottom: 8, paddingLeft: 4 }}
      >
        {title}
      </Text>
      <View
        style={{
          backgroundColor: palette.neutral[900],
          borderRadius: theme.radius.xl,
          borderWidth: 1,
          borderColor: palette.alpha['white-7'],
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </View>
  );
}
