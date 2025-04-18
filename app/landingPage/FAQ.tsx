import { useState } from 'react';
import { faqData } from '@/lib/faqData';
import { FAQData } from './types';
import { SearchBar } from './components/SearchBar';
import { CommandTabs } from './components/CommandTabs';
import { PremiumFeaturesComponent } from './components/PremiumFeatures';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const commandCategories = Object.keys(faqData.commands);

  return (
    <div id="faq" className="bg-zinc-950/50 mx-auto py-10 px-4 ">
        <div className="container mx-auto">

    
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Command Documentation</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse through our available commands or search for specific functionality
        </p>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <CommandTabs 
        categories={commandCategories} 
        commandsData={faqData.commands as any} 
        searchQuery={searchQuery} 
      />

      <PremiumFeaturesComponent premiumFeatures={faqData.premium_features as any} />
    </div>
    </div>
  );
};

export default FAQ;