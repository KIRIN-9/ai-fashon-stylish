'use client';

import { useState } from 'react';
import { getStyleAdvice } from '@/services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface StylePreferences {
  styleType: string;
  bodyType: string;
  colorPreferences: string[];
  avoidItems: string[];
}

export default function AiStyleAdvice({ preferences }: { preferences: StylePreferences }) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAdvice = async () => {
    setIsLoading(true);

    try {
      const styleAdvice = await getStyleAdvice(preferences);
      setAdvice(styleAdvice);
    } catch (error) {
      console.error('Error getting style advice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          <span className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Style Advice
          </span>
        </h2>
      </div>

      {!advice && !isLoading && (
        <div className="text-center py-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Get personalized style advice based on your preferences and body type.
          </p>
          <button
            onClick={getAdvice}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2 mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get AI Advice
          </button>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-8">
          <LoadingSpinner
            size="large"
            color="purple"
            text="Generating personalized style advice..."
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few moments</p>
        </div>
      )}

      {advice && !isLoading && (
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">Your Personalized Style Advice</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{advice}</p>
        </div>
      )}
    </div>
  );
}
