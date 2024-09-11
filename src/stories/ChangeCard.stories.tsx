import type { Meta, StoryObj } from "@storybook/react";

import ChangeCard from "./ChangeCard";
import GitFileStatus from "@/lib/file_status";

const meta = {
    component: ChangeCard,
} satisfies Meta<typeof ChangeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        changeSet: [
            {
                path: "build-language.ts",
                status: GitFileStatus.INDEX_MODIFIED,
            },
            {
                path: "README.md",
                status: GitFileStatus.INDEX_NEW,
            },
            {
                path: "README.adoc",
                status: GitFileStatus.WT_DELETED,
            },
        ],
    },
};
