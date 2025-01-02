import type { BranchInfo } from '@/bindings';
import type { Meta, StoryObj } from '@storybook/react';

import BranchList from './branch-list';

const meta = {
  component: BranchList,
  decorators: [
    Story => (
      <div className="h-[420px] shadow p-4 border rounded">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BranchList>;

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

const branches: BranchInfo[] = [];

for (const _ in [...Array(1000).keys()]) {
  branches.push({
    remote: null,
    name: createRandomString(10),
    oid: createRandomString(40),
    kind: Math.random() % 1 ? 'Local' : 'Remote',
    is_head: false,
    upstream: null,
  });
}

export const Default: Story = {
  args: {
    branches: [
      {
        remote: null,
        name: 'master',
        oid: 'e5b49f0f6bf15efb2317b17d033c485bb4e897b4',
        kind: 'Local',
        is_head: true,
        upstream: null,
      },
      ...branches,
    ],
  },
};
