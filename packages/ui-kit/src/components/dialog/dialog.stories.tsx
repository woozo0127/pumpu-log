import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { View } from 'react-native';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  AlertDialog,
} from './index';
import { Button } from '../button';
import { Text } from '../text';

const meta: Meta = {
  title: 'Components/Dialog',
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

export const BasicDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <View className="p-lg bg-background">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">
              <Text className="font-semibold text-foreground">다이얼로그 열기</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>운동 기록 저장</DialogTitle>
              <DialogDescription>
                오늘의 운동 기록을 저장하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" size="sm">
                  <Text className="font-semibold text-foreground text-sm">취소</Text>
                </Button>
              </DialogClose>
              <Button size="sm" onPress={() => setOpen(false)}>
                <Text className="font-semibold text-foreground-on-color text-sm">저장</Text>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

export const DestructiveDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <View className="p-lg bg-background">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Text className="font-semibold text-foreground">삭제하기</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>기록 삭제</DialogTitle>
              <DialogDescription>
                이 운동 기록을 삭제하면 복구할 수 없습니다. 계속하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" size="sm">
                  <Text className="font-semibold text-foreground text-sm">취소</Text>
                </Button>
              </DialogClose>
              <Button variant="destructive" size="sm" onPress={() => setOpen(false)}>
                <Text className="font-semibold text-foreground text-sm">삭제</Text>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  },
};

export const AlertDialogExample: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [destructiveOpen, setDestructiveOpen] = React.useState(false);
    return (
      <View className="gap-sm p-lg bg-background">
        <Button variant="secondary" onPress={() => setOpen(true)}>
          <Text className="font-semibold text-foreground">기본 AlertDialog</Text>
        </Button>
        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="확인이 필요합니다"
          description="이 작업을 계속 진행하시겠습니까?"
          cancelText="취소"
          confirmText="확인"
          onConfirm={() => setOpen(false)}
        />

        <Button variant="destructive" onPress={() => setDestructiveOpen(true)}>
          <Text className="font-semibold text-foreground">삭제 AlertDialog</Text>
        </Button>
        <AlertDialog
          open={destructiveOpen}
          onOpenChange={setDestructiveOpen}
          title="정말 삭제하시겠습니까?"
          description="이 작업은 취소할 수 없습니다."
          cancelText="취소"
          confirmText="삭제"
          variant="destructive"
          onConfirm={() => setDestructiveOpen(false)}
        />
      </View>
    );
  },
};
