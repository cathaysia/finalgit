import type { Meta, StoryObj } from "@storybook/react";

import { TagList } from "./TagList";
import { TagInfo } from "@/bindings";

const meta = {
    component: TagList,
} satisfies Meta<typeof TagList>;

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

const tags: TagInfo[] = [...Array(1000).keys()].map((item) => {
    return {
        name: createRandomString(10),
        commit: createRandomString(40).toLowerCase(),
    };
});

export const Default: Story = {
    args: {
        tags: tags,
    },
};
