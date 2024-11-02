import type { Meta, StoryObj } from '@storybook/react';

import Project from './Project';

const meta = {
  component: Project,
} satisfies Meta<typeof Project>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
