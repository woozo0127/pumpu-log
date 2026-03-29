import { Pressable, Text as RNText, View } from 'react-native';

export function Text({ children, ...props }: any) {
  return <RNText {...props}>{children}</RNText>;
}

export function Badge({ children, ...props }: any) {
  return (
    <View {...props}>
      <RNText>{children}</RNText>
    </View>
  );
}

export function Button({ children, onPress, ...props }: any) {
  return (
    <Pressable onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
}

export function Card({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function Dot(props: any) {
  return <View {...props} />;
}

export function SectionHeader({ title, actionLabel, onAction, ...props }: any) {
  return (
    <View {...props}>
      <RNText>{title}</RNText>
      {actionLabel && (
        <Pressable onPress={onAction}>
          <RNText>{actionLabel}</RNText>
        </Pressable>
      )}
    </View>
  );
}

export function Checkbox({ checked, onCheckedChange, ...props }: any) {
  return (
    <Pressable onPress={onCheckedChange} {...props}>
      <RNText>{checked ? '✓' : '○'}</RNText>
    </Pressable>
  );
}

export function Separator(props: any) {
  return <View {...props} />;
}

export function Tab({ label, ...props }: any) {
  return (
    <View {...props}>
      <RNText>{label}</RNText>
    </View>
  );
}

export function TabBar({ children, ...props }: any) {
  return <View {...props}>{children}</View>;
}

export function EmptyState({ title, description, actionLabel, onAction, ...props }: any) {
  return (
    <View {...props}>
      <RNText>{title}</RNText>
      {description && <RNText>{description}</RNText>}
      {actionLabel && (
        <Pressable onPress={onAction}>
          <RNText>{actionLabel}</RNText>
        </Pressable>
      )}
    </View>
  );
}

export const textVariants = () => '';
export const badgeVariants = () => '';
export const badgeTextVariants = () => '';
export const buttonVariants = () => '';
export const buttonTextVariants = () => '';
export const iconButtonVariants = () => '';
export const cn = (...args: any[]) => args.filter(Boolean).join(' ');

export const colors = {
  background: '#0d1117',
  card: { DEFAULT: '#161b22', hover: '#1c2333' },
  input: '#0d1117',
  border: { DEFAULT: '#21262d', subtle: '#30363d' },
  lime: {
    DEFAULT: '#a3e635',
    hover: '#bef264',
    active: '#8bc62e',
    dim: '#1a2e0a',
    disabled: '#3a4a1a',
  },
  destructive: '#ef4444',
  yellow: '#fbbf24',
  foreground: '#f0f0f0',
  'foreground-secondary': '#8b949e',
  'foreground-tertiary': '#6b7280',
  'foreground-on-color': '#0d1117',
  'tab-inactive': '#484f58',
} as const;
