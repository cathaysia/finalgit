import type { Meta, StoryObj } from '@storybook/react';

import GitFileStatus from '@/lib/file_status';
import ChangeList from './ChangeList';

const meta = {
    component: ChangeList,
} satisfies Meta<typeof ChangeList>;

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
