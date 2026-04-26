import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { GalleryRow } from '#/app/preview/gallery/_components/gallery-row';
import { GallerySection } from '#/app/preview/gallery/_components/gallery-section';
import { Badge } from '#/components/ui/badge';
import { Button } from '#/components/ui/button';
import { Card } from '#/components/ui/card';
import { EmptyState } from '#/components/ui/empty-state';
import { ExerciseCard } from '#/components/ui/exercise-card';
import { Glow } from '#/components/ui/glow';
import { GradientHero } from '#/components/ui/gradient-hero';
import { DumbbellIcon, Icon, type IconName } from '#/components/ui/icon';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import { ListRow } from '#/components/ui/list-row';
import { Progress } from '#/components/ui/progress';
import { ScreenContainer } from '#/components/ui/screen-container';
import { ScrollArea } from '#/components/ui/scroll-area';
import { SectionHeader } from '#/components/ui/section-header';
import { Separator } from '#/components/ui/separator';
import { StatTile } from '#/components/ui/stat-tile';
import { Stepper } from '#/components/ui/stepper';
import { Switch } from '#/components/ui/switch';
import { Tabs } from '#/components/ui/tabs';
import { Text } from '#/components/ui/text';
import { palette, theme } from '#/components/ui/theme';
import { ToggleGroup } from '#/components/ui/toggle-group';
import { TopBar } from '#/components/ui/top-bar';
import { type TypographyToken, typography } from '#/components/ui/typography';

const ICON_NAMES: IconName[] = [
  'flame',
  'play',
  'pause',
  'check',
  'plus',
  'minus',
  'chev-right',
  'chev-left',
  'bolt',
  'trophy',
  'dumbbell',
  'clock',
  'trend',
  'home',
  'list',
  'search',
  'close',
];

const TYPO_TOKENS: TypographyToken[] = Object.keys(
  typography,
) as TypographyToken[];

function SwitchDemo() {
  const [v, setV] = React.useState(false);
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Switch value={v} onValueChange={setV} />
      <Switch value={true} onValueChange={() => {}} />
      <Switch value={false} onValueChange={() => {}} disabled />
    </View>
  );
}

function SegmentDemo() {
  const [v, setV] = React.useState<'kg' | 'lb'>('kg');
  return (
    <ToggleGroup type="single" value={v} onValueChange={setV}>
      <ToggleGroup.Item value="kg">kg</ToggleGroup.Item>
      <ToggleGroup.Item value="lb">lb</ToggleGroup.Item>
    </ToggleGroup>
  );
}

export default function Gallery() {
  const [tab, setTab] = useState<'a' | 'b' | 'c'>('a');
  const [filter, setFilter] = useState<'all' | 'one' | 'two'>('all');
  const [weight, setWeight] = useState(60);
  const [reps, setReps] = useState(10);

  return (
    <ScreenContainer header={<TopBar subtitle="PREVIEW" title="Gallery" />}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
      >
        <GallerySection title="Tokens">
          <GalleryRow label="Color · neutral">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {Object.entries(palette.neutral).map(([k, v]) => (
                <Swatch key={k} label={`neutral.${k}`} color={v} />
              ))}
            </View>
          </GalleryRow>
          <GalleryRow label="Color · lime / orange / red">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {Object.entries(palette.lime).map(([k, v]) => (
                <Swatch key={k} label={`lime.${k}`} color={v} />
              ))}
              {Object.entries(palette.orange).map(([k, v]) => (
                <Swatch key={k} label={`orange.${k}`} color={v} />
              ))}
              {Object.entries(palette.red).map(([k, v]) => (
                <Swatch key={k} label={`red.${k}`} color={v} />
              ))}
            </View>
          </GalleryRow>
          <GalleryRow label="Color · green">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              <Swatch label="green.400" color={palette.green[400]} />
            </View>
          </GalleryRow>
          <GalleryRow label="Color · alpha (overlays)">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {Object.entries(palette.alpha).map(([k, v]) => (
                <Swatch key={k} label={`alpha.${k}`} color={v} />
              ))}
            </View>
          </GalleryRow>
          <GalleryRow label="Color · alpha new (white-3/6/12)">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              <Swatch label="white-3" color={palette.alpha['white-3']} />
              <Swatch label="white-6" color={palette.alpha['white-6']} />
              <Swatch label="white-12" color={palette.alpha['white-12']} />
            </View>
          </GalleryRow>
          <GalleryRow label="Spacing">
            <View style={{ gap: 6 }}>
              {Object.entries(theme.space).map(([k, v]) => (
                <View
                  key={k}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <Text typography="caption" color={palette.alpha['white-55']}>
                    {`${k} (${v})`}
                  </Text>
                  <View
                    style={{
                      height: 8,
                      width: v,
                      backgroundColor: palette.lime[400],
                    }}
                  />
                </View>
              ))}
            </View>
          </GalleryRow>
          <GalleryRow label="Radius">
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              {Object.entries(theme.radius).map(([k, v]) => (
                <View key={k} style={{ alignItems: 'center', gap: 4 }}>
                  <View
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: v as number,
                      backgroundColor: palette.neutral[800],
                      borderWidth: 1,
                      borderColor: palette.alpha['white-7'],
                    }}
                  />
                  <Text typography="caption" color={palette.alpha['white-55']}>
                    {k}
                  </Text>
                </View>
              ))}
            </View>
          </GalleryRow>
          <GalleryRow label="Shadow">
            <View style={{ flexDirection: 'row', gap: 14 }}>
              {(['none', 'card', 'glow'] as const).map((k) => (
                <View key={k} style={{ alignItems: 'center', gap: 4 }}>
                  <View
                    style={[
                      {
                        width: 64,
                        height: 64,
                        borderRadius: theme.radius.lg,
                        backgroundColor: palette.neutral[900],
                      },
                      theme.shadow[k],
                    ]}
                  />
                  <Text typography="caption" color={palette.alpha['white-55']}>
                    {k}
                  </Text>
                </View>
              ))}
            </View>
          </GalleryRow>
        </GallerySection>

        <GallerySection title="Typography">
          {TYPO_TOKENS.map((tok) => (
            <GalleryRow key={tok} label={tok}>
              <Text typography={tok} color={palette.neutral[0]}>
                Pumpu Log 1234
              </Text>
            </GalleryRow>
          ))}
        </GallerySection>

        <GallerySection title="Icon">
          <GalleryRow label="17 icons">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
              {ICON_NAMES.map((n) => (
                <View
                  key={n}
                  style={{ alignItems: 'center', gap: 4, width: 64 }}
                >
                  <Icon name={n} color={palette.neutral[0]} size={22} />
                  <Text typography="caption" color={palette.alpha['white-55']}>
                    {n}
                  </Text>
                </View>
              ))}
            </View>
          </GalleryRow>
        </GallerySection>

        <GallerySection title="Primitives">
          <GalleryRow label="Button · variants">
            <View style={{ gap: 8 }}>
              <Button>default</Button>
              <Button variant="secondary">secondary</Button>
              <Button variant="ghost">ghost</Button>
              <Button variant="outline">outline</Button>
              <Button variant="destructive">destructive</Button>
            </View>
          </GalleryRow>
          <GalleryRow label="Button · sizes">
            <View style={{ gap: 8 }}>
              <Button size="xsmall">xsmall</Button>
              <Button size="small">small</Button>
              <Button size="medium">medium</Button>
            </View>
          </GalleryRow>
          <GalleryRow label="Card">
            <Card
              header={
                <>
                  <Card.Title>이번 주 볼륨</Card.Title>
                  <Card.Description>지난 주 7,360kg</Card.Description>
                </>
              }
            >
              <Text typography="num-lg" color={palette.neutral[0]}>
                8,240
              </Text>
            </Card>
          </GalleryRow>
          <GalleryRow label="Card · glow">
            <Glow>
              <Card>
                <Card.Title>강조 카드</Card.Title>
              </Card>
            </Glow>
          </GalleryRow>
          <GalleryRow label="Badge">
            <View style={{ gap: 8 }}>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <Badge>default</Badge>
                <Badge variant="secondary">secondary</Badge>
                <Badge variant="outline">outline</Badge>
                <Badge variant="accent">accent</Badge>
              </View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <Badge size="small">default</Badge>
                <Badge size="small" variant="secondary">
                  secondary
                </Badge>
                <Badge size="small" variant="outline">
                  outline
                </Badge>
                <Badge size="small" variant="accent">
                  accent
                </Badge>
              </View>
            </View>
          </GalleryRow>
          <GalleryRow label="Separator">
            <View style={{ gap: 8 }}>
              <Separator />
              <Separator inset={20} />
            </View>
          </GalleryRow>
          <GalleryRow label="Input">
            <View style={{ gap: 8 }}>
              <Input placeholder="기본" />
              <Input placeholder="invalid" invalid />
            </View>
          </GalleryRow>
          <GalleryRow label="Label">
            <Label>섹션 라벨</Label>
          </GalleryRow>
          <GalleryRow label="Progress">
            <View style={{ gap: 8 }}>
              <Progress value={0} />
              <Progress value={35} />
              <Progress value={75} />
              <Progress value={100} />
            </View>
          </GalleryRow>
          <GalleryRow label="ScrollArea · horizontal + fadeEdges">
            <ScrollArea
              orientation="horizontal"
              fadeEdges
              style={{ height: 40 }}
              contentContainerStyle={{
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
              }}
            >
              {[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
              ].map((n) => (
                <View
                  key={n}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: palette.alpha['white-7'],
                    borderRadius: 8,
                  }}
                >
                  <Text typography="caption" color={palette.alpha['white-55']}>
                    {`item ${n}`}
                  </Text>
                </View>
              ))}
            </ScrollArea>
          </GalleryRow>
          <GalleryRow label="Switch">
            <SwitchDemo />
          </GalleryRow>
          <GalleryRow label="Tabs">
            <Tabs value={tab} onValueChange={setTab}>
              <Tabs.List>
                <Tabs.Trigger value="a">One</Tabs.Trigger>
                <Tabs.Trigger value="b">Two</Tabs.Trigger>
                <Tabs.Trigger value="c">Three</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="a">
                <Text typography="body">A 컨텐츠</Text>
              </Tabs.Content>
              <Tabs.Content value="b">
                <Text typography="body">B 컨텐츠</Text>
              </Tabs.Content>
              <Tabs.Content value="c">
                <Text typography="body">C 컨텐츠</Text>
              </Tabs.Content>
            </Tabs>
          </GalleryRow>
          <GalleryRow label="ToggleGroup · single">
            <ToggleGroup type="single" value={filter} onValueChange={setFilter}>
              <ToggleGroup.Item value="all">All</ToggleGroup.Item>
              <ToggleGroup.Item value="one">One</ToggleGroup.Item>
              <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
            </ToggleGroup>
          </GalleryRow>
          <GalleryRow label="ToggleGroup · single (kg/lb)">
            <SegmentDemo />
          </GalleryRow>
          <GalleryRow label="ListRow">
            <View style={{ gap: 8 }}>
              <ListRow
                title="단순 NavRow"
                subtitle="서브"
                chevron
                divider
                onPress={() => {}}
              />
              <ListRow
                title="Switch trailing"
                trailing={<Switch value={true} onValueChange={() => {}} />}
                divider
              />
              <ListRow
                title="ToggleGroup trailing"
                trailing={
                  <ToggleGroup
                    type="single"
                    value="kg"
                    onValueChange={() => {}}
                  >
                    <ToggleGroup.Item value="kg">kg</ToggleGroup.Item>
                    <ToggleGroup.Item value="lb">lb</ToggleGroup.Item>
                  </ToggleGroup>
                }
                divider
              />
              <ListRow
                surface
                title="Surface 단독"
                subtitle="border + bg"
                chevron
                onPress={() => {}}
              />
              <ListRow
                leading={<DumbbellIcon color={palette.lime[400]} />}
                title={
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <ListRow.Title>풍부 본문</ListRow.Title>
                    <Badge size="small" variant="accent">
                      PR
                    </Badge>
                  </View>
                }
                subtitle="dot-notation + Badge 인라인"
                chevron
                onPress={() => {}}
              />
            </View>
          </GalleryRow>
          <GalleryRow label="Glow · variants">
            <View style={{ gap: 12 }}>
              <Glow>
                <Card>
                  <Card.Title>default Glow</Card.Title>
                </Card>
              </Glow>
              <Glow variant="card">
                <Card>
                  <Card.Title>card Glow</Card.Title>
                </Card>
              </Glow>
              <Glow color="#FF7A00">
                <Card>
                  <Card.Title>color override</Card.Title>
                </Card>
              </Glow>
            </View>
          </GalleryRow>
        </GallerySection>

        <GallerySection title="RN-전용">
          <GalleryRow label="Stepper · big">
            <Stepper
              variant="big"
              label="WEIGHT"
              value={weight}
              unit="kg"
              step={2.5}
              onChange={setWeight}
            />
          </GalleryRow>
          <GalleryRow label="Stepper · inline">
            <Stepper
              variant="inline"
              value={reps}
              unit="회"
              onChange={setReps}
            />
          </GalleryRow>
          <GalleryRow label="TopBar · default">
            <TopBar title="제목" subtitle="SUBTITLE" onBack={() => undefined} />
          </GalleryRow>
          <GalleryRow label="GradientHero">
            <GradientHero glow>
              <Text typography="title" color={palette.neutral[950]}>
                Push Day
              </Text>
            </GradientHero>
          </GalleryRow>
          <GalleryRow label="SectionHeader">
            <SectionHeader>오늘의 운동</SectionHeader>
          </GalleryRow>
        </GallerySection>

        <GallerySection title="Composites">
          <GalleryRow label="ExerciseCard · PR 있음">
            <ExerciseCard
              index={1}
              title="벤치 프레스"
              subtitle="바벨 · 가슴"
              pr="95kg"
              sets={[
                { w: 60, r: 12 },
                { w: 80, r: 8 },
                { w: 90, r: 6 },
              ]}
            />
          </GalleryRow>
          <GalleryRow label="ExerciseCard · PR 없음">
            <ExerciseCard
              index={2}
              title="래터럴 레이즈"
              subtitle="덤벨 · 측면 어깨"
              sets={[
                { w: 8, r: 15 },
                { w: 10, r: 12 },
              ]}
            />
          </GalleryRow>
          <GalleryRow label="EmptyState">
            <View style={{ gap: 12 }}>
              <EmptyState
                eyebrow="아직 프로그램이 없어요"
                title={`첫 프로그램을 만들거나\n템플릿에서 골라보세요.`}
                body="템플릿으로 빠르게 시작하거나, 처음부터 직접 만들 수 있어요."
                footer={<Button>프로그램 추가</Button>}
              />
              <EmptyState
                eyebrow={
                  <EmptyState.Eyebrow
                    icon={<DumbbellIcon color={palette.lime[400]} size={14} />}
                  >
                    커스텀 eyebrow
                  </EmptyState.Eyebrow>
                }
                title="dot-notation 명시"
                body="아이콘 좌측 부착"
              />
            </View>
          </GalleryRow>
          <GalleryRow label="StatTile">
            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <StatTile surface label="이번 주" value={4} unit="회" />
                </View>
                <View style={{ flex: 1 }}>
                  <StatTile surface label="연속" value={12} unit="일" />
                </View>
                <View style={{ flex: 1 }}>
                  <StatTile surface label="볼륨" value={8.2} unit="k kg" />
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <StatTile label="운동" value={6} />
                <View
                  style={{
                    width: 1,
                    backgroundColor: palette.alpha['black-15'],
                  }}
                />
                <StatTile label="세트" value={20} />
                <View
                  style={{
                    width: 1,
                    backgroundColor: palette.alpha['black-15'],
                  }}
                />
                <StatTile label="시간" value={52} unit="분" />
              </View>
              <StatTile
                surface
                label="큰 숫자 override"
                value={<StatTile.Value typography="num-lg">52</StatTile.Value>}
                unit="분"
              />
            </View>
          </GalleryRow>
        </GallerySection>
      </ScrollView>
    </ScreenContainer>
  );
}

function Swatch({ label, color }: { label: string; color: string }) {
  return (
    <View style={{ alignItems: 'center', gap: 4, width: 88 }}>
      <View
        style={{
          width: 80,
          height: 40,
          borderRadius: 8,
          backgroundColor: color,
          borderWidth: 1,
          borderColor: palette.alpha['white-7'],
        }}
      />
      <Text
        typography="caption"
        color={palette.alpha['white-55']}
        align="center"
      >
        {label}
      </Text>
    </View>
  );
}
