import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Command, CommandCategory, PermissionsRecord } from "../types";
import { faqData } from "@/lib/faqData";
import { CommandDetails } from "./CommandDetails";

interface CommandAccordionProps {
  category: string;
  commandCategory: CommandCategory;
  filteredCommands: Command[];
  searchQuery: string;
}

export const CommandAccordion = ({
  category,
  commandCategory,
  filteredCommands,
  searchQuery,
}: CommandAccordionProps) => {
  // Render permission badges
  const renderPermissions = (permissions: string[]) => {
    return permissions.map((permission: string, index: number) => (
      <Badge
        key={index}
        variant="outline"
        className="mr-1 mb-1"
        title={(faqData.permissions as PermissionsRecord)[permission]}
      >
        {permission}
      </Badge>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-100">{commandCategory.title}</CardTitle>
        <CardDescription className=" text-gray-300">{commandCategory.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {filteredCommands.map((command, index) => (
            <AccordionItem key={index} value={`${category}-${command.name}`}>
              <AccordionTrigger className="flex items-center hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-muted px-1.5 py-0.5 rounded">
                    /{command.name}
                  </span>
                  {command.premium && (
                    <Badge
                      variant="default"
                      className="bg-zinc-950 items-center flex no-underline border border-cyan-800"
                    >
                      <span className="text-xs flex w-fit font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text  text-transparent">
                        Premium
                      </span>
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <CommandDetails
                  command={command}
                  renderPermissions={renderPermissions}
                />
              </AccordionContent>
            </AccordionItem>
          ))}

          {filteredCommands.length === 0 && (
            <p className="text-center py-4 text-muted-foreground">
              No commands found matching "{searchQuery}"
            </p>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};
