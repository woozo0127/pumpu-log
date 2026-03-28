import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Separator } from '../separator';
import { Text } from '../text';
import { BottomSheet } from './index';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

const listItems = ['벤치프레스', '스쿼트', '데드리프트', '오버헤드 프레스', '바벨 로우'];

export const Default: Story = {
  render: () => (
    <View className="h-[600px] bg-background relative">
      <BottomSheet open={true}>
        <View className="gap-sm">
          {listItems.map((item, index) => (
            <View key={item}>
              <Text className="text-base text-foreground py-sm">{item}</Text>
              {index < listItems.length - 1 && <Separator />}
            </View>
          ))}
        </View>
      </BottomSheet>
    </View>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <View className="h-[600px] bg-background relative">
      <BottomSheet open={true} title="운동 목록">
        <View className="gap-sm">
          {listItems.map((item, index) => (
            <View key={item}>
              <Text className="text-base text-foreground py-sm">{item}</Text>
              {index < listItems.length - 1 && <Separator />}
            </View>
          ))}
        </View>
      </BottomSheet>
    </View>
  ),
};

export const StaticDisplay: Story = {
  render: () => (
    <View className="h-[600px] bg-background relative">
      <BottomSheet open={true} title="세트 추가">
        <View className="gap-md">
          <Text className="text-sm text-foreground-secondary">원하는 세트 수를 선택해주세요.</Text>
          {[1, 2, 3, 4, 5].map((n) => (
            <View key={n} className="p-md bg-card-hover rounded-md">
              <Text className="text-base text-foreground">{n}세트</Text>
            </View>
          ))}
        </View>
      </BottomSheet>
    </View>
  ),
};
