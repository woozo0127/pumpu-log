import { Circle, Path, Rect, Svg } from 'react-native-svg';
import { palette } from '#/components/ui/theme';

type IconProps = {
  color?: string;
  size?: number;
};

const def = (color?: string) => color ?? palette.neutral[0];

export function FlameIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3c1 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 1-4-2 1-3 3-3 5a6 6 0 1012 0c0-5-3-7-6-10z"
        fill={def(color)}
      />
    </Svg>
  );
}

export function PlayIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7 5l13 7-13 7V5z" fill={def(color)} />
    </Svg>
  );
}

export function PauseIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={6} y={5} width={4} height={14} rx={1} fill={def(color)} />
      <Rect x={14} y={5} width={4} height={14} rx={1} fill={def(color)} />
    </Svg>
  );
}

export function CheckIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12l5 5L20 7"
        stroke={def(color)}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PlusIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5v14M5 12h14"
        stroke={def(color)}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function MinusIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14"
        stroke={def(color)}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ChevRightIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M5 2l5 5-5 5"
        stroke={def(color)}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ChevLeftIcon({ color, size = 14 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M9 2L4 7l5 5"
        stroke={def(color)}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BoltIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill={def(color)} />
    </Svg>
  );
}

export function TrophyIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M7 4h10v4a5 5 0 01-10 0V4z" fill={def(color)} />
      <Path
        d="M5 5H3v3a3 3 0 003 3M19 5h2v3a3 3 0 01-3 3"
        stroke={def(color)}
        strokeWidth={1.6}
      />
      <Path d="M9 14h6v3H9zM7 19h10v2H7z" fill={def(color)} />
    </Svg>
  );
}

export function DumbbellIcon({ color, size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={2} y={9} width={3} height={6} rx={1} fill={def(color)} />
      <Rect x={5} y={7} width={2} height={10} rx={1} fill={def(color)} />
      <Rect x={7} y={11} width={10} height={2} fill={def(color)} />
      <Rect x={17} y={7} width={2} height={10} rx={1} fill={def(color)} />
      <Rect x={19} y={9} width={3} height={6} rx={1} fill={def(color)} />
    </Svg>
  );
}

export function ClockIcon({ color, size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={def(color)} strokeWidth={1.8} />
      <Path
        d="M12 7v5l3 2"
        stroke={def(color)}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function TrendIcon({ color, size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 17l6-6 4 4 8-8M21 7v5h-5"
        stroke={def(color)}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function HomeIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z"
        fill={def(color)}
      />
    </Svg>
  );
}

export function ListIcon({ color, size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={4}
        y={4}
        width={16}
        height={16}
        rx={3}
        stroke={def(color)}
        strokeWidth={2}
      />
      <Path
        d="M8 9h8M8 13h8M8 17h5"
        stroke={def(color)}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SearchIcon({ color, size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={def(color)} strokeWidth={2} />
      <Path
        d="M20 20l-3-3"
        stroke={def(color)}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function CloseIcon({ color, size = 16 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 6l12 12M6 18L18 6"
        stroke={def(color)}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const REGISTRY = {
  flame: FlameIcon,
  play: PlayIcon,
  pause: PauseIcon,
  check: CheckIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  'chev-right': ChevRightIcon,
  'chev-left': ChevLeftIcon,
  bolt: BoltIcon,
  trophy: TrophyIcon,
  dumbbell: DumbbellIcon,
  clock: ClockIcon,
  trend: TrendIcon,
  home: HomeIcon,
  list: ListIcon,
  search: SearchIcon,
  close: CloseIcon,
} as const;

export type IconName = keyof typeof REGISTRY;

export function Icon({ name, color, size }: IconProps & { name: IconName }) {
  const Comp = REGISTRY[name];
  return <Comp color={color} size={size} />;
}
