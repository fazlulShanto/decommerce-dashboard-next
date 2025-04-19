'use client'
import { useState } from 'react';
import { faqData } from '@/lib/faqData';
import { SearchBar } from './components/SearchBar';
import { CommandFilter } from './components/CommandFilter';
import { PremiumFeaturesComponent } from './components/PremiumFeatures';

const CommandsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const commandCategories = Object.keys(faqData.commands);

  return (
    <div id="commands" className="bg-zinc-800/50 mx-auto py-10 px-4 ">
        <div className="container mx-auto">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">
           <span className="text-primary">DeCommerce</span>{" "}
           Command Documentation
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse through our available commands or search for specific functionality
        </p>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <CommandFilter 
        categories={commandCategories} 
        commandsData={faqData.commands as any} 
        searchQuery={searchQuery} 
      />

      <PremiumFeaturesComponent premiumFeatures={faqData.premium_features as any} />
    </div>
    </div>
  );
};

export default CommandsList;