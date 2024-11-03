import type { Meta, StoryObj } from '@storybook/react';
import StashList from '../stash/stash-list';

const meta = {
  component: StashList,
} satisfies Meta<typeof StashList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stashList: [
      {
        id: 0,
        oid: '73b43fbc22240376c5a2fbadee2deb0653c94b14',
        message: 'asdfasdfdasfdasdfasdf',
      },
      {
        id: 1,
        oid: '73b43fbc22240376c5a2fbadee2deb0653c94b14',
        message: 'asdfasdf',
      },
      {
        id: 2,
        oid: '73b43fbc22240376c5a2fbadee2deb0653c94b14',
        message: 'asdfasdf',
      },
    ],
  },
};
