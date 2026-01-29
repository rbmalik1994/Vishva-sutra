import type { Meta, StoryObj } from '@storybook/react';
import { InputGroup, InputGroupInput, InputGroupAddon } from './input-group';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Amount" type="number" />
      <InputGroupAddon>USD</InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBothAddons: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>$</InputGroupAddon>
      <InputGroupInput placeholder="0.00" type="number" />
      <InputGroupAddon>/mo</InputGroupAddon>
    </InputGroup>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <svg
          className="h-4 w-4"
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
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
};

export const Email: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </InputGroupAddon>
      <InputGroupInput type="email" placeholder="you@example.com" />
    </InputGroup>
  ),
};
