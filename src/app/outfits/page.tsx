'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getOutfitRecommendations, OutfitRecommendation } from '@/services/geminiService';

// Mock data for outfit recommendations
const initialOutfits = [
  {
    id: 1,
    name: 'Casual Day Out',
    occasion: 'Casual',
    weather: 'Mild',
    items: [
      {
        id: 1,
        name: 'Blue Denim Jacket',
        category: 'Outerwear',
        image: '/images/closet/denim-jacket.jpg',
      },
      {
        id: 2,
        name: 'White T-Shirt',
        category: 'Tops',
        image: '/images/closet/white-tshirt.jpg',
      },
      {
        id: 3,
        name: 'Black Jeans',
        category: 'Bottoms',
        image: '/images/closet/black-jeans.jpg',
      },
      {
        id: 4,
        name: 'Brown Leather Boots',
        category: 'Footwear',
        image: '/images/closet/leather-boots.jpg',
      },
    ],
  },
  {
    id: 2,
    name: 'Business Meeting',
    occasion: 'Formal',
    weather: 'Indoor',
    items: [
      {
        id: 5,
        name: 'Navy Blazer',
        category: 'Outerwear',
        image: '/images/closet/navy-blazer.jpg',
      },
      {
        id: 6,
        name: 'Light Blue Shirt',
        category: 'Tops',
        image: '/images/closet/blue-shirt.jpg',
      },
      {
        id: 7,
        name: 'Gray Dress Pants',
        category: 'Bottoms',
        image: '/images/closet/dress-pants.jpg',
      },
      {
        id: 8,
        name: 'Black Dress Shoes',
        category: 'Footwear',
        image: '/images/closet/dress-shoes.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'Weekend Brunch',
    occasion: 'Smart Casual',
    weather: 'Sunny',
    items: [
      {
        id: 9,
        name: 'Beige Cardigan',
        category: 'Outerwear',
        image: '/images/outfits/smart-casual-1.jpg',
      },
      {
        id: 10,
        name: 'Striped Shirt',
        category: 'Tops',
        image: '/images/outfits/smart-casual-2.jpg',
      },
      {
        id: 11,
        name: 'Khaki Chinos',
        category: 'Bottoms',
        image: '/images/closet/dress-pants.jpg',
      },
      {
        id: 12,
        name: 'White Sneakers',
        category: 'Footwear',
        image: '/images/accessories/shoes.jpg',
      },
    ],
  },
];

// Options for filtering
const occasions = ['All', 'Casual', 'Smart Casual', 'Formal', 'Athletic', 'Party'];
const weatherConditions = ['All', 'Hot', 'Mild', 'Cold', 'Rainy', 'Sunny', 'Indoor'];

export default function OutfitRecommendations() {
  const [outfits] = useState(initialOutfits);
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [selectedWeather, setSelectedWeather] = useState('All');
  const [currentWeather, setCurrentWeather] = useState({ temp: 72, condition: 'Sunny' });
  const [isLoading, setIsLoading] = useState(false);
  const [aiOutfits, setAiOutfits] = useState<OutfitRecommendation[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiOutfits, setShowAiOutfits] = useState(false);

  // Simulate fetching weather data
  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock weather data
      const weatherData = {
        temp: Math.floor(Math.random() * (85 - 65) + 65), // Random temperature between 65-85°F
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Mild'][Math.floor(Math.random() * 4)], // Random condition
      };

      setCurrentWeather(weatherData);
      setIsLoading(false);
    };

    fetchWeather();
  }, []);

  // Filter outfits based on selected filters
  const filteredOutfits = outfits.filter(outfit => {
    const occasionMatch = selectedOccasion === 'All' || outfit.occasion === selectedOccasion;
    const weatherMatch = selectedWeather === 'All' || outfit.weather === selectedWeather;
    return occasionMatch && weatherMatch;
  });

  // Get weather-appropriate outfits
  const getWeatherAppropriateOutfits = () => {
    let weatherType = 'Mild';

    if (currentWeather.temp > 80) {
      weatherType = 'Hot';
    } else if (currentWeather.temp < 60) {
      weatherType = 'Cold';
    }

    if (currentWeather.condition === 'Rainy') {
      weatherType = 'Rainy';
    } else if (currentWeather.condition === 'Sunny' && currentWeather.temp > 75) {
      weatherType = 'Sunny';
    }

    setSelectedWeather(weatherType);
  };

  // Get AI-powered outfit recommendations
  const getAiRecommendations = async () => {
    setIsAiLoading(true);
    setShowAiOutfits(true);

    try {
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

      // Get recommendations from Gemini AI
      const recommendations = await getOutfitRecommendations(closetItems, {
        occasion: selectedOccasion !== 'All' ? selectedOccasion : undefined,
        weather: selectedWeather !== 'All' ? selectedWeather : undefined,
        stylePreference: 'Smart Casual', // This could come from user preferences
      });

      setAiOutfits(recommendations);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Outfit Recommendations</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* AI Recommendations Button */}
          <button
            onClick={getAiRecommendations}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get AI Recommendations
          </button>

          {/* Current Weather Display */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm flex items-center">
            {isLoading ? (
              <p className="text-gray-600 dark:text-gray-300">Loading weather...</p>
            ) : (
              <>
                <div className="mr-3">
                  {currentWeather.condition === 'Sunny' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                  {currentWeather.condition === 'Cloudy' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  )}
                  {currentWeather.condition === 'Rainy' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  {currentWeather.condition === 'Mild' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-gray-800 dark:text-white font-medium">{currentWeather.condition}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{currentWeather.temp}°F</p>
                </div>
                <button
                  onClick={getWeatherAppropriateOutfits}
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Dress for Weather
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Occasion</label>
            <select
              value={selectedOccasion}
              onChange={(e) => setSelectedOccasion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {occasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
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
              {weatherConditions.map((weather) => (
                <option key={weather} value={weather}>
                  {weather}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AI-Generated Outfit Recommendations */}
      {showAiOutfits && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI-Generated Recommendations
              </span>
            </h2>
            <button
              onClick={() => setShowAiOutfits(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isAiLoading ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Generating AI recommendations...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few moments</p>
            </div>
          ) : aiOutfits.length > 0 ? (
            <div className="space-y-8">
              {aiOutfits.map((outfit, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border-l-4 border-purple-600 dark:border-purple-500">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{outfit.name}</h3>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {outfit.items.map((item, itemIndex) => {
                        // Find a matching image from our mock data or use a placeholder
                        const matchingItem = initialOutfits.flatMap(o => o.items).find(i =>
                          i.name.toLowerCase().includes(item.toLowerCase()) ||
                          item.toLowerCase().includes(i.name.toLowerCase())
                        );

                        const imageUrl = matchingItem?.image ||
                          `https://placehold.co/300x400/e2e8f0/1e293b?text=${encodeURIComponent(item)}`;

                        return (
                          <div key={itemIndex} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                            <div className="relative h-48 w-full">
                              <Image
                                src={imageUrl}
                                alt={item}
                                fill
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="text-md font-medium text-gray-800 dark:text-white">{item}</h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Style Notes</h4>
                      <p className="text-gray-700 dark:text-gray-300">{outfit.styleNotes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No AI recommendations available.</p>
              <button
                onClick={getAiRecommendations}
                className="mt-4 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Regular Outfit Recommendations */}
      <div className="space-y-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Saved Outfits</h2>

        {filteredOutfits.length > 0 ? (
          filteredOutfits.map((outfit) => (
            <div key={outfit.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{outfit.name}</h3>
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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                      Save Outfit
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {outfit.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-md font-medium text-gray-800 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No outfits found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedOccasion('All');
                setSelectedWeather('All');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
