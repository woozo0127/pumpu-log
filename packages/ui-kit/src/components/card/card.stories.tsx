import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '../text';
import { Card } from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <View className="p-lg bg-background w-72">
      <Card>
        <Text variant="h4">Card Title</Text>
        <Text variant="muted" className="mt-xs">
          This is some card content. Cards are used to group related information.
        </Text>
      </Card>
    </View>
  ),
};

export const WithMultipleItems: Story = {
  render: () => (
    <View className="p-lg bg-background w-72 gap-sm">
      <Card>
        <Text variant="h4">Workout Summary</Text>
        <Text variant="muted" className="mt-xs">
          Monday, March 23
        </Text>
        <View className="mt-md gap-xs">
          <Text variant="small">Bench Press — 3 sets × 10 reps</Text>
          <Text variant="small">Squat — 4 sets × 8 reps</Text>
          <Text variant="small">Deadlift — 3 sets × 5 reps</Text>
        </View>
      </Card>
      <Card>
        <Text variant="h4">Rest Day</Text>
        <Text variant="muted" className="mt-xs">
          No workout scheduled
        </Text>
      </Card>
    </View>
  ),
};
