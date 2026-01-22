import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';
import { Input } from '../input';
import { Switch } from '../switch';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Email address',
    htmlFor: 'email',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="name">
        Name <span className="text-destructive">*</span>
      </Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-1.5">
      <Label htmlFor="username">Username</Label>
      <Input id="username" placeholder="Choose a username" />
      <p className="text-xs text-muted-foreground">
        This will be your public display name.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled" className="text-muted-foreground">
        Disabled Input
      </Label>
      <Input id="disabled" disabled placeholder="Cannot edit" />
    </div>
  ),
};
