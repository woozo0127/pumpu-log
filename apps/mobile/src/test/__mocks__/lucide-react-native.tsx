import React from 'react';
import { View } from 'react-native';

function createIcon(name: string) {
  const Icon = (props: any) => React.createElement(View, { ...props, testID: name });
  Icon.displayName = name;
  return Icon;
}

export const Home = createIcon('Home');
export const House = createIcon('House');
export const Dumbbell = createIcon('Dumbbell');
export const LayoutGrid = createIcon('LayoutGrid');
export const History = createIcon('History');
export const Calendar = createIcon('Calendar');
export const BarChart3 = createIcon('BarChart3');
export const ChartNoAxesColumnIncreasing = createIcon('ChartNoAxesColumnIncreasing');
export const ChevronLeft = createIcon('ChevronLeft');
export const ChevronRight = createIcon('ChevronRight');
export const ChevronUp = createIcon('ChevronUp');
export const GripVertical = createIcon('GripVertical');
export const Timer = createIcon('Timer');
export const X = createIcon('X');
export const TrendingUp = createIcon('TrendingUp');
export const CirclePlus = createIcon('CirclePlus');
export const Plus = createIcon('Plus');
export const Search = createIcon('Search');
export const Zap = createIcon('Zap');
export const Signal = createIcon('Signal');
export const Wifi = createIcon('Wifi');
export const BatteryFull = createIcon('BatteryFull');
