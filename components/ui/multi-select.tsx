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
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TooltipProviderCustomised } from "@/components/ui/tooltip";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MultiSelectProps<TOption> {
  options: TOption[];
  selectedOptions: TOption[] | undefined;
  onApplyFilter: (value: TOption[]) => void;
  onClearFilter: () => void;
  searchInputPlaceholder?: string;
  shouldHideSearchInput?: boolean;
  renderOption: (option: TOption, isSelected: boolean) => React.ReactNode;
  getOptionValue: (option: TOption) => string;
  renderTrigger: (
    option: TOption[] | undefined,
    isPopoverOpen: boolean
  ) => React.ReactNode;
  classNames?: {
    wrapper?: string;
    selectTrigger?: string;
    popoverContent?: string;
    commandInput?: string;
    commandItem?: string;
    commandGroup?: string;
  };
}
export function MultiSelect<TOption>({
  options,
  selectedOptions,
  onApplyFilter,
  onClearFilter,
  renderOption,
  getOptionValue,
  searchInputPlaceholder = "Search",
  renderTrigger,
  shouldHideSearchInput = false,
  classNames,
}: MultiSelectProps<TOption>) {
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);
  const [localSelectedOptionList, setLocalSelectedOptionList] = useState(
    selectedOptions || ([] as TOption[])
  );

  const commandListRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const [shouldDisableApplyFilter, setShouldDisableApplyFilter] =
    useState(true);

  const sortedPlatformList = (
    allPlatformList: TOption[],
    selectedPlatforms: TOption[]
  ) => {
    if (!selectedPlatforms?.length) return allPlatformList;

    return selectedPlatforms.concat(
      allPlatformList.filter(
        (platform) =>
          !selectedPlatforms.some(
            (selected) => getOptionValue(selected) === getOptionValue(platform)
          )
      )
    );
  };

  const handleLocalPlatformSelect = (platform: TOption) => {
    if (commandListRef.current) {
      setScrollPosition(commandListRef?.current?.scrollTop);
    }
    if (shouldDisableApplyFilter) {
      setShouldDisableApplyFilter(false);
    }
    const removedPlatformList = localSelectedOptionList.filter(
      (p) => getOptionValue(p) !== getOptionValue(platform)
    );
    if (removedPlatformList.length === localSelectedOptionList.length) {
      setLocalSelectedOptionList([...localSelectedOptionList, platform]);
    } else {
      setLocalSelectedOptionList(removedPlatformList);
    }
  };

  useEffect(() => {
    if (commandListRef.current) {
      commandListRef.current.scrollTop = scrollPosition;
    }
  }, [localSelectedOptionList, scrollPosition]);

  const handleClearFilter = () => {
    if (shouldDisableApplyFilter) {
      setShouldDisableApplyFilter(false);
    }
    setLocalSelectedOptionList([]);
    if (typeof onClearFilter === "function") {
      onClearFilter();
      setIsPopOverOpen(false);
    }
  };

  const handleApplyFilter = () => {
    onApplyFilter(localSelectedOptionList);
    setIsPopOverOpen(false);
  };

  return (
    <div className={cn("w-fit", classNames?.wrapper)}>
      <Popover
        open={isPopOverOpen}
        onOpenChange={(openStatus) => {
          setIsPopOverOpen(openStatus);
          setShouldDisableApplyFilter(true);
          setLocalSelectedOptionList(selectedOptions || []);
        }}
      >
        <PopoverTrigger asChild className={cn(classNames?.selectTrigger)}>
          {renderTrigger(selectedOptions, isPopOverOpen)}
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-fit bg-white p-0", classNames?.popoverContent)}
        >
          <Command>
            <CommandInput
              shouldHide={shouldHideSearchInput || options.length <= 5}
              placeholder={searchInputPlaceholder}
              className={cn(classNames?.commandInput)}
            />
            <CommandList className="max-h-full">
              <CommandEmpty>{"No result found."}</CommandEmpty>
              <CommandGroup
                className={cn(
                  "max-h-[220px] overflow-auto",
                  classNames?.commandGroup
                )}
                ref={commandListRef}
              >
                {sortedPlatformList(
                  options,
                  localSelectedOptionList || []
                )?.map((singlePlatform, _) => {
                  const isSelected =
                    localSelectedOptionList?.findIndex(
                      (v) =>
                        getOptionValue(v) === getOptionValue(singlePlatform)
                    ) !== -1;

                  return (
                    <CommandItem
                      className={cn(
                        "flex relative text-sm items-center gap-1",
                        classNames?.commandItem
                      )}
                      key={getOptionValue(singlePlatform) + _}
                      onSelect={() => handleLocalPlatformSelect(singlePlatform)}
                    >
                      {renderOption(singlePlatform, isSelected)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            {selectedOptions?.length || localSelectedOptionList?.length ? (
              <div className="flex justify-between p-2 border-t">
                <Button
                  variant="ghost"
                  disabled={!localSelectedOptionList?.length}
                  size="sm"
                  onClick={handleClearFilter}
                >
                  Clear
                </Button>
                <PopoverClose asChild>
                  <Button
                    size="sm"
                    onClick={handleApplyFilter}
                    disabled={shouldDisableApplyFilter}
                  >
                    Apply Filter
                  </Button>
                </PopoverClose>
              </div>
            ) : null}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface MultiSelectOptionBadgeViewProps<TOption> {
  label: string;
  options: TOption[];
  getOptionLabel: (option: TOption) => string;
  onRemoveOption: (option: TOption) => void;
  minToolTipLength?: number;
}

export const MultiSelectOptionBadgeView = <TOption,>({
  label,
  options,
  getOptionLabel,
  onRemoveOption,
  minToolTipLength,
}: MultiSelectOptionBadgeViewProps<TOption>) => {
  if (!Array.isArray(options) || !options?.length) return null;
  const renderSingleOption = (singleOption: TOption) => {
    const optionLabel = getOptionLabel(singleOption);
    return (
      <div
        key={optionLabel}
        className="bg-background-hover w-fit flex py-0.5 px-1 rounded-md text-xs font-medium text-textPrimary gap-1 items-center"
      >
        {minToolTipLength ? (
          <TooltipProviderCustomised
            content={optionLabel}
            minContentLength={minToolTipLength}
            className="truncate"
          >
            {optionLabel?.length > minToolTipLength
              ? optionLabel.slice(0, minToolTipLength) + "..."
              : optionLabel}
          </TooltipProviderCustomised>
        ) : (
          optionLabel
        )}

        <button
          onClick={() => onRemoveOption(singleOption)}
          className="p-0.5 rounded-sm hover:bg-background-hover"
        >
          <X
            strokeWidth={2.5}
            className="w-3.5 h-3.5 text-textPrimary-disable hover:text-red-500"
          />
        </button>
      </div>
    );
  };

  const renderOptions = () => {
    if (options.length === 1) {
      return renderSingleOption(options[0]);
    }

    return (
      <div className="flex flex-wrap gap-1">
        {renderSingleOption(options[0])}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-6 bg-background-hover border-none py-0 text-xs px-2"
            >
              +{options.length - 1}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-white min-w-[150px]">
            <div className="flex flex-wrap flex-col gap-2">
              {options.slice(1).map(renderSingleOption)}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-textSecondary">{label}:</span>
      {renderOptions()}
    </div>
  );
};
