import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from './index';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'large', 'small', 'muted', 'lead', 'inlineCode'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    variant: 'p',
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-sm p-lg bg-background">
      <Text variant="h1">H1 — Heading 1</Text>
      <Text variant="h2">H2 — Heading 2</Text>
      <Text variant="h3">H3 — Heading 3</Text>
      <Text variant="h4">H4 — Heading 4</Text>
      <Text variant="p">P — Body paragraph text with relaxed line height</Text>
      <Text variant="large">Large — Large semibold text</Text>
      <Text variant="small">Small — Small medium text</Text>
      <Text variant="muted">Muted — Muted secondary text</Text>
      <Text variant="lead">Lead — Lead secondary text</Text>
      <Text variant="inlineCode">inlineCode — monospace code snippet</Text>
    </View>
  ),
};

export const Heading1: Story = {
  args: { variant: 'h1', children: 'Heading 1' },
};

export const Heading2: Story = {
  args: { variant: 'h2', children: 'Heading 2' },
};

export const Heading3: Story = {
  args: { variant: 'h3', children: 'Heading 3' },
};

export const Heading4: Story = {
  args: { variant: 'h4', children: 'Heading 4' },
};

export const Paragraph: Story = {
  args: { variant: 'p', children: 'Body paragraph text with relaxed line height.' },
};

export const Large: Story = {
  args: { variant: 'large', children: 'Large semibold text' },
};

export const Small: Story = {
  args: { variant: 'small', children: 'Small medium text' },
};

export const Muted: Story = {
  args: { variant: 'muted', children: 'Muted secondary text' },
};

export const Lead: Story = {
  args: { variant: 'lead', children: 'Lead secondary text' },
};

export const InlineCode: Story = {
  args: { variant: 'inlineCode', children: 'const foo = "bar"' },
};
