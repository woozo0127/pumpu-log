import { useMemo } from 'react';
import { getGreeting } from '~/shared/utils/greeting';

export function useGreeting() {
  return useMemo(() => {
    const hour = new Date().getHours();
    return getGreeting(hour);
  }, []);
}
