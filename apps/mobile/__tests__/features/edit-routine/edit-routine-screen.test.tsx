import { fireEvent, render, screen } from '~/test/test-utils';
import { EditRoutineScreenContent } from '~/features/edit-routine/edit-routine-screen';

const props = {
  routineName: '상체 파워',
  exercises: [
    { id: 'bench-press', name: '벤치프레스', category: '가슴' },
    { id: 'overhead-press', name: '오버헤드 프레스', category: '어깨' },
    { id: 'barbell-row', name: '바벨 로우', category: '등' },
  ],
  onNameChange: jest.fn(),
  onBack: jest.fn(),
  onSave: jest.fn(),
  onRemoveExercise: jest.fn(),
  onAddExercise: jest.fn(),
};

describe('EditRoutineScreenContent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders header with routine name', () => {
    render(<EditRoutineScreenContent {...props} />);
    expect(screen.getByText('상체 파워')).toBeTruthy();
    expect(screen.getByText('저장')).toBeTruthy();
  });

  it('renders routine name input label', () => {
    render(<EditRoutineScreenContent {...props} />);
    expect(screen.getByText('루틴 이름')).toBeTruthy();
  });

  it('renders exercise list with categories', () => {
    render(<EditRoutineScreenContent {...props} />);
    expect(screen.getByText('운동 종목')).toBeTruthy();
    expect(screen.getByText('벤치프레스')).toBeTruthy();
    expect(screen.getByText('가슴')).toBeTruthy();
    expect(screen.getByText('오버헤드 프레스')).toBeTruthy();
    expect(screen.getByText('어깨')).toBeTruthy();
    expect(screen.getByText('바벨 로우')).toBeTruthy();
    expect(screen.getByText('등')).toBeTruthy();
  });

  it('renders add exercise button', () => {
    render(<EditRoutineScreenContent {...props} />);
    expect(screen.getByText('운동 추가')).toBeTruthy();
  });

  it('calls onSave when 저장 pressed', () => {
    render(<EditRoutineScreenContent {...props} />);
    fireEvent.press(screen.getByText('저장'));
    expect(props.onSave).toHaveBeenCalledTimes(1);
  });

  it('calls onAddExercise when button pressed', () => {
    render(<EditRoutineScreenContent {...props} />);
    fireEvent.press(screen.getByText('운동 추가'));
    expect(props.onAddExercise).toHaveBeenCalledTimes(1);
  });
});
