import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { SectionHeader } from './index';

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const Default: Story = {
  render: () => (
    <View className="bg-background p-lg w-80">
      <SectionHeader title="최근 운동" actionLabel="전체보기" onAction={() => {}} />
    </View>
  ),
};

export const WithoutAction: Story = {
  render: () => (
    <View className="bg-background p-lg w-80">
      <SectionHeader title="최근 운동" />
    </View>
  ),
};
