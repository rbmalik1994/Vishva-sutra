import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';
import { Button } from '../button';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'muted'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Spinner size="xs" />
        <p className="text-xs mt-2">xs</p>
      </div>
      <div className="text-center">
        <Spinner size="sm" />
        <p className="text-xs mt-2">sm</p>
      </div>
      <div className="text-center">
        <Spinner size="md" />
        <p className="text-xs mt-2">md</p>
      </div>
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-xs mt-2">lg</p>
      </div>
      <div className="text-center">
        <Spinner size="xl" />
        <p className="text-xs mt-2">xl</p>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spinner variant="default" />
        <p className="text-xs mt-2">default</p>
      </div>
      <div className="text-center">
        <Spinner variant="primary" />
        <p className="text-xs mt-2">primary</p>
      </div>
      <div className="text-center">
        <Spinner variant="secondary" />
        <p className="text-xs mt-2">secondary</p>
      </div>
      <div className="text-center bg-primary p-4 rounded">
        <Spinner variant="muted" />
        <p className="text-xs mt-2 text-primary-foreground">muted</p>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner size="sm" />
      <span className="text-sm">Loading...</span>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Spinner size="sm" className="mr-2" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <Spinner size="sm" className="mr-2" variant="muted" />
        Please wait
      </Button>
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center h-[300px] gap-4">
      <Spinner size="xl" variant="primary" />
      <p className="text-muted-foreground">Loading your content...</p>
    </div>
  ),
};
