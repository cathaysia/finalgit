import type { Meta, StoryObj } from '@storybook/react';

import AiCard from './ai-card';

const meta = {
  component: AiCard,
} satisfies Meta<typeof AiCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
