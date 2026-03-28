import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { TabBar } from './index';
import { Tab } from '../tab';
import { Home, LayoutGrid, Calendar, BarChart3 } from '~/lib/icons';

const meta: Meta<typeof TabBar> = {
  title: 'Navigation/TabBar',
  component: TabBar,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof TabBar>;

export const Default: Story = {
  render: () => (
    <View className="bg-background p-lg">
      <TabBar>
        <Tab icon={<Home />} label="홈" active />
        <Tab icon={<LayoutGrid />} label="프로그램" />
        <Tab icon={<Calendar />} label="기록" />
        <Tab icon={<BarChart3 />} label="통계" />
      </TabBar>
    </View>
  ),
};
