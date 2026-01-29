import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './textarea';
import { Label } from '../label';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Type your message here...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
    defaultValue: 'You cannot edit this content.',
  },
};

export const WithError: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        placeholder="Tell us about yourself..."
        error="Bio must be at least 10 characters"
      />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        placeholder="Describe your project..."
        helperText="Maximum 500 characters"
      />
    </div>
  ),
};

export const CustomRows: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Label>3 rows</Label>
        <Textarea rows={3} placeholder="3 rows..." />
      </div>
      <div className="space-y-2">
        <Label>6 rows</Label>
        <Textarea rows={6} placeholder="6 rows..." />
      </div>
      <div className="space-y-2">
        <Label>10 rows</Label>
        <Textarea rows={10} placeholder="10 rows..." />
      </div>
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'This is read-only content that cannot be edited by the user.',
  },
};

export const WithMaxLength: Story = {
  render: () => (
    <div className="space-y-2 max-w-md">
      <Label htmlFor="tweet">Tweet</Label>
      <Textarea
        id="tweet"
        placeholder="What's happening?"
        maxLength={280}
        helperText="Max 280 characters"
      />
    </div>
  ),
};
