import type { Meta, StoryObj } from "@storybook/react";

import { Nav } from "./Nav";

const meta = {
	component: Nav,
} satisfies Meta<typeof Nav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		to: "to",
		text: {},
	},
};
