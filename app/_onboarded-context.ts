import { createContext } from 'react';

export type OnboardedContextValue = {
  onboarded: boolean;
  setOnboarded: (v: boolean) => void;
};

export const OnboardedContext = createContext<OnboardedContextValue>({
  onboarded: false,
  setOnboarded: () => {},
});
