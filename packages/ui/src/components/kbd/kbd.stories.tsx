import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
};

export const Combination: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </div>
  ),
};

export const CommonShortcuts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Save</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Copy</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Paste</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>V</Kbd>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Undo</span>
        <div className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">K</Kbd>
        <span className="ml-2 text-sm">Small</span>
      </div>
      <div className="flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <span className="ml-2 text-sm">Default</span>
      </div>
      <div className="flex items-center gap-1">
        <Kbd size="lg">⌘</Kbd>
        <Kbd size="lg">K</Kbd>
        <span className="ml-2 text-sm">Large</span>
      </div>
    </div>
  ),
};
