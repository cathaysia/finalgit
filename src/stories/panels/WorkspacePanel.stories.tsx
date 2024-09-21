import type { Meta, StoryObj } from '@storybook/react';

import { Default as ChangeCardStories } from '@/stories/atoms/ChangeCard.stories';
import WorkspacePanel from './WorkspacePanel';

const meta = {
    component: WorkspacePanel,
} satisfies Meta<typeof WorkspacePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        branchName: 'master',
        upstream: 'origin/master',
        changeSet: ChangeCardStories.args.changeSet,
        files: [],
    },
};
