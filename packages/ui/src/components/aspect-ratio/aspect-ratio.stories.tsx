import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './aspect-ratio';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="w-[200px]">
      <AspectRatio ratio={3 / 4} className="bg-muted">
        <div className="flex h-full w-full items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          3:4 Portrait
        </div>
      </AspectRatio>
    </div>
  ),
};

export const Cinematic: Story = {
  render: () => (
    <div className="w-[500px]">
      <AspectRatio ratio={21 / 9} className="bg-muted">
        <div className="flex h-full w-full items-center justify-center rounded-md bg-gradient-to-r from-amber-500 to-pink-500 text-white">
          21:9 Cinematic
        </div>
      </AspectRatio>
    </div>
  ),
};
