import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Single: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
        </svg>
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h8a4 4 0 100-8H6v8zm0 0h9a4 4 0 110 8H6v-8z" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v8a4 4 0 008 0V8M5 21h14" />
        </svg>
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
        </svg>
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
        </svg>
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="single" size="sm" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Align left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" disabled>
      <ToggleGroupItem value="left" aria-label="Align left">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
