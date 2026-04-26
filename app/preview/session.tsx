import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Pressable,
  Text as RNText,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { ChevLeftIcon, ScreenContainer, TrophyIcon } from '#/components/ui';
import { palette, theme } from '#/components/ui/theme';

type SetRow = {
  kind: string;
  w: number;
  r: number;
  pr?: boolean;
};

type Exercise = {
  name: string;
  sub: string;
  sets: SetRow[];
};

const session = {
  date: '4월 23일 · 목요일',
  name: 'PPL · Push Day',
  program: 'PPL Hypertrophy · 4주차',
  startedAt: '오후 7:12',
  noteOriginal: '컨디션 좋았음. 벤치 PR 갱신. 마지막 세트는 스폿 도움 받음.',
  totalVol: '3,000',
  dur: '48분',
  totalSets: 18,
  totalReps: 122,
  prs: [{ name: '벤치 프레스', detail: '90kg × 6', delta: '+2.5kg' }],
  exercises: [
    {
      name: '벤치 프레스',
      sub: '바벨 · 가슴',
      sets: [
        { kind: 'W', w: 40, r: 12 },
        { kind: '1', w: 70, r: 8 },
        { kind: '2', w: 80, r: 8 },
        { kind: '3', w: 87.5, r: 6 },
        { kind: '4', w: 90, r: 6, pr: true },
      ],
    },
    {
      name: '인클라인 덤벨 프레스',
      sub: '덤벨 · 상부 가슴',
      sets: [
        { kind: '1', w: 22.5, r: 10 },
        { kind: '2', w: 25, r: 9 },
        { kind: '3', w: 25, r: 8 },
      ],
    },
    {
      name: '케이블 플라이',
      sub: '케이블 · 가슴',
      sets: [
        { kind: '1', w: 15, r: 12 },
        { kind: '2', w: 17.5, r: 12 },
        { kind: '3', w: 20, r: 10 },
      ],
    },
    {
      name: '사이드 레터럴 레이즈',
      sub: '덤벨 · 측면 어깨',
      sets: [
        { kind: '1', w: 8, r: 15 },
        { kind: '2', w: 10, r: 12 },
        { kind: '3', w: 10, r: 12 },
        { kind: '4', w: 10, r: 10 },
      ],
    },
    {
      name: '트라이셉 푸시다운',
      sub: '케이블 · 삼두',
      sets: [
        { kind: '1', w: 25, r: 12 },
        { kind: '2', w: 30, r: 10 },
        { kind: '3', w: 30, r: 10 },
      ],
    },
  ] satisfies Exercise[],
};

const NUM_FONT = { fontVariant: ['tabular-nums' as const] };

function HeaderIconButton({
  onPress,
  children,
}: {
  onPress?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 36,
        height: 36,
        borderRadius: theme.radius.md,
        backgroundColor: palette.alpha['white-6'],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Pressable>
  );
}

function ShareIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3v12M12 3l-4 4M12 3l4 4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function NoteIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4h16v16H4z"
        stroke={palette.alpha['white-32']}
        strokeWidth={1.5}
      />
      <Path
        d="M8 9h8M8 13h8M8 17h5"
        stroke={palette.alpha['white-32']}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function StatCell({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.neutral[900],
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: 'center',
      }}
    >
      <RNText
        style={{
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 1.2,
          color: palette.alpha['white-55'],
          marginBottom: 6,
        }}
      >
        {label}
      </RNText>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 2,
        }}
      >
        <RNText
          style={{
            fontSize: 18,
            fontWeight: '800',
            letterSpacing: -0.6,
            color: palette.neutral[0],
            ...NUM_FONT,
          }}
        >
          {value}
        </RNText>
        {unit ? (
          <RNText
            style={{
              fontSize: 10,
              fontWeight: '600',
              color: palette.alpha['white-55'],
            }}
          >
            {unit}
          </RNText>
        ) : null}
      </View>
    </View>
  );
}

function ExerciseCard({ index, ex }: { index: number; ex: Exercise }) {
  const exVol = ex.sets.reduce(
    (s, x) => s + (x.kind === 'W' ? 0 : x.w * x.r),
    0,
  );
  const workSets = ex.sets.filter((s) => s.kind !== 'W').length;

  return (
    <View
      style={{
        backgroundColor: palette.neutral[900],
        borderRadius: theme.radius['2xl'],
        borderWidth: 1,
        borderColor: palette.alpha['white-7'],
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 14,
          paddingTop: 14,
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          borderBottomWidth: 1,
          borderBottomColor: palette.alpha['white-7'],
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            backgroundColor: palette.alpha['white-6'],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RNText
            style={{
              fontSize: 11,
              fontWeight: '800',
              color: palette.neutral[0],
              ...NUM_FONT,
            }}
          >
            {index + 1}
          </RNText>
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <RNText
            style={{
              fontSize: 14,
              fontWeight: '700',
              color: palette.neutral[0],
            }}
          >
            {ex.name}
          </RNText>
          <RNText
            style={{
              fontSize: 10,
              fontWeight: '500',
              color: palette.alpha['white-32'],
              marginTop: 2,
            }}
          >
            {ex.sub}
          </RNText>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}
          >
            <RNText
              style={{
                fontSize: 13,
                fontWeight: '800',
                color: palette.neutral[0],
                ...NUM_FONT,
              }}
            >
              {exVol.toLocaleString()}
            </RNText>
            <RNText
              style={{
                fontSize: 9,
                fontWeight: '600',
                color: palette.alpha['white-32'],
              }}
            >
              kg
            </RNText>
          </View>
          <RNText
            style={{
              fontSize: 9,
              fontWeight: '700',
              letterSpacing: 0.5,
              color: palette.alpha['white-32'],
              marginTop: 2,
            }}
          >
            {workSets} 작업세트
          </RNText>
        </View>
      </View>

      {/* Sets table */}
      <View style={{ paddingHorizontal: 14, paddingTop: 6, paddingBottom: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 6,
          }}
        >
          <RNText
            style={{
              width: 32,
              fontSize: 9,
              fontWeight: '700',
              letterSpacing: 0.8,
              color: palette.alpha['white-32'],
            }}
          >
            SET
          </RNText>
          <RNText
            style={{
              flex: 1,
              textAlign: 'right',
              fontSize: 9,
              fontWeight: '700',
              letterSpacing: 0.8,
              color: palette.alpha['white-32'],
            }}
          >
            KG
          </RNText>
          <RNText
            style={{
              flex: 1,
              textAlign: 'right',
              fontSize: 9,
              fontWeight: '700',
              letterSpacing: 0.8,
              color: palette.alpha['white-32'],
            }}
          >
            REPS
          </RNText>
          <View style={{ width: 28 }} />
        </View>
        {ex.sets.map((s, si) => (
          <View
            key={`${ex.name}-${s.kind}`}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 7,
              borderTopWidth: si === 0 ? 1 : 0,
              borderTopColor: palette.alpha['white-7'],
            }}
          >
            <RNText
              style={{
                width: 32,
                fontSize: 11,
                fontWeight: '800',
                color:
                  s.kind === 'W'
                    ? palette.alpha['white-32']
                    : palette.neutral[0],
                ...NUM_FONT,
              }}
            >
              {s.kind}
            </RNText>
            <RNText
              style={{
                flex: 1,
                textAlign: 'right',
                fontSize: 13,
                fontWeight: '700',
                color: palette.neutral[0],
                ...NUM_FONT,
              }}
            >
              {s.w}
            </RNText>
            <RNText
              style={{
                flex: 1,
                textAlign: 'right',
                fontSize: 13,
                fontWeight: '700',
                color: palette.neutral[0],
                ...NUM_FONT,
              }}
            >
              {s.r}
            </RNText>
            <View style={{ width: 28, alignItems: 'flex-end' }}>
              {s.pr ? (
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 6,
                    backgroundColor: palette.lime[400],
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <RNText
                    style={{
                      fontSize: 9,
                      fontWeight: '800',
                      color: palette.neutral[950],
                    }}
                  >
                    PR
                  </RNText>
                </View>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function SessionPreview() {
  const [note, setNote] = useState(session.noteOriginal);
  const edited = note !== session.noteOriginal;

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Custom header */}
        <View
          style={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 8 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18,
            }}
          >
            <HeaderIconButton>
              <ChevLeftIcon color={palette.neutral[0]} size={16} />
            </HeaderIconButton>
            <HeaderIconButton>
              <ShareIcon color={palette.neutral[0]} />
            </HeaderIconButton>
          </View>
          <RNText
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: palette.alpha['white-55'],
            }}
          >
            {session.date} · {session.startedAt}
          </RNText>
          <RNText
            style={{
              fontSize: 28,
              fontWeight: '800',
              letterSpacing: -0.8,
              color: palette.neutral[0],
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            {session.name}
          </RNText>
          <RNText
            style={{
              fontSize: 12,
              fontWeight: '600',
              color: palette.alpha['white-32'],
            }}
          >
            {session.program}
          </RNText>
        </View>

        {/* Stats grid — 4-col hairline */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 1,
              backgroundColor: palette.alpha['white-7'],
              borderRadius: theme.radius.xl,
              borderWidth: 1,
              borderColor: palette.alpha['white-7'],
              overflow: 'hidden',
            }}
          >
            <StatCell label="시간" value={session.dur} />
            <StatCell label="볼륨" value={session.totalVol} unit="kg" />
            <StatCell label="세트" value={String(session.totalSets)} />
            <StatCell label="횟수" value={String(session.totalReps)} />
          </View>
        </View>

        {/* PR badges — inline LinearGradient, radius 16 */}
        {session.prs.length > 0 ? (
          <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
            {session.prs.map((pr) => (
              <View
                key={pr.name}
                style={{
                  borderRadius: 16,
                  backgroundColor: palette.lime[400],
                  shadowColor: palette.lime[400],
                  shadowOpacity: 0.2,
                  shadowRadius: 12,
                  shadowOffset: { width: 0, height: 6 },
                  elevation: 4,
                }}
              >
                <LinearGradient
                  colors={[palette.lime[400], palette.orange[400]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    borderRadius: 16,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 11,
                      backgroundColor: palette.alpha['black-15'],
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrophyIcon color={palette.neutral[1000]} size={18} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <RNText
                      style={{
                        fontSize: 9,
                        fontWeight: '800',
                        letterSpacing: 1.5,
                        opacity: 0.7,
                        color: palette.neutral[1000],
                      }}
                    >
                      NEW PR
                    </RNText>
                    <RNText
                      style={{
                        fontSize: 14,
                        fontWeight: '800',
                        letterSpacing: -0.3,
                        marginTop: 1,
                        color: palette.neutral[1000],
                      }}
                    >
                      {pr.name} · {pr.detail}
                    </RNText>
                  </View>
                  <View
                    style={{
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                      borderRadius: theme.radius.pill,
                      backgroundColor: 'rgba(0,0,0,0.18)',
                    }}
                  >
                    <RNText
                      style={{
                        fontSize: 12,
                        fontWeight: '800',
                        color: palette.neutral[1000],
                      }}
                    >
                      {pr.delta}
                    </RNText>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </View>
        ) : null}

        {/* Note */}
        <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
          <View
            style={{
              backgroundColor: palette.neutral[900],
              borderRadius: theme.radius['2xl'],
              borderWidth: 1,
              borderColor: palette.alpha['white-7'],
              padding: 14,
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <View style={{ marginTop: 2 }}>
              <NoteIcon />
            </View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <RNText
                  style={{
                    fontSize: 9,
                    fontWeight: '700',
                    letterSpacing: 1.2,
                    color: palette.alpha['white-55'],
                  }}
                >
                  NOTE
                </RNText>
                {edited ? (
                  <RNText
                    style={{
                      fontSize: 9,
                      fontWeight: '700',
                      letterSpacing: 1,
                      color: palette.lime[400],
                    }}
                  >
                    • 수정됨
                  </RNText>
                ) : null}
              </View>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="이 세션에 대한 메모를 남겨보세요..."
                placeholderTextColor={palette.alpha['white-32']}
                multiline
                style={{
                  color: palette.neutral[0],
                  fontSize: 13,
                  lineHeight: 20,
                  padding: 0,
                  margin: 0,
                  minHeight: 40,
                }}
              />
            </View>
          </View>
        </View>

        {/* Exercises */}
        <View style={{ paddingHorizontal: 20, paddingTop: 22 }}>
          <RNText
            style={{
              fontSize: 11,
              fontWeight: '700',
              letterSpacing: 1.2,
              color: palette.alpha['white-55'],
              marginBottom: 12,
              marginLeft: 4,
            }}
          >
            운동 · {session.exercises.length}
          </RNText>
          <View style={{ gap: 10 }}>
            {session.exercises.map((ex, i) => (
              <ExerciseCard key={ex.name} index={i} ex={ex} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
