import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '../text';
import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Active',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="p-lg bg-background gap-md">
      <Text variant="small" className="text-foreground-secondary mb-xs">
        Default size
      </Text>
      <View className="flex-row gap-sm flex-wrap">
        <Badge variant="default">Active</Badge>
        <Badge variant="secondary">Warning</Badge>
        <Badge variant="destructive">Error</Badge>
      </View>
      <Text variant="small" className="text-foreground-secondary mb-xs mt-sm">
        Small size
      </Text>
      <View className="flex-row gap-sm flex-wrap">
        <Badge variant="default" size="sm">
          Active
        </Badge>
        <Badge variant="secondary" size="sm">
          Warning
        </Badge>
        <Badge variant="destructive" size="sm">
          Error
        </Badge>
      </View>
    </View>
  ),
};

export const VariantDefault: Story = {
  args: { variant: 'default', children: 'Active' },
};

export const VariantSecondary: Story = {
  args: { variant: 'secondary', children: 'Warning' },
};

export const VariantDestructive: Story = {
  args: { variant: 'destructive', children: 'Error' },
};

export const SizeSmall: Story = {
  args: { variant: 'default', size: 'sm', children: 'Small' },
};
