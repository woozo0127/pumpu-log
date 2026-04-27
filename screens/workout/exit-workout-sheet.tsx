import { StyleSheet, View } from 'react-native';
import { Button, palette, Text, theme } from '#/components/ui';

type ExitWorkoutSheetProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export function ExitWorkoutSheet({
  onCancel,
  onConfirm,
}: ExitWorkoutSheetProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <View style={{ gap: theme.space.sm }}>
          <Text typography="heading" color={palette.neutral[0]}>
            운동을 종료할까요?
          </Text>
          <Text typography="body" color={palette.alpha['white-55']}>
            저장하지 않은 진행 상태는 사라집니다.
          </Text>
        </View>
        <View style={styles.actions}>
          <Button variant="secondary" onPress={onCancel} style={styles.action}>
            계속하기
          </Button>
          <Button
            variant="destructive"
            onPress={onConfirm}
            style={styles.action}
          >
            종료
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.space.lg,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  card: {
    gap: theme.space.lg,
    padding: theme.space.lg,
    borderRadius: theme.radius['2xl'],
    backgroundColor: palette.neutral[900],
    borderWidth: 1,
    borderColor: palette.alpha['white-7'],
  },
  actions: {
    flexDirection: 'row',
    gap: theme.space.sm,
  },
  action: {
    flex: 1,
  },
});
