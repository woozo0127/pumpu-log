import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="workout" />
        <Stack.Screen name="workout-summary" />
        <Stack.Screen name="create-program/name" />
        <Stack.Screen name="create-program/days" />
        <Stack.Screen name="edit-routine" />
        <Stack.Screen name="history-detail" />
      </Stack>
    </>
  );
}
