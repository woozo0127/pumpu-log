import { act, renderHook } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import {
  ActiveSessionProvider,
  useActiveSession,
} from './active-session-context';
import { getDefaultRoutine } from './fixed-program';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ActiveSessionProvider>{children}</ActiveSessionProvider>
);

describe('ActiveSessionProvider', () => {
  test('startRoutine creates a draft from routine exercises', () => {
    const { result } = renderHook(() => useActiveSession(), { wrapper });
    act(() => result.current.startRoutine(getDefaultRoutine()));

    expect(result.current.draft?.routineId).toBe('push-day');
    expect(result.current.draft?.sets).toHaveLength(10);
    expect(result.current.progress.completed).toBe(0);
    expect(result.current.progress.total).toBe(10);
  });

  test('updateSet changes weight and reps', () => {
    const { result } = renderHook(() => useActiveSession(), { wrapper });
    act(() => result.current.startRoutine(getDefaultRoutine()));
    const setId = result.current.draft?.sets[0].id ?? '';

    act(() => result.current.updateSet(setId, { weight: 82.5, reps: 7 }));

    expect(result.current.draft?.sets[0].weight).toBe(82.5);
    expect(result.current.draft?.sets[0].reps).toBe(7);
  });

  test('completeSet marks a set complete and enables finish after one set', () => {
    const { result } = renderHook(() => useActiveSession(), { wrapper });
    act(() => result.current.startRoutine(getDefaultRoutine()));
    const setId = result.current.draft?.sets[0].id ?? '';

    act(() => result.current.completeSet(setId));

    expect(result.current.draft?.sets[0].completed).toBe(true);
    expect(result.current.canFinish).toBe(true);
    expect(result.current.progress.completed).toBe(1);
  });

  test('finalizeSession returns completed session and clearDraft resets state', () => {
    const { result } = renderHook(() => useActiveSession(), { wrapper });
    act(() => result.current.startRoutine(getDefaultRoutine()));
    const setId = result.current.draft?.sets[0].id ?? '';
    act(() => result.current.completeSet(setId));

    const finalized = result.current.finalizeSession(
      new Date('2026-04-26T10:30:00.000Z'),
    );

    expect(finalized?.finishedAt).toBe('2026-04-26T10:30:00.000Z');
    expect(finalized?.sets.filter((set) => set.completed)).toHaveLength(1);

    act(() => result.current.clearDraft());
    expect(result.current.draft).toBeNull();
  });
});
