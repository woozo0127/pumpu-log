import { fireEvent, render, screen } from '~/test/test-utils';
import { CustomExerciseFormContent } from '~/features/exercise-search/custom-exercise-form';

const props = {
  name: '',
  selectedCategory: '팔',
  categories: ['가슴', '등', '팔', '어깨', '하체', '코어'],
  onNameChange: jest.fn(),
  onCategorySelect: jest.fn(),
  onBack: jest.fn(),
  onSave: jest.fn(),
};

describe('CustomExerciseFormContent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders header', () => {
    render(<CustomExerciseFormContent {...props} />);
    expect(screen.getByText('운동 추가')).toBeTruthy();
    expect(screen.getByText('저장')).toBeTruthy();
  });

  it('renders name field', () => {
    render(<CustomExerciseFormContent {...props} />);
    expect(screen.getByText('운동 이름')).toBeTruthy();
  });

  it('renders category grid', () => {
    render(<CustomExerciseFormContent {...props} />);
    expect(screen.getByText('카테고리')).toBeTruthy();
    expect(screen.getByText('가슴')).toBeTruthy();
    expect(screen.getByText('등')).toBeTruthy();
    expect(screen.getByText('팔')).toBeTruthy();
    expect(screen.getByText('어깨')).toBeTruthy();
    expect(screen.getByText('하체')).toBeTruthy();
    expect(screen.getByText('코어')).toBeTruthy();
  });

  it('calls onSave when 저장 pressed', () => {
    render(<CustomExerciseFormContent {...props} />);
    fireEvent.press(screen.getByText('저장'));
    expect(props.onSave).toHaveBeenCalledTimes(1);
  });

  it('calls onNameChange when exercise name input changes', () => {
    render(<CustomExerciseFormContent {...props} />);
    fireEvent.changeText(screen.getByPlaceholderText('케이블 컬'), '덤벨 컬');
    expect(props.onNameChange).toHaveBeenCalledWith('덤벨 컬');
  });
});
