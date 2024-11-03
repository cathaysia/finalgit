import type { Meta, StoryObj } from '@storybook/react';

import { Default as BranchListStories } from '@/stories/branch/branch-list.stories';
import { Default as TagListStories } from '@/stories/tag/tag-list.stories';
import BranchPanel from './barnch-panel';

const meta = {
  component: BranchPanel,
} satisfies Meta<typeof BranchPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    branches: BranchListStories.args.branches,
    tags: TagListStories.args.tags,
  },
};
