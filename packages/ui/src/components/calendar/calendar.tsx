'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  defaultMonth?: Date;
  disabled?: (date: Date) => boolean;
  mode?: 'single' | 'multiple' | 'range';
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  
  return days;
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const days = getDaysInMonth(year, month);
  const firstDayOfWeek = days[0].getDay();
  const result: (Date | null)[] = [];
  
  for (let i = 0; i < firstDayOfWeek; i++) {
    result.push(null);
  }
  
  result.push(...days);
  
  const remainingDays = 7 - (result.length % 7);
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      result.push(null);
    }
  }
  
  return result;
}

function isSameDay(date1: Date | undefined, date2: Date | undefined): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, selected, onSelect, defaultMonth, disabled, ...props }, ref) => {
    const [currentMonth, setCurrentMonth] = React.useState(() => {
      return defaultMonth || selected || new Date();
    });

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const calendarDays = getCalendarDays(year, month);

    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
      setCurrentMonth(new Date(year, month + 1, 1));
    };

    const handleDayClick = (date: Date) => {
      if (disabled?.(date)) return;
      
      if (isSameDay(selected, date)) {
        onSelect?.(undefined);
      } else {
        onSelect?.(date);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('p-3', className)}
        {...props}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-7 w-7"
            aria-label="Go to previous month"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-sm font-medium">
            {MONTHS[month]} {year}
          </div>
          <button
            onClick={goToNextMonth}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-7 w-7"
            aria-label="Go to next month"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              {WEEKDAYS.map((day) => (
                <th
                  key={day}
                  className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] pb-2"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: calendarDays.length / 7 }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {calendarDays.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => {
                  const key = date ? date.toISOString() : `empty-${weekIndex}-${dayIndex}`;
                  const isSelected = date ? isSameDay(date, selected) : false;
                  const isTodayDate = date ? isToday(date) : false;
                  const isDisabled = date ? disabled?.(date) : true;

                  return (
                    <td key={key} className="text-center p-0">
                      {date && (
                        <button
                          onClick={() => handleDayClick(date)}
                          disabled={isDisabled}
                          className={cn(
                            'inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                            'hover:bg-accent hover:text-accent-foreground',
                            isSelected && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                            isTodayDate && !isSelected && 'bg-accent text-accent-foreground',
                            isDisabled && 'text-muted-foreground opacity-50 cursor-not-allowed hover:bg-transparent'
                          )}
                          aria-selected={isSelected}
                          aria-disabled={isDisabled}
                        >
                          {date.getDate()}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
Calendar.displayName = 'Calendar';

export { Calendar };
export type { CalendarProps };
