"use client";

import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Example marketplaces with flag images
const marketplaces = [
  {
    value: "us",
    label: "United States",
    flag: "https://flagcdn.com/us.svg", // Flag for United States
  },
  {
    value: "mx",
    label: "Mexico",
    flag: "https://flagcdn.com/mx.svg", // Flag for Mexico
  },
  {
    value: "uk",
    label: "United Kingdom",
    flag: "https://flagcdn.com/gb.svg", // Flag for United Kingdom
  },
  {
    value: "ca",
    label: "Canada",
    flag: "https://flagcdn.com/ca.svg", // Flag for Canada
  },
  {
    value: "de",
    label: "Germany",
    flag: "https://flagcdn.com/de.svg", // Flag for Germany
  },
];

export function ComboboxDemo({ defaultMarketplace = "mx" }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    localStorage.getItem("defaultMarketplace") || defaultMarketplace
  );
  const [popoverOpen, setPopoverOpen] = React.useState<string | null>(null); // Store the open state for each marketplace's 3-dot menu

  // Save marketplace selection to localStorage
  React.useEffect(() => {
    if (value) {
      localStorage.setItem("defaultMarketplace", value);
    }
  }, [value]);

  const handleSetDefault = (marketplace: string) => {
    setValue(marketplace);
    setPopoverOpen(null); // Close the 3-dot menu
  };

  const handleRemoveDefault = () => {
    setValue("");
    setPopoverOpen(null); // Close the 3-dot menu
  };

  // Get the selected marketplace details
  const selectedMarketplace = marketplaces.find(
    (marketplace) => marketplace.value === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="white"
          role="combobox"
          aria-expanded={open}
          className="w-fit justify-between"
        >
          {/* Show the flag and label for the selected marketplace in the combobox */}
          {selectedMarketplace ? (
            <div className="flex items-center">
              <img
                src={selectedMarketplace.flag}
                alt={`${selectedMarketplace.label} flag`}
                className="mr-2 w-6 object-contain rounded-sm"
              />
              <span>{selectedMarketplace.label}</span>
            </div>
          ) : (
            "Select Marketplace"
          )}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="end">
        <Command>
          <CommandInput placeholder="Search marketplace..." className="h-9" />
          <CommandList>
            <CommandEmpty>No marketplace found.</CommandEmpty>
            <CommandGroup>
              {marketplaces.map((marketplace) => (
                <div className="flex items-center" key={marketplace.value}>
                  <CommandItem
                    value={marketplace.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="flex-1"
                  >
                    {/* Add the flag image at the left */}
                    <img
                      src={marketplace.flag}
                      alt={`${marketplace.label} flag`}
                      className="mr-2 w-6 object-contain rounded-sm"
                    />
                    
                    {/* Marketplace label */}
                    <span>{marketplace.label}</span>

                    {/* Show "(default)" in italics if it's the default */}
                    {value === marketplace.value && (
                      <span className="ml-2 italic text-gray-600">
                        (default)
                      </span>
                    )}
                  </CommandItem>

                  {/* 3 dots icon for more options */}
                  <Popover open={popoverOpen === marketplace.value} onOpenChange={(isOpen) => setPopoverOpen(isOpen ? marketplace.value : null)}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="marketplace3Dots"
                        className="p-2"
                        aria-label="Options"
                      >
                        <DotsHorizontalIcon className="h-4 w-4 text-[#7E828A] hover:text-black" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-0">
                      {value === marketplace.value ? (
                        <Button
                          variant="ghost"
                          className="w-full text-left"
                          onClick={handleRemoveDefault}
                        >
                          Remove from default
                        </Button>
                      ) : (
                        <Button
                          variant="white"
                          className="w-full text-left"
                          onClick={() => handleSetDefault(marketplace.value)}
                        >
                          Set as default
                        </Button>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
