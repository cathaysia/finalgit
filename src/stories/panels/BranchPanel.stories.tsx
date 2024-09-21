import type { Meta, StoryObj } from '@storybook/react';

import { Default as BranchListStories } from '@/stories/lists/BranchList.stories';
import BranchPanel from './BranchPanel';
import { Default as TagListStories } from '@/stories/lists/TagList.stories';

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
