import { render, screen } from '~/test/test-utils';
import { ExerciseSection } from '~/features/workout/components/exercise-section';

const props = {
  name: '스쿼트',
  previousRecord: '80kg × 8',
  sets: [
    { weight: 80, reps: 8, isCompleted: true },
    { weight: 80, reps: 8, isCompleted: true },
    { weight: 80, reps: 8, isCompleted: false },
  ],
  onToggleSet: jest.fn(),
  onWeightChange: jest.fn(),
  onRepsChange: jest.fn(),
  onAddSet: jest.fn(),
};

describe('ExerciseSection', () => {
  it('renders exercise name and previous record', () => {
    render(<ExerciseSection {...props} />);
    expect(screen.getByText('스쿼트')).toBeTruthy();
    expect(screen.getByText('이전: 80kg × 8')).toBeTruthy();
  });

  it('renders set header labels', () => {
    render(<ExerciseSection {...props} />);
    expect(screen.getByText('세트')).toBeTruthy();
    expect(screen.getByText('kg')).toBeTruthy();
    expect(screen.getByText('회')).toBeTruthy();
  });

  it('renders all sets', () => {
    render(<ExerciseSection {...props} />);
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('renders add set button', () => {
    render(<ExerciseSection {...props} />);
    expect(screen.getByText('+ 세트 추가')).toBeTruthy();
  });
});
