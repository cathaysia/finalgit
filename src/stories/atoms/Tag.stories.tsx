import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './Tag';

const meta = {
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    info: {
      name: 'v1',
      commit: 'b51e7cbf8cf28be7d277e2d2b2a429885334ec7d',
      ref_hash: 'b51e7cbf8cf28be7d277e2d2b2a429885334ec7d',
    },
  },
};
