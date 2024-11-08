import type { Meta, StoryObj } from '@storybook/react';

import CommitCard from './commit-card';

const meta = {
  component: CommitCard,
} satisfies Meta<typeof CommitCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    info: {
      oid: '67d10d5e1ec6a74346649d5911dbc7e15168dd83',
      time: 1501968384,
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
  },
};
