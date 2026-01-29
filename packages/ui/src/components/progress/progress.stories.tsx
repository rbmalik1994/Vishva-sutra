import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 33,
  },
};

export const Half: Story = {
  args: {
    value: 50,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading...</span>
        <span>66%</span>
      </div>
      <Progress value={66} />
    </div>
  ),
};

export const MultipleProgress: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <span className="text-sm font-medium">Downloads</span>
        <Progress value={25} />
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Uploads</span>
        <Progress value={50} />
      </div>
      <div className="space-y-2">
        <span className="text-sm font-medium">Processing</span>
        <Progress value={75} />
      </div>
    </div>
  ),
};
