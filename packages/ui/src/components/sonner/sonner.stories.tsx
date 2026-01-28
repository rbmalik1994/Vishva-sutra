import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toast } from './sonner';
import { Button } from '../button';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast('Event has been created')}
    >
      Show Toast
    </Button>
  ),
};

export const Description: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        })
      }
    >
      Show Toast with Description
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.success('Event created successfully')}
    >
      Show Success Toast
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.error('Something went wrong')}
    >
      Show Error Toast
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.info('New update available')}
    >
      Show Info Toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.warning('This action is irreversible')}
    >
      Show Warning Toast
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Event has been created', {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo clicked'),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
};

export const Promise: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
        toast.promise(promise, {
          loading: 'Loading...',
          success: 'Data loaded successfully',
          error: 'Error loading data',
        });
      }}
    >
      Show Promise Toast
    </Button>
  ),
};
