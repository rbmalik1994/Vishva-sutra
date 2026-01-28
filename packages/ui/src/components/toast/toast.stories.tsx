import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToast,
  Toaster,
} from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <Toaster />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        });
      }}
    >
      Add to calendar
    </Button>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

function DestructiveToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      }}
    >
      Show Destructive Toast
    </Button>
  );
}

export const Destructive: Story = {
  render: () => <DestructiveToastDemo />,
};

function ToastWithActionDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Your message has been sent.',
          description: 'The recipient will receive it shortly.',
          action: <ToastAction altText="Undo">Undo</ToastAction>,
        });
      }}
    >
      Show Toast with Action
    </Button>
  );
}

export const WithAction: Story = {
  render: () => <ToastWithActionDemo />,
};

function SimpleToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: 'Your message has been sent.',
        });
      }}
    >
      Show Simple Toast
    </Button>
  );
}

export const Simple: Story = {
  render: () => <SimpleToastDemo />,
};

function TitleOnlyDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: 'Toast notification',
        });
      }}
    >
      Show Title Only Toast
    </Button>
  );
}

export const TitleOnly: Story = {
  render: () => <TitleOnlyDemo />,
};
