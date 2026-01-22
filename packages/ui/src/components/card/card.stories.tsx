import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card';
import { Button } from '../button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline', 'ghost', 'glass'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description with additional context.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This can contain any content you need.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" className="w-[350px]">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has a higher elevation shadow.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content with more visual prominence.</p>
      </CardContent>
    </Card>
  ),
};

export const Outline: Story = {
  render: () => (
    <Card variant="outline" className="w-[350px]">
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>Minimal shadow, just a border.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Clean, minimal appearance.</p>
      </CardContent>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" className="w-[350px]">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>No border or background.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Blends into the background.</p>
      </CardContent>
    </Card>
  ),
};

export const Glass: Story = {
  render: () => (
    <div className="relative p-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
      <Card variant="glass" className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-white">Glass Card</CardTitle>
          <CardDescription className="text-white/80">
            Frosted glass effect with backdrop blur.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">Works best on colorful backgrounds.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <Card padding="lg" className="w-[350px]">
      <p>Card with built-in padding (lg). No need for separate CardContent.</p>
    </Card>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            placeholder="My Awesome Project"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="framework" className="text-sm font-medium">
            Framework
          </label>
          <select
            id="framework"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option>Next.js</option>
            <option>Vite</option>
            <option>Astro</option>
          </select>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};
