import type { Meta, StoryObj } from '@storybook/react';

import StashItem from './stash-item';

const meta = {
  component: StashItem,
} satisfies Meta<typeof StashItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stash: {
      id: 0,
      oid: '7d9ee18c4e6ea9d30d75da1a5449e323cef855da',
      message: 'sstashstashstashstashstashstashstashstashtash',
    },
  },
};
