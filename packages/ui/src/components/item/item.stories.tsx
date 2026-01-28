import type { Meta, StoryObj } from '@storybook/react';
import { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemAction } from './item';
import { Button } from '../button';

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Default: Story = {
  render: () => (
    <Item>
      <ItemIcon>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </ItemIcon>
      <ItemContent>
        <ItemTitle>Document.pdf</ItemTitle>
        <ItemDescription>2.4 MB • Modified 2 hours ago</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Item>
      <ItemIcon>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </ItemIcon>
      <ItemContent>
        <ItemTitle>John Doe</ItemTitle>
        <ItemDescription>john@example.com</ItemDescription>
      </ItemContent>
      <ItemAction>
        <Button variant="outline" size="sm">View</Button>
      </ItemAction>
    </Item>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Item variant="bordered">
      <ItemIcon>
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </ItemIcon>
      <ItemContent>
        <ItemTitle>Project Files</ItemTitle>
        <ItemDescription>12 items • Last updated yesterday</ItemDescription>
      </ItemContent>
      <ItemAction>
        <Button variant="ghost" size="sm">Open</Button>
      </ItemAction>
    </Item>
  ),
};

export const ItemList: Story = {
  render: () => (
    <div className="space-y-2">
      <Item variant="bordered">
        <ItemIcon>📄</ItemIcon>
        <ItemContent>
          <ItemTitle>Report.docx</ItemTitle>
          <ItemDescription>1.2 MB</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant="ghost" size="sm">Download</Button>
        </ItemAction>
      </Item>
      <Item variant="bordered">
        <ItemIcon>📊</ItemIcon>
        <ItemContent>
          <ItemTitle>Analytics.xlsx</ItemTitle>
          <ItemDescription>856 KB</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant="ghost" size="sm">Download</Button>
        </ItemAction>
      </Item>
      <Item variant="bordered">
        <ItemIcon>🖼️</ItemIcon>
        <ItemContent>
          <ItemTitle>Screenshot.png</ItemTitle>
          <ItemDescription>2.1 MB</ItemDescription>
        </ItemContent>
        <ItemAction>
          <Button variant="ghost" size="sm">Download</Button>
        </ItemAction>
      </Item>
    </div>
  ),
};
