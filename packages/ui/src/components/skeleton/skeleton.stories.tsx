import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './skeleton';
import { Card, CardHeader, CardContent } from '../card';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="w-[100px] h-[20px] rounded-full" />,
};

export const Shapes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <span className="text-sm text-muted-foreground">Circle</span>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-md" />
        <span className="text-sm text-muted-foreground">Rounded Square</span>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-[250px]" />
        <span className="text-sm text-muted-foreground">Line</span>
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  ),
};

export const CommentSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex gap-4">
        <Skeleton className="h-6 w-[80px]" />
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-[60px]" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-8 w-[80px]" />
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[60px]" />
        </div>
      ))}
    </div>
  ),
};

export const FormSkeleton: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-10 w-[120px]" />
    </div>
  ),
};
