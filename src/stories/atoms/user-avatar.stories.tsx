import type { Meta, StoryObj } from '@storybook/react';

import UserAvatar from './user-avatar';

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
