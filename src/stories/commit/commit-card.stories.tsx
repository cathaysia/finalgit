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
      author: {
        name: 'Pranav Bhandari',
        email: 'bpranav@meta.com',
        time: 1735336111,
      },
      body: `Summary:
X-link: https://github.com/facebookincubator/zstrong/pull/1098

We have been manually syncing our builds when there is a change in builds of our dependencies (folly, thrift). This has been one of the major source of work in OSS maintenance. Migrating to getdeps will automatically sync the dependencies which means we only have to manage our own builds.

NOTE: There is a dependency of getdeps on zlib which requires us to first run sudo dnf install -y zlib-devel before we successfully run getdeps. I don't think this should affect the OSS build as it is a getdeps dependency.

Reviewed By: haowu14

Differential Revision: D65844211

fbshipit-source-id: 8e89e670cdec4a21ca7aba48ae58b5b72ddbf832`,
      commiter: {
        name: 'Facebook GitHub Bot',
        email: 'facebook-github-bot@users.noreply.github.com',
        time: 1735336111,
      },
      message:
        'Migrate OSS build from custom to getdeps↵↵Summary:↵X-link: https://github.com/facebookincubator/zstrong/pull/1098↵↵We have been manuall…',
      oid: '7fad06e3d1ce4e427ea68abca9e862cced07607a',
      summary: 'Migrate OSS build from custom to getdeps',
      time: 1735336111,
    },
  },
};
