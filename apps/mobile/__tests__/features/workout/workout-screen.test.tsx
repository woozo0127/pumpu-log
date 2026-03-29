import { render, screen } from '~/test/test-utils';
import { WorkoutScreenContent } from '~/features/workout/workout-screen';

const props = {
  routineName: '하체 파워',
  elapsed: '12:34',
  exercise: {
    name: '스쿼트',
    previousRecord: '80kg × 8',
    sets: [
      { weight: 80, reps: 8, isCompleted: true },
      { weight: 80, reps: 8, isCompleted: false },
    ],
  },
  currentExercise: 1,
  totalExercises: 5,
  onBack: jest.fn(),
  onToggleSet: jest.fn(),
  onAddSet: jest.fn(),
  onNext: jest.fn(),
  onShowExercises: jest.fn(),
};

describe('WorkoutScreenContent', () => {
  it('renders header with routine name', () => {
    render(<WorkoutScreenContent {...props} />);
    expect(screen.getByText('하체 파워')).toBeTruthy();
  });

  it('renders exercise section', () => {
    render(<WorkoutScreenContent {...props} />);
    expect(screen.getByText('스쿼트')).toBeTruthy();
    expect(screen.getByText('이전: 80kg × 8')).toBeTruthy();
  });

  it('renders footer with progress', () => {
    render(<WorkoutScreenContent {...props} />);
    expect(screen.getByText('1/5')).toBeTruthy();
    expect(screen.getByText('다음 운동')).toBeTruthy();
  });
});
