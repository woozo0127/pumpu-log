import { fireEvent, render, screen } from '~/test/test-utils';
import { CreateProgramNameContent } from '~/features/create-program/create-program-name';

describe('CreateProgramNameContent', () => {
  const props = {
    name: '',
    description: '',
    onNameChange: jest.fn(),
    onDescriptionChange: jest.fn(),
    onClose: jest.fn(),
    onNext: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it('renders header', () => {
    render(<CreateProgramNameContent {...props} />);
    expect(screen.getByText('새 프로그램')).toBeTruthy();
    expect(screen.getByText('다음')).toBeTruthy();
  });

  it('renders name field with hint', () => {
    render(<CreateProgramNameContent {...props} />);
    expect(screen.getByText('프로그램 이름')).toBeTruthy();
    expect(screen.getByText('예: PHUL, PPL, Upper/Lower 등')).toBeTruthy();
  });

  it('renders description field', () => {
    render(<CreateProgramNameContent {...props} />);
    expect(screen.getByText('설명 (선택)')).toBeTruthy();
  });

  it('calls onClose when X pressed', () => {
    render(<CreateProgramNameContent {...props} />);
    fireEvent.press(screen.getByTestId('close-button'));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when 다음 pressed', () => {
    render(<CreateProgramNameContent {...props} name="PHUL" />);
    fireEvent.press(screen.getByText('다음'));
    expect(props.onNext).toHaveBeenCalledTimes(1);
  });
});
