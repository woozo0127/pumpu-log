import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SwipeDelete } from './index';
import { Text } from '../text';

const meta: Meta<typeof SwipeDelete> = {
  title: 'Components/SwipeDelete',
  component: SwipeDelete,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof SwipeDelete>;

export const Default: Story = {
  render: () => (
    <View className="bg-background p-lg w-80">
      <SwipeDelete onDelete={() => {}}>
        <View className="bg-card p-md rounded-md">
          <Text variant="p">스쿼트 3세트 × 10회</Text>
        </View>
      </SwipeDelete>
    </View>
  ),
};

export const DeleteVisible: Story = {
  render: () => (
    <View className="bg-background p-lg w-80">
      <SwipeDelete showDelete onDelete={() => {}}>
        <View className="bg-card p-md rounded-md">
          <Text variant="p">스쿼트 3세트 × 10회</Text>
        </View>
      </SwipeDelete>
    </View>
  ),
};
