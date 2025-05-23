"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type ComboboxOption = {
  value: string
  label: string
  group?: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  emptyText?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  emptyText = "No results found.",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  // Group options by group property
  const groupedOptions = options.reduce((groups, option) => {
    const group = option.group || "Other"
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(option)
    return groups
  }, {} as Record<string, ComboboxOption[]>)

  const groups = Object.keys(groupedOptions)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>{emptyText}</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup key={group} heading={group}>
              {groupedOptions[group].map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </Command>
      </PopoverContent>
    </Popover>
  )
} 