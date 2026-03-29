import { Checkbox, Text } from '@pumpu-log/ui-kit';
import { View } from 'react-native';

interface SetRowProps {
  setNumber: number;
  weight: number;
  reps: number;
  isCompleted: boolean;
  onToggle: () => void;
}

export function SetRow({ setNumber, weight, reps, isCompleted, onToggle }: SetRowProps) {
  return (
    <View className="flex-row items-center bg-card rounded-md border border-border px-lg py-md">
      <Text
        className={`text-[13px] font-semibold text-center w-9 ${
          isCompleted ? 'text-lime' : 'text-foreground-tertiary'
        }`}
      >
        {String(setNumber)}
      </Text>
      <Text
        className={`text-[15px] font-bold text-center flex-1 ${
          isCompleted ? 'text-foreground' : 'text-foreground-secondary'
        }`}
      >
        {String(weight)}
      </Text>
      <Text
        className={`text-[15px] font-bold text-center flex-1 ${
          isCompleted ? 'text-foreground' : 'text-foreground-secondary'
        }`}
      >
        {String(reps)}
      </Text>
      <Checkbox checked={isCompleted} onCheckedChange={onToggle} />
    </View>
  );
}
