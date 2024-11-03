import type { Meta, StoryObj } from '@storybook/react';

import BranchItem from './branch-item';

const meta = {
  component: BranchItem,
} satisfies Meta<typeof BranchItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    info: {
      remote: null,
      name: 'maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaster',
      commit: 'e5b49f0f6bf15efb2317b17d033c485bb4e897b4',
      kind: 'Local',
      is_head: true,
      upstream: null,
    },
    className: '',
  },
};
