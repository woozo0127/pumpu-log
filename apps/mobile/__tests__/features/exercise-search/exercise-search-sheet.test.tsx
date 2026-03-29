import { fireEvent, render, screen } from '~/test/test-utils';
import { ExerciseSearchSheetContent } from '~/features/exercise-search/exercise-search-sheet';

const props = {
  searchQuery: '',
  selectedCategory: '전체',
  categories: ['전체', '가슴', '등', '어깨', '하체'],
  exercises: [
    { id: 'bench-press', name: '벤치프레스', category: '가슴' },
    { id: 'incline-bench', name: '인클라인 벤치프레스', category: '가슴' },
    { id: 'dumbbell-fly', name: '덤벨 플라이', category: '가슴' },
  ],
  onSearchChange: jest.fn(),
  onCategorySelect: jest.fn(),
  onAddExercise: jest.fn(),
  onCustomExercise: jest.fn(),
  onClose: jest.fn(),
};

describe('ExerciseSearchSheetContent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders header', () => {
    render(<ExerciseSearchSheetContent {...props} />);
    expect(screen.getByText('운동 추가')).toBeTruthy();
  });

  it('renders category chips', () => {
    render(<ExerciseSearchSheetContent {...props} />);
    expect(screen.getByText('전체')).toBeTruthy();
    expect(screen.getAllByText('가슴').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('등')).toBeTruthy();
  });

  it('renders exercise list', () => {
    render(<ExerciseSearchSheetContent {...props} />);
    expect(screen.getByText('벤치프레스')).toBeTruthy();
    expect(screen.getByText('인클라인 벤치프레스')).toBeTruthy();
    expect(screen.getByText('덤벨 플라이')).toBeTruthy();
  });

  it('renders custom exercise row', () => {
    render(<ExerciseSearchSheetContent {...props} />);
    expect(screen.getByText('직접 운동 추가')).toBeTruthy();
  });

  it('calls onCustomExercise when pressed', () => {
    render(<ExerciseSearchSheetContent {...props} />);
    fireEvent.press(screen.getByText('직접 운동 추가'));
    expect(props.onCustomExercise).toHaveBeenCalledTimes(1);
  });
});
