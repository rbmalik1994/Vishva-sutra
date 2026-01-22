import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/card';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Switch } from '../components/switch';
import { Alert, AlertTitle, AlertDescription } from '../components/alert';
import { Spinner } from '../components/spinner';
import { Separator } from '../components/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../components/avatar';

const meta: Meta = {
  title: 'Themes/Theme Showcase',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const AllComponents: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Theme Preview</h2>
        <p className="text-muted-foreground mb-6">
          Use the theme switcher in the toolbar above to see how all components
          adapt to different themes.
        </p>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard elevation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the default card variant with subtle shadow.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Higher elevation</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has more prominent shadow for emphasis.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>

          <Card variant="outline">
            <CardHeader>
              <CardTitle>Outline Card</CardTitle>
              <CardDescription>Border only</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Minimal card with just a border, no shadow.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                Action
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Form Elements</h3>
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <Label htmlFor="demo-input">Text Input</Label>
            <Input id="demo-input" placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="demo-error">Input with Error</Label>
            <Input
              id="demo-error"
              placeholder="Enter text..."
              error="This field has an error"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="demo-switch" />
            <Label htmlFor="demo-switch">Toggle Setting</Label>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Alerts</h3>
        <div className="space-y-4 max-w-lg">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert with important information.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error Alert</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Your changes have been saved successfully.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please review before proceeding.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Avatars</h3>
        <div className="flex items-center gap-4">
          <Avatar size="xs">
            <AvatarFallback>XS</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar size="xl">
            <AvatarFallback>XL</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Loading States</h3>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            <span>Small</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <Spinner size="lg" />
            <span>Large</span>
          </div>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Typography</h3>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <h3 className="text-2xl font-semibold">Heading 3</h3>
          <h4 className="text-xl font-medium">Heading 4</h4>
          <p className="text-base">Regular paragraph text</p>
          <p className="text-sm text-muted-foreground">
            Muted text for secondary information
          </p>
          <p className="text-xs text-muted-foreground">
            Small muted text for captions
          </p>
        </div>
      </section>

      <Separator />

      <section>
        <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-primary"></div>
            <p className="text-sm font-medium">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-secondary"></div>
            <p className="text-sm font-medium">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-accent"></div>
            <p className="text-sm font-medium">Accent</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-muted"></div>
            <p className="text-sm font-medium">Muted</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-destructive"></div>
            <p className="text-sm font-medium">Destructive</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-success"></div>
            <p className="text-sm font-medium">Success</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md bg-warning"></div>
            <p className="text-sm font-medium">Warning</p>
          </div>
          <div className="space-y-2">
            <div className="h-16 rounded-md border border-border"></div>
            <p className="text-sm font-medium">Border</p>
          </div>
        </div>
      </section>
    </div>
  ),
};

export const ModernTheme: Story = {
  parameters: {
    globals: { theme: 'modern-light' },
  },
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Modern Theme</h2>
      <p className="text-muted-foreground mb-6">
        Clean, minimal design inspired by shadcn/ui. Features neutral colors,
        subtle shadows, and excellent readability.
      </p>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Modern Design</CardTitle>
          <CardDescription>Timeless and accessible</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Active</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const CyberpunkTheme: Story = {
  parameters: {
    globals: { theme: 'cyberpunk' },
  },
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Cyberpunk Theme</h2>
      <p className="text-muted-foreground mb-6">
        Neon-lit streets of the future. Features electric greens, magentas,
        and a dark purple-tinted background with glowing shadows.
      </p>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Neon Dreams</CardTitle>
          <CardDescription>High contrast, high impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </div>
          <div className="flex gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Online</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const RetroTheme: Story = {
  parameters: {
    globals: { theme: 'retro' },
  },
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Retro Theme</h2>
      <p className="text-muted-foreground mb-6">
        Nostalgic GUI/TUI aesthetics. Features hard shadows, no border radius,
        and typography inspired by classic computing.
      </p>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Throwback Computing</CardTitle>
          <CardDescription>Windows 95 vibes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button>OK</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
          <div className="flex gap-2">
            <Badge>FILE</Badge>
            <Badge variant="success">READY</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const LiquidTheme: Story = {
  parameters: {
    globals: { theme: 'liquid-light' },
  },
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Liquid Theme</h2>
      <p className="text-muted-foreground mb-6">
        Apple-inspired design with translucent surfaces and vibrant colors.
        Features frosted glass effects and generous border radius.
      </p>
      <div className="relative p-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl">
        <Card variant="glass" className="max-w-md">
          <CardHeader>
            <CardTitle className="text-white">Frosted Glass</CardTitle>
            <CardDescription className="text-white/80">
              Beautiful on any background
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const BrutalistTheme: Story = {
  parameters: {
    globals: { theme: 'brutalist' },
  },
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Brutalist Theme</h2>
      <p className="text-muted-foreground mb-6">
        Raw, uncompromising design. Features stark black and white,
        heavy borders, hard shadows, and bold typography.
      </p>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>NO NONSENSE</CardTitle>
          <CardDescription>Maximum impact, zero decoration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button>CLICK</Button>
            <Button variant="outline">CANCEL</Button>
          </div>
          <div className="flex gap-2">
            <Badge>TAG</Badge>
            <Badge variant="destructive">ALERT</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
