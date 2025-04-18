export type Command = {
  name: string;
  description: string;
  permissions: string[];
  premium: boolean;
  example: string;
  response?: string;
  details?: string;
};

export type CommandCategory = {
  title: string;
  description: string;
  commands: Command[];
};

export type CommandCategories = Record<string, CommandCategory>;

export type PermissionsRecord = Record<string, string>;

export type PremiumFeatures = {
  title: string;
  description: string;
  features: string[];
  trial_info: string;
};

export type FAQData = {
  commands: CommandCategories;
  permissions: PermissionsRecord;
  premium_features: PremiumFeatures;
}; 