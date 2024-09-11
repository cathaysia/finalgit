import type { Meta, StoryObj } from "@storybook/react";

import ControlPanel from "./ControlPanel";

const meta = {
    component: ControlPanel,
} satisfies Meta<typeof ControlPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

import { Default as BranchListStories } from "./BranchList.stories.tsx";
import { Default as TagListStories } from "./TagList.stories.tsx";

export const Default: Story = {
    args: {
        project_name: "project_name",
        branches: BranchListStories.args.branches,
        tags: TagListStories.args.tags,
    },
};
