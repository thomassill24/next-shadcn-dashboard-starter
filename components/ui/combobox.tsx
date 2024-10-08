"use client";

import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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

// Example marketplaces with full country names as values
const marketplaces = [
  { value: "united states", label: "United States", flag: "https://flagcdn.com/us.svg" },
  { value: "mexico", label: "Mexico", flag: "https://flagcdn.com/mx.svg" },
  { value: "united kingdom", label: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
  { value: "canada", label: "Canada", flag: "https://flagcdn.com/ca.svg" },
  { value: "germany", label: "Germany", flag: "https://flagcdn.com/de.svg" },
];

export function ComboboxDemo({ defaultMarketplace = "mexico" }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    localStorage.getItem("selectedMarketplace") || defaultMarketplace
  );
  const [defaultValue, setDefaultValue] = React.useState(
    localStorage.getItem("defaultMarketplace") || ""
  );
  const [popoverOpen, setPopoverOpen] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Save default marketplace to both localStorage and cookies
  React.useEffect(() => {
    if (defaultValue) {
      localStorage.setItem("defaultMarketplace", defaultValue);
      document.cookie = `defaultMarketplace=${defaultValue}; path=/; max-age=31536000`;
    }
  }, [defaultValue]);

  // Save selected marketplace to localStorage
  React.useEffect(() => {
    if (value) {
      localStorage.setItem("selectedMarketplace", value);
    }
  }, [value]);

  const handleSetDefault = (marketplace: string) => {
    setDefaultValue(marketplace);
    setPopoverOpen(null);
  };

  const handleRemoveDefault = () => {
    setDefaultValue("");
    setPopoverOpen(null);
    localStorage.removeItem("defaultMarketplace");
    document.cookie = `defaultMarketplace=; path=/; max-age=0`;
  };

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
          <CommandInput
            placeholder="Search marketplace..."
            className="h-9"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setSearchQuery(value);
            }}
          />
          <CommandList>
            <CommandEmpty>No marketplace found.</CommandEmpty>
            <CommandGroup>
              {marketplaces
                .filter((marketplace) =>
                  marketplace.value.includes(searchQuery)
                )
                .map((marketplace) => (
                  <div className="flex items-center w-full" key={marketplace.value}>
                    <CommandItem
                      value={marketplace.value}
                      onSelect={() => {
                        setValue(marketplace.value); // Simply select the marketplace
                        setOpen(false);
                      }}
                      className="flex-1 flex items-center"
                    >
                      <img
                        src={marketplace.flag}
                        alt={`${marketplace.label} flag`}
                        className="mr-2 w-6 object-contain rounded-sm"
                      />
                      <span>{marketplace.label}</span>
                      {defaultValue === marketplace.value && (
                        <span className="ml-2 italic text-gray-600">
                          (default)
                        </span>
                      )}
                    </CommandItem>

                    <Popover
                      open={popoverOpen === marketplace.value}
                      onOpenChange={(isOpen) =>
                        setPopoverOpen(isOpen ? marketplace.value : null)
                      }
                    >
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
                        {defaultValue === marketplace.value ? (
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
