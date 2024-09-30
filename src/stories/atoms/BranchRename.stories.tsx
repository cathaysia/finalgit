import type { Meta, StoryObj } from '@storybook/react';

import BranchRename from './BranchRename';

const meta = {
  component: BranchRename,
} satisfies Meta<typeof BranchRename>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
