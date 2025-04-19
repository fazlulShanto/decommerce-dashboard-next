import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommandCategory, CommandCategories } from '../types';
import { CommandAccordion } from './CommandAccordion';

interface CommandTabsProps {
  categories: string[];
  commandsData: CommandCategories;
  searchQuery: string;
}

export const CommandTabs = ({ categories, commandsData, searchQuery }: CommandTabsProps) => {
  // Filter commands based on search query
  const filterCommands = (category: string) => {
    if (!searchQuery) return commandsData[category].commands;
    
    return commandsData[category].commands.filter(command => 
      command.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      command.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue={categories[0]} className="w-full">
        <div className="border-b mb-6">
          <div className="flex overflow-x-auto no-scrollbar">
            <TabsList className="h-auto bg-transparent p-0 w-full gap-2 flex flex-wrap space-x-2">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2 rounded-t-lg data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:font-medium sm:flex-shrink-0 sm:whitespace-nowrap"
                >
                  {commandsData[category].title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <CommandAccordion 
              category={category} 
              commandCategory={commandsData[category]} 
              filteredCommands={filterCommands(category)} 
              searchQuery={searchQuery}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}; 