import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Input } from './index';
import { Search } from '~/lib/icons';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    error: { control: 'boolean' },
    editable: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View className="p-lg bg-background w-72">
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: <Search size={18} color="#6b7280" />,
  },
};

export const Filled: Story = {
  args: {
    defaultValue: 'Some value',
    placeholder: 'Enter text...',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Enter text...',
    defaultValue: 'Invalid input',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    editable: false,
  },
};
