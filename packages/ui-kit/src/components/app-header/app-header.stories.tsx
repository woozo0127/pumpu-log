import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { AppHeader } from './index';
import { IconButton } from '../icon-button';
import { ChevronLeft, Search } from '~/lib/icons';

const meta: Meta<typeof AppHeader> = {
  title: 'Navigation/AppHeader',
  component: AppHeader,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const DefaultBranding: Story = {
  render: () => (
    <View className="bg-background w-[375px]">
      <AppHeader />
    </View>
  ),
};

export const WithBackButton: Story = {
  render: () => (
    <View className="bg-background w-[375px]">
      <AppHeader
        left={
          <IconButton
            variant="default"
            icon={<ChevronLeft size={20} color="#f0f0f0" />}
          />
        }
      />
    </View>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <View className="bg-background w-[375px]">
      <AppHeader title="프로그램" />
    </View>
  ),
};

export const WithActions: Story = {
  render: () => (
    <View className="bg-background w-[375px]">
      <AppHeader
        title="기록"
        left={
          <IconButton
            variant="default"
            icon={<ChevronLeft size={20} color="#f0f0f0" />}
          />
        }
        right={
          <IconButton
            variant="default"
            icon={<Search size={20} color="#f0f0f0" />}
          />
        }
      />
    </View>
  ),
};
