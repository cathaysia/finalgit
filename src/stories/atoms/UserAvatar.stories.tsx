import type { Meta, StoryObj } from '@storybook/react';

import UserAvatar from './UserAvatar';

const meta = {
    component: UserAvatar,
} satisfies Meta<typeof UserAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        userName: ['Bob', 'Alice'],
    },
};
