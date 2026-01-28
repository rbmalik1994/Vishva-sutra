import type { Meta, StoryObj } from '@storybook/react';
import { NativeSelect } from './native-select';

const meta: Meta<typeof NativeSelect> = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
  argTypes: {
    selectSize: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Default: Story = {
  render: () => (
    <NativeSelect>
      <option value="">Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </NativeSelect>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="country" className="text-sm font-medium">
        Country
      </label>
      <NativeSelect id="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </NativeSelect>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Small</label>
        <NativeSelect selectSize="sm">
          <option value="">Select...</option>
          <option value="1">Option 1</option>
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Default</label>
        <NativeSelect selectSize="default">
          <option value="">Select...</option>
          <option value="1">Option 1</option>
        </NativeSelect>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Large</label>
        <NativeSelect selectSize="lg">
          <option value="">Select...</option>
          <option value="1">Option 1</option>
        </NativeSelect>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled>
      <option value="">Select an option</option>
      <option value="1">Option 1</option>
    </NativeSelect>
  ),
};
