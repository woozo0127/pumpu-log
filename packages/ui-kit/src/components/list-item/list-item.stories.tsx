import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { ListItem } from './index';
import { Dumbbell, Trophy, Timer } from '~/lib/icons';
import { Text } from '../text';

const meta: Meta<typeof ListItem> = {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Default: Story = {
  render: () => (
    <View className="bg-background w-80">
      <ListItem title="Bench Press" />
    </View>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <View className="bg-background w-80">
      <ListItem
        icon={<Dumbbell size={20} color="#a3e635" />}
        title="Bench Press"
      />
    </View>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <View className="bg-background w-80">
      <ListItem
        icon={<Trophy size={20} color="#fbbf24" />}
        title="Personal Record"
        subtitle="100kg × 5 reps"
      />
    </View>
  ),
};

export const WithCustomRight: Story = {
  render: () => (
    <View className="bg-background w-80">
      <ListItem
        icon={<Timer size={20} color="#a3e635" />}
        title="Rest Timer"
        subtitle="90 seconds"
        rightElement={<Text variant="small" className="text-lime">On</Text>}
      />
    </View>
  ),
};

export const NoRightElement: Story = {
  render: () => (
    <View className="bg-background w-80">
      <ListItem
        title="No Chevron"
        subtitle="rightElement set to null"
        rightElement={null}
      />
    </View>
  ),
};

export const ListGroup: Story = {
  render: () => (
    <View className="bg-background w-80 gap-[2px]">
      <ListItem
        icon={<Dumbbell size={20} color="#a3e635" />}
        title="Bench Press"
        subtitle="Chest"
      />
      <ListItem
        icon={<Dumbbell size={20} color="#a3e635" />}
        title="Squat"
        subtitle="Legs"
      />
      <ListItem
        icon={<Trophy size={20} color="#fbbf24" />}
        title="Deadlift"
        subtitle="Back"
      />
    </View>
  ),
};
