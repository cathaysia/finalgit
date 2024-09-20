import type { BranchInfo } from "@/bindings";
import type { Meta, StoryObj } from "@storybook/react";

import BranchList from "./BranchList";

const meta = {
    component: BranchList,
} satisfies Meta<typeof BranchList>;

export default meta;

type Story = StoryObj<typeof meta>;

function createRandomString(length: number) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const branches: BranchInfo[] = [];

for (const _ in Array(1000)) {
    branches.push({
        remote: null,
        name: createRandomString(10),
        commit: createRandomString(40),
        kind: Math.random() % 1 ? "Local" : "Remote",
        is_head: false,
        upstream: null,
    });
}

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
            ...branches,
        ],
    },
};
