import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './combobox';
import * as React from 'react';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('');
    return (
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search framework..."
        emptyMessage="No framework found."
      />
    );
  },
};

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
];

export const WithManyOptions: Story = {
  render: function Render() {
    const [value, setValue] = React.useState('');
    return (
      <Combobox
        options={countries}
        value={value}
        onValueChange={setValue}
        placeholder="Select country..."
        searchPlaceholder="Search countries..."
        emptyMessage="No country found."
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Combobox
      options={frameworks}
      value=""
      onValueChange={() => {}}
      placeholder="Select framework..."
      disabled
    />
  ),
};
