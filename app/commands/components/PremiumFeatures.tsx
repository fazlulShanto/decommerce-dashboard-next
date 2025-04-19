import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PremiumFeatures as PremiumFeaturesType } from '../types';

interface PremiumFeaturesProps {
  premiumFeatures: PremiumFeaturesType;
}

export const PremiumFeaturesComponent = ({ premiumFeatures }: PremiumFeaturesProps) => {
  return (
    <Card className="max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>{premiumFeatures.title}</CardTitle>
        <CardDescription>{premiumFeatures.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {premiumFeatures.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm bg-muted p-3 rounded">
          {premiumFeatures.trial_info}
        </p>
      </CardContent>
    </Card>
  );
}; 