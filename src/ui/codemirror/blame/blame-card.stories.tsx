import type { Meta, StoryObj } from '@storybook/react';

import { BlameCard } from './blame-card';

const meta = {
  component: BlameCard,
} satisfies Meta<typeof BlameCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blame: {
      lines: 10,
      final_commit_id: 'asdfasdfasdfasdf',
      final_start_line: 0,
      signature: {
        name: 'Bob',
        email: 'fasdfasdf',
        time: 12132123,
      },
    },
  },
};
