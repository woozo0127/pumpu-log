import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { BarChart3, Calendar, Home, LayoutGrid } from '~/lib/icons';
import { Tab } from '../tab';
import { TabBar } from './index';

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
