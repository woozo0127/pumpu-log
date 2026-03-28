import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    checked: false,
    onCheckedChange: () => {},
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    onCheckedChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    onCheckedChange: () => {},
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    return (
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};
