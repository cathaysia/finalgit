import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Meta, StoryObj } from '@storybook/react';
import type { Preview, StoryFn } from '@storybook/react';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  CollapseGroupItem,
  CollapseGroupTrigger,
  CollapseMenuGroup,
} from './collapse-group';

const meta = {
  component: CollapseMenuGroup,
  decorators: [
    (Story: StoryFn) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>item 1</DropdownMenuItem>
            <DropdownMenuItem>item 2</DropdownMenuItem>
            <Story />
            <DropdownMenuItem>item 3</DropdownMenuItem>
            <DropdownMenuItem>item 4</DropdownMenuItem>
            <DropdownMenuItem>item 4</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  ],
} satisfies Meta<typeof CollapseMenuGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

let isOpen = false;

export const Default: Story = {
  args: {
    isOpen: isOpen,
    trigger: (
      <CollapseGroupTrigger
        isOpen={isOpen}
        onClick={() => {
          isOpen = !isOpen;
        }}
      >
        item 3
      </CollapseGroupTrigger>
    ),
    children: (
      <>
        <CollapseGroupItem>sub menu1</CollapseGroupItem>
        <CollapseGroupItem>sub menu2</CollapseGroupItem>
        <CollapseGroupItem>sub menu3</CollapseGroupItem>
      </>
    ),
  },
};
