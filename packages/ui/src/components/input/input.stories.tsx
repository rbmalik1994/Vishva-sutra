import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Label } from '../label';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    variant: 'error',
    error: 'This field is required',
    placeholder: 'Enter text...',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'We will never share your email with anyone.',
    placeholder: 'Enter your email...',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftElement: (
      <svg
        className="h-4 w-4 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    placeholder: 'Search...',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightElement: (
      <svg
        className="h-4 w-4 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input (default)" />
      <Input inputSize="lg" placeholder="Large input" />
      <Input inputSize="xl" placeholder="Extra large input" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};

export const FileInput: Story = {
  args: {
    type: 'file',
  },
};

export const CompleteForm: Story = {
  render: () => (
    <form className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="name" required>
          Full Name
        </Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-form" required>
          Email
        </Label>
        <Input
          id="email-form"
          type="email"
          placeholder="john@example.com"
          helperText="We'll use this for account notifications"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-form" required>
          Password
        </Label>
        <Input
          id="password-form"
          type="password"
          placeholder="••••••••"
          error="Password must be at least 8 characters"
        />
      </div>
    </form>
  ),
};
