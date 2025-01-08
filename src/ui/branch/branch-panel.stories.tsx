import type { Meta, StoryObj } from '@storybook/react';

import { Default as BranchListStories } from '@/ui/branch/branch-list.stories';
import { Default as TagListStories } from '@/ui/tag/tag-list.stories';
import BranchPanel from './barnch-panel';

const meta = {
  component: BranchPanel,
  decorators: [
    Story => (
      <div className="h-[420px] shadow p-4 border rounded overflow-hidden">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BranchPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    branches: BranchListStories.args.branches,
    tags: TagListStories.args.tags,
  },
};
