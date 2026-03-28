import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { IconButton } from './index';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    variant: 'default',
    icon: <Text style={{ fontSize: 20 }}>+</Text>,
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    icon: <Text style={{ fontSize: 20, color: '#0d1117' }}>+</Text>,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="flex-row gap-sm p-lg bg-background">
      <IconButton variant="default" icon={<Text style={{ fontSize: 20, color: '#f0f0f0' }}>+</Text>} />
      <IconButton variant="accent" icon={<Text style={{ fontSize: 20, color: '#0d1117' }}>+</Text>} />
    </View>
  ),
};

export const WithDifferentIcons: Story = {
  render: () => (
    <View className="flex-row gap-sm p-lg bg-background">
      <IconButton variant="default" icon={<Text style={{ fontSize: 18, color: '#f0f0f0' }}>✕</Text>} />
      <IconButton variant="default" icon={<Text style={{ fontSize: 18, color: '#f0f0f0' }}>✓</Text>} />
      <IconButton variant="accent" icon={<Text style={{ fontSize: 18, color: '#0d1117' }}>★</Text>} />
      <IconButton variant="accent" icon={<Text style={{ fontSize: 18, color: '#0d1117' }}>♥</Text>} />
    </View>
  ),
};
