import type { Meta, StoryObj } from "@storybook/react";

import { GitSideBar } from "./GitSidebar";

const meta = {
	component: GitSideBar,
} satisfies Meta<typeof GitSideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
