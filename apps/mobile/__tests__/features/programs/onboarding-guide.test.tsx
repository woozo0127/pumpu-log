import { render, screen } from '~/test/test-utils';
import { OnboardingGuide } from '~/features/programs/components/onboarding-guide';

describe('OnboardingGuide', () => {
  it('renders guide title', () => {
    render(<OnboardingGuide />);
    expect(screen.getByText('3단계면 시작할 수 있어요')).toBeTruthy();
  });

  it('renders all three steps', () => {
    render(<OnboardingGuide />);
    expect(screen.getByText('프로그램 선택')).toBeTruthy();
    expect(screen.getByText('루틴 구성')).toBeTruthy();
    expect(screen.getByText('운동 시작!')).toBeTruthy();
  });

  it('renders step descriptions', () => {
    render(<OnboardingGuide />);
    expect(screen.getByText('추천 템플릿 또는 직접 만들기')).toBeTruthy();
    expect(screen.getByText('Day별 운동 종목 배치')).toBeTruthy();
    expect(screen.getByText('홈에서 오늘의 운동 바로 시작')).toBeTruthy();
  });
});
