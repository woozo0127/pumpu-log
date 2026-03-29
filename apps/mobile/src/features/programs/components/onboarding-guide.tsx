import { Text } from '@pumpu-log/ui-kit';
import { View } from 'react-native';

interface StepProps {
  number: number;
  title: string;
  description: string;
  isActive: boolean;
}

function Step({ number, title, description, isActive }: StepProps) {
  return (
    <View className="flex-row items-center gap-md">
      <View
        className={`w-7 h-7 rounded-full items-center justify-center ${
          isActive ? 'bg-lime' : 'bg-border-subtle'
        }`}
      >
        <Text
          className={`text-[13px] font-bold ${
            isActive ? 'text-foreground-on-color' : 'text-foreground-secondary'
          }`}
        >
          {String(number)}
        </Text>
      </View>
      <View className="flex-1 gap-[1px]">
        <Text
          className={`text-sm font-semibold ${
            isActive ? 'text-foreground' : 'text-foreground-secondary'
          }`}
        >
          {title}
        </Text>
        <Text
          className={`text-xs ${isActive ? 'text-foreground-secondary' : 'text-foreground-tertiary'}`}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

export function OnboardingGuide() {
  return (
    <View className="bg-card rounded-lg border border-border-subtle gap-lg p-xl">
      <Text className="text-base font-bold text-foreground">3단계면 시작할 수 있어요</Text>
      <Step number={1} title="프로그램 선택" description="추천 템플릿 또는 직접 만들기" isActive />
      <Step number={2} title="루틴 구성" description="Day별 운동 종목 배치" isActive={false} />
      <Step
        number={3}
        title="운동 시작!"
        description="홈에서 오늘의 운동 바로 시작"
        isActive={false}
      />
    </View>
  );
}
