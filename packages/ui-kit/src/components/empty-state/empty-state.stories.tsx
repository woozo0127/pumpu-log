import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Dumbbell } from '~/lib/icons';
import { EmptyState } from './index';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <View className="bg-background p-lg w-80">
      <EmptyState
        icon={<Dumbbell size={32} className="text-foreground-secondary" />}
        title="운동 기록이 없습니다"
        description="첫 번째 운동을 기록해보세요. 매일 조금씩 성장하세요."
        actionLabel="운동 시작하기"
        onAction={() => {}}
      />
    </View>
  ),
};

export const WithoutAction: Story = {
  render: () => (
    <View className="bg-background p-lg w-80">
      <EmptyState
        icon={<Dumbbell size={32} className="text-foreground-secondary" />}
        title="운동 기록이 없습니다"
        description="첫 번째 운동을 기록해보세요."
      />
    </View>
  ),
};

export const MinimalContent: Story = {
  render: () => (
    <View className="bg-background p-lg w-80">
      <EmptyState title="데이터 없음" />
    </View>
  ),
};
