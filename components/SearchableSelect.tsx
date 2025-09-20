"use client";

import { useState } from "react";

import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import Icon from "./ui/Icon";

type SearchableSelectProps = {
  label: string;
  placeholder?: string;
  items: string[];
  value?: string;
  loading?: boolean;
  onSearch: (value: string) => void;
  onSelect: (val: string) => void;
  error?: string;
};

export function SearchableSelect({
  label,
  placeholder = "Search...",
  items,
  value,
  loading,
  onSearch,
  onSelect,
  error,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  const trigger = (
    <button
      type="button"
      className="border-base-300 w-full cursor-pointer border p-2 shadow-xs"
      onClick={() => setOpen(true)}
    >
      <div className="flex flex-row items-center justify-between">
        {value ? (
          <p className="text-sm">{value}</p>
        ) : (
          <p className="text-sm">{placeholder}</p>
        )}
        <Icon
          icon="ph:caret-down"
          className="text-base-content/60"
          width="16"
          height="16"
        />
      </div>
    </button>
  );

  const command = (
    <Command>
      <CommandInput placeholder={placeholder} onValueChange={onSearch} />
      <CommandList>
        <CommandGroup heading={label}>
          {items?.map((item, index) => (
            <CommandItem
              key={index}
              onSelect={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              {item}
            </CommandItem>
          ))}
        </CommandGroup>
        {loading ? (
          <div className="flex h-full w-full items-center justify-center py-6">
            <div className="loading loading-spinner" />
          </div>
        ) : (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
      </CommandList>
    </Command>
  );

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      {trigger}
      <FormControl className="min-h-64">
        <CommandDialog open={open} onOpenChange={setOpen}>
          {command}
        </CommandDialog>
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
}
