import type { Meta, StoryObj } from "@storybook/react";

import Commiter from "./Commiter";

const meta = {
    component: Commiter,
} satisfies Meta<typeof Commiter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        changeSet: [],
    },
};
