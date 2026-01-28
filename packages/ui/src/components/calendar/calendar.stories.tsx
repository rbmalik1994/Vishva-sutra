import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './calendar';
import * as React from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const WithRange: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<{ from?: Date; to?: Date }>({
      from: new Date(),
      to: undefined,
    });

    return (
      <Calendar
        mode="range"
        // Calendar expects a Date (or undefined) for `selected` — pass the start of the range
        selected={range.from}
        onSelect={(value: Date | undefined) => {
          // value is a single Date or undefined
          if (!value) {
            setRange({ from: undefined, to: undefined });
            return;
          }

          // If no start is set, or both from/to are set, start a new range
          if (!range.from || (range.from && range.to)) {
            setRange({ from: value, to: undefined });
            return;
          }

          // If start exists and end is not set, set end if value is after start, otherwise restart
          if (range.from && !range.to) {
            if (value >= range.from) {
              setRange({ from: range.from, to: value });
            } else {
              setRange({ from: value, to: undefined });
            }
          }
        }}
        className="rounded-md border"
        numberOfMonths={2}
      />
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        className="rounded-md border"
      />
    );
  },
};
