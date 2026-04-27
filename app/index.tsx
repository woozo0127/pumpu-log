import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { OnboardedContext } from './_onboarded-context';

export default function Index() {
  const { onboarded } = useContext(OnboardedContext);
  if (!onboarded) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tabs)/home" />;
}
