export function getGreeting(hour: number): string {
  if (hour >= 6 && hour <= 11) return '좋은 아침이에요!';
  if (hour >= 12 && hour <= 17) return '좋은 오후예요!';
  if (hour >= 18 && hour <= 22) return '좋은 저녁이에요!';
  return '늦은 밤이에요!';
}
