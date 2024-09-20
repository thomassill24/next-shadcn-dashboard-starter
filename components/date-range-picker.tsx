'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, subDays, startOfMonth, endOfMonth, format, startOfQuarter, endOfQuarter, subQuarters } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

export function CalendarDateRangePicker({
  className
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  });

  const [selectedPreset, setSelectedPreset] = React.useState<string>('Last 7 days');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // Functions to calculate custom date ranges
  const presets = {
    "Today": {
      from: new Date(),
      to: new Date()
    },
    "Yesterday": {
      from: subDays(new Date(), 1),
      to: subDays(new Date(), 1)
    },
    "This Week": {
      from: subDays(new Date(), new Date().getDay()),
      to: new Date()
    },
    "Last Week": {
      from: subDays(new Date(), 7 + new Date().getDay()),
      to: subDays(new Date(), new Date().getDay() + 1)
    },
    "Last 7 days": {
      from: subDays(new Date(), 7),
      to: new Date()
    },
    "Last 14 days": {
      from: subDays(new Date(), 14),
      to: new Date()
    },
    "Last 30 days": {
      from: subDays(new Date(), 30),
      to: new Date()
    },
    "Last 60 days": {
      from: subDays(new Date(), 60),
      to: new Date()
    },
    "Last 90 days": {
      from: subDays(new Date(), 90),
      to: new Date()
    },
    "This Month": {
      from: startOfMonth(new Date()),
      to: new Date()
    },
    "Last Month": {
      from: startOfMonth(subDays(new Date(), new Date().getDate())),
      to: endOfMonth(subDays(new Date(), new Date().getDate()))
    },
    "This Quarter": {
      from: startOfQuarter(new Date()),
      to: endOfQuarter(new Date())
    },
    "Last Quarter": {
      from: startOfQuarter(subQuarters(new Date(), 1)),
      to: endOfQuarter(subQuarters(new Date(), 1))
    }
  };

  // Function to handle selecting a preset
  const handlePresetSelect = (preset: keyof typeof presets) => {
    setDate(presets[preset]);
    setSelectedPreset(preset);
    setIsOpen(false); // Close popover after selection
  };

  // Function to handle calendar date validation
  const handleValidate = () => {
    if (date?.from && date?.to) {
      setSelectedPreset(''); // Reset the preset name when custom date range is chosen
      setIsOpen(false); // Close the popover
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'white'}
            className={cn(
              'w-fit justify-start text-left font-medium rounded-lg bg-popover text-popover-foreground',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedPreset ? (
              <span>{selectedPreset}</span>
            ) : date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto p-4" align="end">
          
          <div className="flex w-full h-full">
            
            <div className="flex flex-col w-full h-full">
              {/* Warning message with a fixed max width */}
              <div className="p-3 bg-[#F3F0FF] text-[#9747FF] border border-[#d2c7ff] border-1 rounded-lg max-w-lg break-words mb-2">
                <p className='text-[12px]'>
                <b>Warning: </b>If you select a date range before your Pixamp account was created, we will only display data from the links we've generated for your campaigns.</p>
                </div>
              {/* Calendar Component */}
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="h-full"
              />

              {/* Validate Button */}
              <div className="flex justify-end">
                <Button
                  variant="default"
                  onClick={handleValidate}
                  disabled={!date?.from || !date?.to} // Disable if the range is incomplete
                >
                  Validate
                </Button>
              </div>
            </div>

            {/* Scrollable Custom Date Presets */}
            <div className="flex flex-col w-full border-l ml-4 overflow-y-auto h-[390px] text-left">
              <p className="font-semibold text-xs mb-1 pl-2">Preset</p>
              {Object.keys(presets).map((preset) => (
                <Button
                  key={preset}
                  variant={'calendarPreset'}
                  onClick={() => handlePresetSelect(preset as keyof typeof presets)}
                >
                  {preset}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
