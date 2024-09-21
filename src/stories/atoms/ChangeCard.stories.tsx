import type { Meta, StoryObj } from '@storybook/react';

import GitFileStatus from '@/lib/file_status';
import ChangeCard from './ChangeCard';

const meta = {
    component: ChangeCard,
} satisfies Meta<typeof ChangeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        changeSet: [
            {
                path: 'build-language.ts',
                status: GitFileStatus.IndexModified,
            },
            {
                path: 'README.md',
                status: GitFileStatus.IndexNew,
            },
            {
                path: 'README.adoc',
                status: GitFileStatus.WtDeleted,
            },
        ],
    },
};
