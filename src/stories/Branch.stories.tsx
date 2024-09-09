import type { Meta, StoryObj } from "@storybook/react";

import Branch from "./Branch";

const meta = {
	component: Branch,
} satisfies Meta<typeof Branch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		branch: "master",
		is_head: false,
		is_local: true,
		upstream: "origin/master",
		className: "",
	},
};
