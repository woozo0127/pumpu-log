import type { Preview } from '@storybook/react';
import '../global.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0d1117' }],
    },
  },
};

export default preview;
