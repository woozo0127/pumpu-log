import { getGreeting } from '~/shared/utils/greeting';

describe('getGreeting', () => {
  it('returns morning greeting for 6-11', () => {
    expect(getGreeting(6)).toBe('좋은 아침이에요!');
    expect(getGreeting(11)).toBe('좋은 아침이에요!');
  });

  it('returns afternoon greeting for 12-17', () => {
    expect(getGreeting(12)).toBe('좋은 오후예요!');
    expect(getGreeting(17)).toBe('좋은 오후예요!');
  });

  it('returns evening greeting for 18-22', () => {
    expect(getGreeting(18)).toBe('좋은 저녁이에요!');
    expect(getGreeting(22)).toBe('좋은 저녁이에요!');
  });

  it('returns night greeting for 23-5', () => {
    expect(getGreeting(23)).toBe('늦은 밤이에요!');
    expect(getGreeting(3)).toBe('늦은 밤이에요!');
  });
});
