import type { Meta, StoryObj } from "@storybook/react";

import MainPanel from "./MainPanel";
import { Default as BranchListStories } from "./BranchList.stories.tsx";
import { Default as TagListStories } from "./TagList.stories.tsx";
import { Default as ChangeCardStories } from "./ChangeCard.stories.tsx";

const meta = {
    component: MainPanel,
} satisfies Meta<typeof MainPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        project_name: "project_name",
        branches: BranchListStories.args.branches,
        tags: TagListStories.args.tags,
        changeSet: ChangeCardStories.args.changeSet,
        branchName: "branchName",
    },
};
