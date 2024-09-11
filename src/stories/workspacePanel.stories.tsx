import type { Meta, StoryObj } from "@storybook/react";

import WorkspacePanel from "./workspacePanel";

const meta = {
	component: WorkspacePanel,
} satisfies Meta<typeof WorkspacePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		branchName: "master",
		upstream: "origin/master",
		changeSet: [],
	},
};
