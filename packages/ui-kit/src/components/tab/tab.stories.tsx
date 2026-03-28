import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { BarChart3, Calendar, Home, LayoutGrid } from '~/lib/icons';
import { Tab } from './index';

const meta: Meta<typeof Tab> = {
  title: 'Navigation/Tab',
  component: Tab,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const ActiveTab: Story = {
  render: () => (
    <View className="bg-background p-lg">
      <Tab icon={<Home />} label="홈" active />
    </View>
  ),
};

export const InactiveTab: Story = {
  render: () => (
    <View className="bg-background p-lg">
      <Tab icon={<Home />} label="홈" active={false} />
    </View>
  ),
};

export const AllTabs: Story = {
  render: () => (
    <View className="flex-row bg-background p-lg gap-sm">
      <Tab icon={<Home />} label="홈" active />
      <Tab icon={<LayoutGrid />} label="프로그램" />
      <Tab icon={<Calendar />} label="기록" />
      <Tab icon={<BarChart3 />} label="통계" />
    </View>
  ),
};
