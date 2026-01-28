import type { Meta, StoryObj } from '@storybook/react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Button } from '../button';

const meta: Meta<typeof HoverCard> = {
  title: 'Components/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <svg
                className="mr-2 h-4 w-4 opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};

export const WithStats: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">View profile</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold">shadcn</h4>
              <p className="text-sm text-muted-foreground">@shadcn</p>
            </div>
          </div>
          <p className="text-sm">
            Building @shadcn/ui. Open source components for React.
          </p>
          <div className="flex space-x-4 text-sm">
            <div>
              <span className="font-semibold">1.2k</span>{' '}
              <span className="text-muted-foreground">Following</span>
            </div>
            <div>
              <span className="font-semibold">12.4k</span>{' '}
              <span className="text-muted-foreground">Followers</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
};
