import type { Meta, StoryObj } from '@storybook/react';

import CommitItem from './CommitItem';

const meta = {
  component: CommitItem,
} satisfies Meta<typeof CommitItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    commit: {
      hash: '67d10d5e1ec6a74346649d5911dbc7e15168dd83',
      time: 29201928384,
      author: {
        name: 'Bob',
        email: 'Bob@finalgit.com',
      },
      commiter: {
        name: 'Alice',
        email: 'Alice@finalgit.com',
      },
      message: 'first commit.',
      summary: 'first commit.',
    },
  },
};