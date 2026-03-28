import { render, screen, fireEvent } from '~/test/test-utils';
import { HomeEmptyScreenContent } from '~/features/home/home-empty-screen';

const props = {
  greeting: '반가워요!',
  templates: [
    { id: 'tpl-phul', badge: '4D', name: 'PHUL', description: '파워 + 근비대 · 주 4일' },
    { id: 'tpl-ppl', badge: '6D', name: 'PPL', description: 'Push · Pull · Legs · 주 6일' },
    { id: 'tpl-upper-lower', badge: '4D', name: 'Upper / Lower', description: '상체 · 하체 분할 · 주 4일' },
  ],
  onSelectTemplate: jest.fn(),
  onCreateCustom: jest.fn(),
  onQuickStart: jest.fn(),
};

describe('HomeEmptyScreenContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders onboarding greeting', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('반가워요!')).toBeTruthy();
    expect(screen.getByText('어떤 프로그램으로 시작할까요?')).toBeTruthy();
  });

  it('renders program templates', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('PPL')).toBeTruthy();
    expect(screen.getByText('Upper / Lower')).toBeTruthy();
  });

  it('renders custom program button', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('나만의 프로그램 만들기')).toBeTruthy();
  });

  it('renders quick start card', () => {
    render(<HomeEmptyScreenContent {...props} />);
    expect(screen.getByText('빠른 시작')).toBeTruthy();
  });

  it('calls onCreateCustom when button pressed', () => {
    render(<HomeEmptyScreenContent {...props} />);
    fireEvent.press(screen.getByText('나만의 프로그램 만들기'));
    expect(props.onCreateCustom).toHaveBeenCalledTimes(1);
  });
});
