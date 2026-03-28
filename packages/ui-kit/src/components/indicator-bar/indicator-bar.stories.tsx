import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { IndicatorBar } from './index';
import { Text } from '../text';

const meta: Meta<typeof IndicatorBar> = {
  title: 'Components/IndicatorBar',
  component: IndicatorBar,
  parameters: { layout: 'centered' },
  argTypes: {
    color: {
      control: 'select',
      options: ['lime', 'destructive', 'yellow'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IndicatorBar>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    color: 'lime',
  },
};

export const Full: Story = {
  args: {
    value: 5,
    max: 5,
    color: 'lime',
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    max: 5,
    color: 'lime',
  },
};

export const AllColors: Story = {
  render: () => (
    <View className="bg-background p-lg w-80 gap-md">
      <Text variant="small" className="text-foreground-secondary">Lime (default)</Text>
      <IndicatorBar value={3} max={5} color="lime" />
      <Text variant="small" className="text-foreground-secondary">Destructive</Text>
      <IndicatorBar value={3} max={5} color="destructive" />
      <Text variant="small" className="text-foreground-secondary">Yellow</Text>
      <IndicatorBar value={3} max={5} color="yellow" />
    </View>
  ),
};
