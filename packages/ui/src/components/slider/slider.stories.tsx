import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: false,
    },
    max: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
  ),
};

export const Range: Story = {
  render: () => (
    <Slider defaultValue={[25, 75]} max={100} step={1} className="w-[60%]" />
  ),
};

export const WithSteps: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={10} className="w-[60%]" />
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-4 w-[60%]">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Volume</span>
        <span className="text-sm text-muted-foreground">50%</span>
      </div>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} disabled className="w-[60%]" />
  ),
};

export const SmallRange: Story = {
  render: () => (
    <div className="space-y-4 w-[60%]">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Price Range</span>
        <span className="text-sm text-muted-foreground">$0 - $100</span>
      </div>
      <Slider defaultValue={[0, 100]} max={100} step={5} />
    </div>
  ),
};
