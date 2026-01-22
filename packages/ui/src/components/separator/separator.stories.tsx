import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Home</div>
      <Separator orientation="vertical" />
      <div>About</div>
      <Separator orientation="vertical" />
      <div>Contact</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-[350px] border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium">Total</span>
        <span className="font-bold">$99.00</span>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>$89.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>$10.00</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="text-xs text-muted-foreground">
        Thank you for your purchase!
      </div>
    </div>
  ),
};

export const AsSection: Story = {
  render: () => (
    <div className="space-y-4">
      <section>
        <h3 className="font-semibold">Section 1</h3>
        <p className="text-sm text-muted-foreground">
          This is the first section of content.
        </p>
      </section>
      <Separator />
      <section>
        <h3 className="font-semibold">Section 2</h3>
        <p className="text-sm text-muted-foreground">
          This is the second section of content.
        </p>
      </section>
      <Separator />
      <section>
        <h3 className="font-semibold">Section 3</h3>
        <p className="text-sm text-muted-foreground">
          This is the third section of content.
        </p>
      </section>
    </div>
  ),
};

export const WithCustomStyle: Story = {
  render: () => (
    <div className="space-y-4">
      <Separator className="bg-primary" />
      <Separator className="bg-destructive" />
      <Separator className="bg-success" />
      <Separator className="bg-warning" />
    </div>
  ),
};
