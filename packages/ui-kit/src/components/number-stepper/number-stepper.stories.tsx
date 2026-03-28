import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { View } from 'react-native';
import { NumberStepper } from './index';

const meta: Meta<typeof NumberStepper> = {
  title: 'Components/NumberStepper',
  component: NumberStepper,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <View className="p-lg bg-background">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NumberStepper>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    return <NumberStepper value={value} onValueChange={setValue} />;
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = React.useState(5);
    return <NumberStepper value={value} onValueChange={setValue} min={0} max={10} />;
  },
};

export const CustomStep: Story = {
  render: () => {
    const [value, setValue] = React.useState(70);
    return <NumberStepper value={value} onValueChange={setValue} min={0} max={300} step={0.5} />;
  },
};
