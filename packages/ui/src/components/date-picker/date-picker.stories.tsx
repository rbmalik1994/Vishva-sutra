import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './date-picker';
import * as React from 'react';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date>();
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

export const WithPlaceholder: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date>();
    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Pick a date"
      />
    );
  },
};

export const WithPreselectedDate: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date>(new Date());
    return <DatePicker date={date} onDateChange={setDate} />;
  },
};

export const Disabled: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date>();
    return <DatePicker date={date} onDateChange={setDate} disabled />;
  },
};
