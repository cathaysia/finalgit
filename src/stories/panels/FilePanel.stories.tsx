import type { Meta, StoryObj } from '@storybook/react';

import FilePanel from './FilePanel';

const meta = {
  component: FilePanel,
} satisfies Meta<typeof FilePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    files: [
      {
        Dir: {
          mode: 755,
          dir: 'src',
          files: [
            {
              File: {
                mode: 755,
                filename: 'index.tsx',
              },
            },
            {
              File: {
                mode: 755,
                filename: 'main.tsx',
              },
            },
          ],
        },
      },
      {
        File: {
          mode: 600,
          filename: 'README.md',
        },
      },
    ],
    commit: 'c1ae3d7af9a0414bdc7aced4182fb742be216bae',
    onClicked: () => {},
  },
};
