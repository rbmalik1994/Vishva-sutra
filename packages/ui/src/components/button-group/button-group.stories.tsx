import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './button-group';
import { Button } from "../button"

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  } as any,
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button>Left</Button>
      <Button>Middle</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ButtonGroup variant="outline">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
};

export const Ghost: Story = {
  render: () => (
    <ButtonGroup variant="ghost">
      <Button>Day</Button>
      <Button>Week</Button>
      <Button>Month</Button>
      <Button type="button">Year</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button>Top</Button>
      <Button>Middle</Button>
      <Button>Bottom</Button>
    </ButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup size="sm">
        <Button>Small</Button>
        <Button>Size</Button>
        <Button>Buttons</Button>
      </ButtonGroup>
      <ButtonGroup size="default">
        <Button>Default</Button>
        <Button type="button">Size</Button>
        <Button type="button">Buttons</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button>Large</Button>
        <Button>Size</Button>
        <Button>Buttons</Button>
      </ButtonGroup>
      <ButtonGroup size="lg">
        <Button>Large</Button>
        <Button>Size</Button>
        <Button>Buttons</Button>
      </ButtonGroup>
    </div>
  ),
};
