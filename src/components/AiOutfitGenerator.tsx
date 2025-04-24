'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getOutfitRecommendations, OutfitRecommendation } from '@/services/geminiService';
import LoadingSpinner from './LoadingSpinner';

interface AiOutfitGeneratorProps {
  occasion?: string;
  weather?: string;
}

export default function AiOutfitGenerator({ occasion, weather }: AiOutfitGeneratorProps) {
  const [outfits, setOutfits] = useState<OutfitRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState(occasion || 'Casual');
  const [selectedWeather, setSelectedWeather] = useState(weather || 'Mild');
  const [stylePreference, setStylePreference] = useState('Smart Casual');

  // Mock closet items - in a real app, you would fetch these from your database
  const closetItems = [
    {
      name: 'Blue Denim Jacket',
      category: 'Outerwear',
      color: 'Blue',
      season: 'Spring/Fall',
    },
    {
      name: 'White T-Shirt',
      category: 'Tops',
      color: 'White',
      season: 'All Seasons',
    },
    {
      name: 'Black Jeans',
      category: 'Bottoms',
      color: 'Black',
      season: 'All Seasons',
    },
    {
      name: 'Brown Leather Boots',
      category: 'Footwear',
      color: 'Brown',
      season: 'Fall/Winter',
    },
    {
      name: 'Navy Blazer',
      category: 'Outerwear',
      color: 'Navy',
      season: 'All Seasons',
    },
    {
      name: 'Light Blue Shirt',
      category: 'Tops',
      color: 'Light Blue',
      season: 'Spring/Summer',
    },
    {
      name: 'Gray Dress Pants',
      category: 'Bottoms',
      color: 'Gray',
      season: 'All Seasons',
    },
    {
      name: 'Black Dress Shoes',
      category: 'Footwear',
      color: 'Black',
      season: 'All Seasons',
    },
  ];

  const occasions = ['Casual', 'Business Casual', 'Formal', 'Athletic', 'Party'];
  const weatherConditions = ['Hot', 'Mild', 'Cold', 'Rainy', 'Sunny', 'Indoor'];
  const stylePreferences = ['Classic', 'Casual', 'Trendy', 'Minimalist', 'Smart Casual', 'Business Casual'];

  const generateOutfits = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const recommendations = await getOutfitRecommendations(closetItems, {
        occasion: selectedOccasion,
        weather: selectedWeather,
        stylePreference,
      });

      setOutfits(recommendations);
    } catch (err) {
      console.error('Error generating outfits:', err);
      setError('Failed to generate outfits. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI Outfit Generator
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Occasion</label>
          <select
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {occasions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weather</label>
          <select
            value={selectedWeather}
            onChange={(e) => setSelectedWeather(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {weatherConditions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Style Preference</label>
          <select
            value={stylePreference}
            onChange={(e) => setStylePreference(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {stylePreferences.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={generateOutfits}
          disabled={isLoading}
          className={`px-6 py-3 rounded-md text-white flex items-center gap-2 ${
            isLoading
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Outfits
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 dark:bg-red-900/30 dark:border-red-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="py-16 flex justify-center">
          <LoadingSpinner
            size="large"
            color="purple"
            text="Generating AI outfit recommendations..."
          />
        </div>
      ) : outfits.length > 0 && (
        <div className="space-y-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Generated Outfits</h3>

          {outfits.map((outfit, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm border-l-4 border-purple-600 dark:border-purple-500">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{outfit.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{outfit.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                        {outfit.occasion}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
                        {outfit.weather}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                      Save Outfit
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  {outfit.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
                      <div className="relative h-40 w-full">
                        <Image
                          src={`https://placehold.co/300x400/e2e8f0/1e293b?text=${encodeURIComponent(item)}`}
                          alt={item}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Style Notes</h5>
                  <p className="text-gray-700 dark:text-gray-300">{outfit.styleNotes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
