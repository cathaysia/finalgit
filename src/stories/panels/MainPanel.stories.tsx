import type { Meta, StoryObj } from '@storybook/react';

import { Default as BranchListStories } from '@/stories/lists/BranchList.stories';
import { Default as TagListStories } from '@/stories/lists/TagList.stories';
import MainPanel from './MainPanel';

const meta = {
    component: MainPanel,
} satisfies Meta<typeof MainPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
