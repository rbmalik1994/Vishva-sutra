import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch } from './switch';
import { Label } from '../label';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center space-x-2">
        <Switch id="small" size="sm" />
        <Label htmlFor="small">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="medium" size="md" />
        <Label htmlFor="medium">Medium</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="large" size="lg" />
        <Label htmlFor="large">Large</Label>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off">Disabled (off)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on">Disabled (on)</Label>
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  render: function Render() {
    const [checked, setChecked] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="controlled" checked={checked} onCheckedChange={setChecked} />
          <Label htmlFor="controlled">
            {checked ? 'Enabled' : 'Disabled'}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Current state: <strong>{checked ? 'ON' : 'OFF'}</strong>
        </p>
      </div>
    );
  },
};
