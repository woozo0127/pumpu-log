import { fireEvent, render, screen } from '~/test/test-utils';
import { ProgramsEmptyScreenContent } from '~/features/programs/programs-empty-screen';

const props = {
  popularPrograms: [
    { id: 'tpl-phul', name: 'PHUL', description: '파워 + 근비대 균형 · 중급자 추천' },
    { id: 'tpl-ppl', name: 'PPL', description: '볼륨 극대화 · 상급자 추천' },
    { id: 'tpl-upper-lower', name: 'Upper / Lower', description: '심플한 분할 · 초급자 추천' },
  ],
  onCreateProgram: jest.fn(),
  onSelectPopular: jest.fn(),
};

describe('ProgramsEmptyScreenContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', () => {
    render(<ProgramsEmptyScreenContent {...props} />);
    expect(screen.getByText('프로그램')).toBeTruthy();
  });

  it('renders onboarding guide', () => {
    render(<ProgramsEmptyScreenContent {...props} />);
    expect(screen.getByText('3단계면 시작할 수 있어요')).toBeTruthy();
  });

  it('renders create button', () => {
    render(<ProgramsEmptyScreenContent {...props} />);
    expect(screen.getByText('프로그램 만들기')).toBeTruthy();
  });

  it('renders popular programs', () => {
    render(<ProgramsEmptyScreenContent {...props} />);
    expect(screen.getByText('인기 프로그램')).toBeTruthy();
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('PPL')).toBeTruthy();
    expect(screen.getByText('Upper / Lower')).toBeTruthy();
  });

  it('calls onCreateProgram when button pressed', () => {
    render(<ProgramsEmptyScreenContent {...props} />);
    fireEvent.press(screen.getByText('프로그램 만들기'));
    expect(props.onCreateProgram).toHaveBeenCalledTimes(1);
  });
});
