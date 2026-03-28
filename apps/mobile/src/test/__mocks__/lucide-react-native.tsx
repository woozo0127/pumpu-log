import React from 'react';
import { View } from 'react-native';

function createIcon(name: string) {
  const Icon = (props: any) => React.createElement(View, { ...props, testID: name });
  Icon.displayName = name;
  return Icon;
}

export const Home = createIcon('Home');
export const Dumbbell = createIcon('Dumbbell');
export const History = createIcon('History');
export const BarChart3 = createIcon('BarChart3');
export const ChevronRight = createIcon('ChevronRight');
export const Zap = createIcon('Zap');
export const Signal = createIcon('Signal');
export const Wifi = createIcon('Wifi');
export const BatteryFull = createIcon('BatteryFull');
