# Component API Reference

Complete API documentation for all components in the @vishva-sutra/ui library.

## Table of Contents

- [Button](#button)
- [Card](#card)
- [Badge](#badge)
- [Avatar](#avatar)
- [Input](#input)
- [Textarea](#textarea)
- [Label](#label)
- [Switch](#switch)
- [Select](#select)
- [Dialog](#dialog)
- [Tooltip](#tooltip)
- [Tabs](#tabs)
- [Alert](#alert)
- [Separator](#separator)
- [Skeleton](#skeleton)
- [Spinner](#spinner)

---

## Button

A flexible button component with multiple variants and sizes.

### Import

```tsx
import { Button } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'ghost' \| 'link' \| 'success' \| 'warning'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'icon'` | `'md'` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading spinner |
| `loadingText` | `string` | - | Text to show when loading |
| `leftIcon` | `ReactNode` | - | Icon before button text |
| `rightIcon` | `ReactNode` | - | Icon after button text |
| `asChild` | `boolean` | `false` | Render as child element |
| `disabled` | `boolean` | `false` | Disable button |

### Examples

```tsx
// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>

// With icons
<Button leftIcon={<PlusIcon />}>Add Item</Button>

// Loading state
<Button isLoading loadingText="Saving...">Save</Button>

// As link
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

---

## Card

A container component for grouping related content.

### Import

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@vishva-sutra/ui';
```

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outline' \| 'ghost' \| 'glass'` | `'default'` | Visual style variant |

### Examples

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Glass variant (for Liquid theme)
<Card variant="glass">
  <CardContent>Frosted glass effect</CardContent>
</Card>
```

---

## Badge

Labels and status indicators.

### Import

```tsx
import { Badge } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'success' \| 'warning' \| 'outline'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |

### Examples

```tsx
<Badge>Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="warning" size="sm">Beta</Badge>
```

---

## Avatar

User profile images with fallback support.

### Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@vishva-sutra/ui';
```

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |

### Examples

```tsx
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Avatar group
<div className="flex -space-x-2">
  <Avatar className="border-2 border-background">
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback>U2</AvatarFallback>
  </Avatar>
</div>
```

---

## Input

Text input with validation support.

### Import

```tsx
import { Input } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'filled'` | `'default'` | Visual style variant |
| `inputSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below input |
| `leftAddon` | `ReactNode` | - | Element before input |
| `rightAddon` | `ReactNode` | - | Element after input |

### Examples

```tsx
<Input placeholder="Enter email" />
<Input type="password" />
<Input error="This field is required" />
<Input 
  leftAddon={<span className="text-muted-foreground">$</span>}
  placeholder="0.00"
/>
```

---

## Textarea

Multi-line text input.

### Import

```tsx
import { Textarea } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'filled'` | `'default'` | Visual style variant |
| `error` | `string` | - | Error message |
| `helperText` | `string` | - | Helper text below input |
| `rows` | `number` | `3` | Number of visible rows |

### Examples

```tsx
<Textarea placeholder="Enter description..." />
<Textarea rows={6} maxLength={500} />
```

---

## Label

Accessible form labels.

### Import

```tsx
import { Label } from '@vishva-sutra/ui';
```

### Props

Standard `<label>` props plus styling.

### Examples

```tsx
<Label htmlFor="email">Email Address</Label>
<Input id="email" />

// Required field
<Label htmlFor="name">
  Name <span className="text-destructive">*</span>
</Label>
```

---

## Switch

Toggle switch for boolean settings.

### Import

```tsx
import { Switch } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Switch size |
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state |
| `onCheckedChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable switch |

### Examples

```tsx
<Switch />
<Switch defaultChecked />
<Switch size="lg" onCheckedChange={(v) => console.log(v)} />
```

---

## Select

Dropdown selection component.

### Import

```tsx
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from '@vishva-sutra/ui';
```

### Examples

```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>

// With groups
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select timezone..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern</SelectItem>
      <SelectItem value="pst">Pacific</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">GMT</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

## Dialog

Modal dialog component.

### Import

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@vishva-sutra/ui';
```

### Examples

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Description text here.
      </DialogDescription>
    </DialogHeader>
    <div>Content goes here</div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Tooltip

Contextual information on hover.

### Import

```tsx
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delayDuration` | `number` | `200` | Delay before showing (ms) |
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Tooltip position |

### Examples

```tsx
// Wrap app with TooltipProvider once
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

## Tabs

Tabbed navigation component.

### Import

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@vishva-sutra/ui';
```

### Examples

```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// Vertical orientation
<Tabs defaultValue="tab1" orientation="vertical">
  ...
</Tabs>
```

---

## Alert

Informational messages.

### Import

```tsx
import { Alert, AlertTitle, AlertDescription } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'success' \| 'warning' \| 'info'` | `'default'` | Alert type |
| `icon` | `ReactNode` | - | Custom icon |

### Examples

```tsx
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>Important information here.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

---

## Separator

Visual divider for content.

### Import

```tsx
import { Separator } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider direction |
| `decorative` | `boolean` | `true` | Whether purely decorative |

### Examples

```tsx
<Separator />
<div className="flex h-5 items-center space-x-4">
  <span>Home</span>
  <Separator orientation="vertical" />
  <span>About</span>
</div>
```

---

## Skeleton

Loading placeholder.

### Import

```tsx
import { Skeleton } from '@vishva-sutra/ui';
```

### Examples

```tsx
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-12 w-12 rounded-full" />

// Card skeleton
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

---

## Spinner

Loading indicator.

### Import

```tsx
import { Spinner } from '@vishva-sutra/ui';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spinner size |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'muted'` | `'default'` | Color variant |

### Examples

```tsx
<Spinner />
<Spinner size="lg" variant="primary" />
<Button disabled>
  <Spinner size="sm" className="mr-2" />
  Loading...
</Button>
```

---

## Accessibility

All components follow WCAG 2.2 AA guidelines:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Sufficient color contrast

For accessibility testing, we recommend using [axe-core](https://github.com/dequelabs/axe-core) and [Accessibility Insights](https://accessibilityinsights.io/).
