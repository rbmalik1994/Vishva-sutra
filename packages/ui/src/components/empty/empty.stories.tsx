import type { Meta, StoryObj } from '@storybook/react';
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction } from './empty';
import { Button } from '../button';

const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyIcon>
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </EmptyIcon>
      <EmptyTitle>No messages</EmptyTitle>
      <EmptyDescription>
        You don&apos;t have any messages yet. Start a conversation to see them here.
      </EmptyDescription>
      <EmptyAction>
        <Button>Start a conversation</Button>
      </EmptyAction>
    </Empty>
  ),
};

export const NoResults: Story = {
  render: () => (
    <Empty>
      <EmptyIcon>
        <svg
          className="h-12 w-12"
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
      </EmptyIcon>
      <EmptyTitle>No results found</EmptyTitle>
      <EmptyDescription>
        We couldn&apos;t find any results matching your search. Try adjusting your filters.
      </EmptyDescription>
    </Empty>
  ),
};

export const EmptyCart: Story = {
  render: () => (
    <Empty>
      <EmptyIcon>
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </EmptyIcon>
      <EmptyTitle>Your cart is empty</EmptyTitle>
      <EmptyDescription>
        Looks like you haven&apos;t added anything to your cart yet.
      </EmptyDescription>
      <EmptyAction>
        <Button>Continue Shopping</Button>
      </EmptyAction>
    </Empty>
  ),
};
