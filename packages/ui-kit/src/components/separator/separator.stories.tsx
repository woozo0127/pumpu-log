import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '../text';
import { Separator } from './index';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <View className="p-lg bg-background w-72 gap-md">
      <Text variant="p">Above the separator</Text>
      <Separator />
      <Text variant="p">Below the separator</Text>
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View className="p-lg bg-background flex-row items-center gap-md h-16">
      <Text variant="p">Left</Text>
      <Separator orientation="vertical" />
      <Text variant="p">Right</Text>
    </View>
  ),
};
