import type { Meta, StoryObj } from '@storybook/react';

import { LicenseCard } from './license-card';

const meta = {
  component: LicenseCard,
} satisfies Meta<typeof LicenseCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    license: ['mit', 'mit-0', 'osl-3.0', 'zlib'],
  },
};
