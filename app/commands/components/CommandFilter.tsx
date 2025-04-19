"use client"

import { useState, useMemo } from 'react';
import { Combobox, ComboboxOption } from '@/components/ui/combobox';
import { CommandCategory, CommandCategories, Command, ExtendedCommand } from  "../../landingPage/types";
import { CommandAccordion } from './CommandAccordion';
import { Card } from '@/components/ui/card';

interface CommandFilterProps {
  categories: string[];
  commandsData: CommandCategories;
  searchQuery: string;
}

export const CommandFilter = ({ categories, commandsData, searchQuery }: CommandFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Create combobox options including "all" option
  const comboboxOptions: ComboboxOption[] = useMemo(() => {
    const options: ComboboxOption[] = [
      { 
        value: "all", 
        label: "All Commands",
        group: "Categories"
      }
    ];
    
    categories.forEach(category => {
      options.push({
        value: category,
        label: commandsData[category].title,
        group: "Categories"
      });
    });
    
    return options;
  }, [categories, commandsData]);

  // Filter commands based on search query and selected category
  const filteredCommands = useMemo(() => {
    if (selectedCategory === "all") {
      // If "all" is selected, combine all commands
      return categories.flatMap(category => {
        // Filter by search query if present
        const commands = commandsData[category].commands.filter(command => 
          !searchQuery || 
          command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          command.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Add the category to each command for display
        return commands.map(command => ({
          ...command,
          categoryKey: category,
          categoryTitle: commandsData[category].title
        })) as ExtendedCommand[];
      });
    } else {
      // Filter by the selected category
      return commandsData[selectedCategory].commands
        .filter(command => 
          !searchQuery || 
          command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          command.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(command => ({
          ...command,
          categoryKey: selectedCategory,
          categoryTitle: commandsData[selectedCategory].title
        })) as ExtendedCommand[];
    }
  }, [categories, commandsData, selectedCategory, searchQuery]);
  
  // Group filtered commands by category
  const groupedCommands = useMemo(() => {
    return filteredCommands.reduce((groups, command) => {
      const category = command.categoryKey;
      if (!groups[category]) {
        groups[category] = {
          title: command.categoryTitle,
          description: commandsData[category].description,
          commands: []
        };
      }
      
      // Add command without the added category fields
      const { categoryKey, categoryTitle, ...commandWithoutCategory } = command;
      groups[category].commands.push(commandWithoutCategory as Command);
      
      return groups;
    }, {} as Record<string, CommandCategory>);
  }, [filteredCommands, commandsData]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 hidden">
        <Combobox
          options={comboboxOptions}
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          placeholder="Select category..."
          emptyText="No categories found."
        />
      </div>
      
      {Object.keys(groupedCommands).length > 0 ? (
        Object.entries(groupedCommands).map(([categoryKey, category]) => (
          <div key={categoryKey} className="mb-6">
            <CommandAccordion 
              category={categoryKey}
              commandCategory={category}
              filteredCommands={category.commands} 
              searchQuery={searchQuery}
            />
          </div>
        ))
      ) : (
        <Card className="p-6">
          <p className="text-center py-4 text-muted-foreground">
            No commands found matching "{searchQuery}"
          </p>
        </Card>
      )}
    </div>
  );
}; 