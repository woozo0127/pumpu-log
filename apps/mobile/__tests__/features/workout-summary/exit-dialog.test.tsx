import { fireEvent, render, screen } from '~/test/test-utils';
import { ExitDialogContent } from '~/features/workout-summary/exit-dialog';

const props = {
  onContinue: jest.fn(),
  onExit: jest.fn(),
};

describe('ExitDialogContent', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders title and description', () => {
    render(<ExitDialogContent {...props} />);
    expect(screen.getByText('운동을 중단할까요?')).toBeTruthy();
    expect(screen.getByText(/지금 중단하면/)).toBeTruthy();
  });

  it('renders action buttons', () => {
    render(<ExitDialogContent {...props} />);
    expect(screen.getByText('계속하기')).toBeTruthy();
    expect(screen.getByText('중단')).toBeTruthy();
  });

  it('calls onContinue when 계속하기 pressed', () => {
    render(<ExitDialogContent {...props} />);
    fireEvent.press(screen.getByText('계속하기'));
    expect(props.onContinue).toHaveBeenCalledTimes(1);
  });

  it('calls onExit when 중단 pressed', () => {
    render(<ExitDialogContent {...props} />);
    fireEvent.press(screen.getByText('중단'));
    expect(props.onExit).toHaveBeenCalledTimes(1);
  });
});
