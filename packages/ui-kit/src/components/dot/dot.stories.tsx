import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '../text';
import { Dot } from './index';

const meta: Meta<typeof Dot> = {
  title: 'Components/Dot',
  component: Dot,
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['lime', 'destructive', 'yellow', 'foreground-secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dot>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'lime',
  },
};

export const AllSizes: Story = {
  render: () => (
    <View className="p-lg bg-background gap-md">
      <Text variant="small" className="text-foreground-secondary">
        Sizes
      </Text>
      <View className="flex-row items-center gap-md">
        <Dot size="sm" />
        <Dot size="md" />
        <Dot size="lg" />
      </View>
    </View>
  ),
};

export const AllColors: Story = {
  render: () => (
    <View className="p-lg bg-background gap-md">
      <Text variant="small" className="text-foreground-secondary">
        Colors
      </Text>
      <View className="flex-row items-center gap-md">
        <Dot color="lime" size="lg" />
        <Dot color="destructive" size="lg" />
        <Dot color="yellow" size="lg" />
        <Dot color="foreground-secondary" size="lg" />
      </View>
    </View>
  ),
};
