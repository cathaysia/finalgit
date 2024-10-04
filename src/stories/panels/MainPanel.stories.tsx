import type { Meta, StoryObj } from '@storybook/react';
import MainPanel from './MainPanel';

const meta = {
  component: MainPanel,
} satisfies Meta<typeof MainPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
