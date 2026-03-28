import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '../text';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: (
      <Text variant="p" className="font-semibold text-foreground-on-color">
        Button
      </Text>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-sm p-lg bg-background">
      <Button variant="default">
        <Text variant="p" className="font-semibold text-foreground-on-color">
          Default
        </Text>
      </Button>
      <Button variant="secondary">
        <Text variant="p" className="font-semibold text-foreground">
          Secondary
        </Text>
      </Button>
      <Button variant="destructive">
        <Text variant="p" className="font-semibold text-foreground">
          Destructive
        </Text>
      </Button>
      <Button variant="outline">
        <Text variant="p" className="font-semibold text-foreground">
          Outline
        </Text>
      </Button>
      <Button variant="ghost">
        <Text variant="p" className="font-semibold text-foreground">
          Ghost
        </Text>
      </Button>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View className="gap-sm p-lg bg-background items-center">
      <Button size="sm">
        <Text variant="small" className="font-semibold text-foreground-on-color">
          Small
        </Text>
      </Button>
      <Button size="default">
        <Text variant="p" className="font-semibold text-foreground-on-color">
          Default
        </Text>
      </Button>
      <Button size="lg">
        <Text variant="large" className="font-semibold text-foreground-on-color">
          Large
        </Text>
      </Button>
    </View>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <View className="gap-sm p-lg bg-background">
      <Button variant="default" disabled>
        <Text variant="p" className="font-semibold text-foreground-on-color">
          Disabled Default
        </Text>
      </Button>
      <Button variant="secondary" disabled>
        <Text variant="p" className="font-semibold text-foreground">
          Disabled Secondary
        </Text>
      </Button>
      <Button variant="outline" disabled>
        <Text variant="p" className="font-semibold text-foreground">
          Disabled Outline
        </Text>
      </Button>
    </View>
  ),
};

export const LoadingState: Story = {
  args: {
    variant: 'default',
    loading: true,
  },
};
