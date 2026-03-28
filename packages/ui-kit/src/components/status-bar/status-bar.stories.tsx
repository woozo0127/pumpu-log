import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { StatusBar } from './index';

const meta: Meta<typeof StatusBar> = {
  title: 'Navigation/StatusBar',
  component: StatusBar,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof StatusBar>;

export const Default: Story = {
  render: () => (
    <View className="bg-background w-[375px]">
      <StatusBar />
    </View>
  ),
};
