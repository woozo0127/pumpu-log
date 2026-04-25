import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { palette } from '#/components/ui/theme';

export default function TabsLayout() {
  return (
    <NativeTabs tintColor={palette.lime[400]}>
      <NativeTabs.Trigger name="home">
        <Label>홈</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="programs">
        <Label>프로그램</Label>
        <Icon sf="dumbbell.fill" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="history">
        <Label>기록</Label>
        <Icon sf="list.bullet" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="stats">
        <Label>통계</Label>
        <Icon sf="chart.line.uptrend.xyaxis" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
