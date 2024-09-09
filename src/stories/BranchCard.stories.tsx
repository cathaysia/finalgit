import type { Meta, StoryObj } from "@storybook/react";

import BranchCard from "./BranchCard";

const meta = {
	component: BranchCard,
} satisfies Meta<typeof BranchCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		branches: [
			{
				remote: null,
				name: "master",
				commit: "e5b49f0f6bf15efb2317b17d033c485bb4e897b4",
				kind: "Local",
				is_head: true,
				upstream: null,
			},
			{
				remote: null,
				name: "dev",
				commit: "e5b49f0f6bf15efb2317b17d033c485bb4e897b4",
				kind: "Remote",
				is_head: false,
				upstream: "origin/dev",
			},
		],
		tags: [],
	},
};
