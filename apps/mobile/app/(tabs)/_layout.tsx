import { Tab, TabBar } from '@pumpu-log/ui-kit';
import { Tabs } from 'expo-router';
import { BarChart3, Dumbbell, History, Home } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <View className="bg-background pb-2">
          <TabBar>
            <Tab
              icon={<Home />}
              label="홈"
              active={state.index === 0}
              onPress={() => navigation.navigate('index')}
            />
            <Tab
              icon={<Dumbbell />}
              label="프로그램"
              active={state.index === 1}
              onPress={() => navigation.navigate('programs')}
            />
            <Tab
              icon={<History />}
              label="기록"
              active={state.index === 2}
              onPress={() => navigation.navigate('history')}
            />
            <Tab
              icon={<BarChart3 />}
              label="통계"
              active={state.index === 3}
              onPress={() => navigation.navigate('stats')}
            />
          </TabBar>
        </View>
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="programs" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="stats" />
    </Tabs>
  );
}
