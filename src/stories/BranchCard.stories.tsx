import type { Meta, StoryObj } from "@storybook/react";

import BranchCard from "./BranchCard";

const meta = {
	component: BranchCard,
} satisfies Meta<typeof BranchCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		branches: [],
		tags: [],
	},
};
