import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Defs, Pattern, Rect, Svg } from 'react-native-svg';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';

type EmptyStateProps = ViewProps & {
  eyebrow?: string | ReactNode;
  title?: string | ReactNode;
  body?: string | ReactNode;
  footer?: ReactNode;
};

function Eyebrow({
  icon,
  children,
}: {
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {icon}
      <Text typography="label" color={palette.lime[400]}>
        {children}
      </Text>
    </View>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <Text typography="subtitle" color={palette.neutral[0]}>
      {children}
    </Text>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <Text typography="caption" color={palette.alpha['white-55']}>
      {children}
    </Text>
  );
}

function renderEyebrow(slot: EmptyStateProps['eyebrow']) {
  if (slot == null) return null;
  return typeof slot === 'string' ? <Eyebrow>{slot}</Eyebrow> : slot;
}

function renderTitle(slot: EmptyStateProps['title']) {
  if (slot == null) return null;
  return typeof slot === 'string' ? <Title>{slot}</Title> : slot;
}

function renderBody(slot: EmptyStateProps['body']) {
  if (slot == null) return null;
  return typeof slot === 'string' ? <Body>{slot}</Body> : slot;
}

function DotGrid() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.25,
      }}
      pointerEvents="none"
    >
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern
            id="dot"
            x={0}
            y={0}
            width={14}
            height={14}
            patternUnits="userSpaceOnUse"
          >
            <Rect
              x={6}
              y={6}
              width={2}
              height={2}
              rx={1}
              fill={palette.alpha['white-32']}
            />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width="100%" height="100%" fill="url(#dot)" />
      </Svg>
    </View>
  );
}

function Root({
  eyebrow,
  title,
  body,
  footer,
  style,
  ...rest
}: EmptyStateProps) {
  return (
    <View
      style={[
        {
          backgroundColor: palette.neutral[900],
          borderRadius: theme.radius['3xl'],
          paddingVertical: 26,
          paddingHorizontal: 22,
          borderWidth: 1.5,
          borderColor: palette.alpha['white-7'],
          borderStyle: 'dashed',
          overflow: 'hidden',
        },
        style,
      ]}
      {...rest}
    >
      <DotGrid />
      <View style={{ position: 'relative' }}>
        {renderEyebrow(eyebrow)}
        {title ? (
          <View style={{ marginTop: eyebrow ? 12 : 0 }}>
            {renderTitle(title)}
          </View>
        ) : null}
        {body ? (
          <View style={{ marginTop: title ? 8 : 0 }}>{renderBody(body)}</View>
        ) : null}
        {footer ? <View style={{ marginTop: 18 }}>{footer}</View> : null}
      </View>
    </View>
  );
}

export const EmptyState = Object.assign(Root, { Eyebrow, Title, Body });
