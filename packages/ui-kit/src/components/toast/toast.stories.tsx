import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { View } from 'react-native';
import { Toast } from './index';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: '운동이 저장되었습니다',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: '저장에 실패했습니다',
  },
};

export const WithDescription: Story = {
  render: () => (
    <View className="gap-md p-lg bg-background">
      <Toast
        variant="success"
        title="운동이 저장되었습니다"
        description="오늘의 운동 기록이 성공적으로 저장되었습니다."
      />
      <Toast
        variant="error"
        title="저장에 실패했습니다"
        description="네트워크 오류로 저장에 실패했습니다. 다시 시도해 주세요."
      />
    </View>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <View className="gap-md p-lg bg-background">
      <Toast variant="success" title="완료되었습니다" />
      <Toast variant="error" title="오류가 발생했습니다" />
    </View>
  ),
};

export const AllVariants: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    return (
      <View className="gap-md p-lg bg-background">
        <Toast
          variant="success"
          title="운동이 저장되었습니다"
          description="오늘의 운동 기록이 성공적으로 저장되었습니다."
          onClose={() => {}}
        />
        <Toast
          variant="error"
          title="저장에 실패했습니다"
          description="네트워크 오류가 발생했습니다."
          onClose={() => {}}
        />
        <Toast variant="success" title="닫기 버튼 없음" />
        {visible && (
          <Toast variant="error" title="닫을 수 있는 토스트" onClose={() => setVisible(false)} />
        )}
      </View>
    );
  },
};
