import { render, screen } from '~/test/test-utils';
import { ProgramsScreenContent } from '~/features/programs/programs-screen';

const props = {
  activeProgram: {
    name: 'PHUL',
    dayProgress: '2 / 4',
    days: [
      { name: 'Day 1 · 상체 파워', isCompleted: true },
      { name: 'Day 2 · 하체 파워', isCurrent: true },
      { name: 'Day 3 · 상체 근비대' },
      { name: 'Day 4 · 하체 근비대' },
    ],
  },
  otherPrograms: [{ id: 'tpl-ppl', name: 'PPL', description: '6일 프로그램' }],
  onProgramPress: jest.fn(),
  onCreateProgram: jest.fn(),
};

describe('ProgramsScreenContent', () => {
  it('renders title', () => {
    render(<ProgramsScreenContent {...props} />);
    expect(screen.getByText('프로그램')).toBeTruthy();
  });

  it('renders active program section', () => {
    render(<ProgramsScreenContent {...props} />);
    expect(screen.getByText('진행 중')).toBeTruthy();
    expect(screen.getByText('PHUL')).toBeTruthy();
  });

  it('renders other programs section', () => {
    render(<ProgramsScreenContent {...props} />);
    expect(screen.getByText('다른 프로그램')).toBeTruthy();
    expect(screen.getByText('PPL')).toBeTruthy();
  });

  it('renders create button', () => {
    render(<ProgramsScreenContent {...props} />);
    expect(screen.getByText('새 프로그램 만들기')).toBeTruthy();
  });
});
