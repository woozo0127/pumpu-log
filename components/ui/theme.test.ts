import { palette, theme } from '#/components/ui/theme';

describe('theme', () => {
  test('palette.lime[400] is exported', () => {
    expect(palette.lime[400]).toBe('#D4FF00');
  });

  test('theme.space.lg is exported', () => {
    expect(theme.space.lg).toBe(16);
  });

  test('palette.green[400] is exported', () => {
    expect(palette.green[400]).toBe('#7AE0AA');
  });

  test('palette.alpha new keys are exported', () => {
    expect(palette.alpha['white-3']).toBe('rgba(255,255,255,0.04)');
    expect(palette.alpha['white-6']).toBe('rgba(255,255,255,0.06)');
    expect(palette.alpha['white-12']).toBe('rgba(255,255,255,0.12)');
  });
});
