import type { Meta, StoryObj } from "@storybook/react";

import { Default as BranchListStories } from "./BranchList.stories.tsx";
import BranchPanel from "./BranchPanel.tsx";
import { Default as TagListStories } from "./TagList.stories.tsx";

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
