import { fireEvent, render, screen } from '~/test/test-utils';
import { CreateProgramDaysContent } from '~/features/create-program/create-program-days';

describe('CreateProgramDaysContent', () => {
  const props = {
    programName: 'PHUL',
    days: [
      { id: 'd1', name: 'Day 1 — 상체 파워', description: '벤치프레스, 오버헤드 프레스 외 3개' },
      { id: 'd2', name: 'Day 2 — 하체 파워', description: '스쿼트, 레그 프레스 외 3개' },
    ],
    onBack: jest.fn(),
    onDone: jest.fn(),
    onDayPress: jest.fn(),
    onAddDay: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders header with program name', () => {
    render(<CreateProgramDaysContent {...props} />);
    expect(screen.getByText('PHUL')).toBeTruthy();
    expect(screen.getByText('완료')).toBeTruthy();
  });

  it('renders day list', () => {
    render(<CreateProgramDaysContent {...props} />);
    expect(screen.getByText('Day 구성')).toBeTruthy();
    expect(screen.getByText('Day 1 — 상체 파워')).toBeTruthy();
    expect(screen.getByText('Day 2 — 하체 파워')).toBeTruthy();
  });

  it('renders day descriptions', () => {
    render(<CreateProgramDaysContent {...props} />);
    expect(screen.getByText('벤치프레스, 오버헤드 프레스 외 3개')).toBeTruthy();
    expect(screen.getByText('스쿼트, 레그 프레스 외 3개')).toBeTruthy();
  });

  it('renders add day button', () => {
    render(<CreateProgramDaysContent {...props} />);
    expect(screen.getByText('Day 추가')).toBeTruthy();
  });

  it('calls onDone when 완료 pressed', () => {
    render(<CreateProgramDaysContent {...props} />);
    fireEvent.press(screen.getByText('완료'));
    expect(props.onDone).toHaveBeenCalledTimes(1);
  });

  it('calls onAddDay when add button pressed', () => {
    render(<CreateProgramDaysContent {...props} />);
    fireEvent.press(screen.getByText('Day 추가'));
    expect(props.onAddDay).toHaveBeenCalledTimes(1);
  });
});
