import type { Meta, StoryObj } from '@storybook/react';

import type { TagInfo } from '@/bindings';
import { TagList } from './TagList';

const meta = {
  component: TagList,
} satisfies Meta<typeof TagList>;

export default meta;

type Story = StoryObj<typeof meta>;

function createRandomString(length: number) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const tags: TagInfo[] = [];
for (const _ in Array(1000)) {
  tags.push({
    name: createRandomString(10),
    commit: createRandomString(40).toLowerCase(),
    ref_hash: createRandomString(40).toLowerCase(),
  });
}

export const Default: Story = {
  args: {
    tags: tags,
  },
};
