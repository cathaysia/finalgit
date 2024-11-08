import type { Meta, StoryObj } from '@storybook/react';

import CommitItem from './commit-item';

const meta = {
  component: CommitItem,
} satisfies Meta<typeof CommitItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    commit: {
      oid: '67d10d5e1ec6a74346649d5911dbc7e15168dd83',
      time: 29201928384,
      author: {
        name: 'Bob',
        email: 'Bob@finalgit.com',
        time: new Date().getTime() / 1000,
      },
      commiter: {
        name: 'Alice',
        email: 'Alice@finalgit.com',
        time: new Date().getTime() / 1000,
      },
      message: 'first commit.',
      summary: 'first commit.',
      body: null,
    },
    isGood: false,
    isBad: false,
    isBisecting: false,
    isNext: false,
  },
};
