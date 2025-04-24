'use client';

import AiOutfitGenerator from '@/components/AiOutfitGenerator';

export default function AiOutfitGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">AI Outfit Generator</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Our AI-powered outfit generator creates personalized outfit recommendations based on your preferences, occasion, and weather conditions. Simply select your preferences below and let our AI stylist do the rest.
        </p>
      </div>
      
      <AiOutfitGenerator />
    </div>
  );
}
