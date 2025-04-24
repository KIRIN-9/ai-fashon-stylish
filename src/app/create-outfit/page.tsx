'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for clothing items
const initialClothingItems = [
  {
    id: 1,
    name: 'Blue Denim Jacket',
    category: 'Outerwear',
    color: 'Blue',
    season: 'Spring/Fall',
    image: 'https://placehold.co/300x400/3b82f6/ffffff?text=Blue+Denim+Jacket',
  },
  {
    id: 2,
    name: 'White T-Shirt',
    category: 'Tops',
    color: 'White',
    season: 'All Seasons',
    image: 'https://placehold.co/300x400/ffffff/000000?text=White+T-Shirt',
  },
  {
    id: 3,
    name: 'Black Jeans',
    category: 'Bottoms',
    color: 'Black',
    season: 'All Seasons',
    image: 'https://placehold.co/300x400/000000/ffffff?text=Black+Jeans',
  },
  {
    id: 4,
    name: 'Brown Leather Boots',
    category: 'Footwear',
    color: 'Brown',
    season: 'Fall/Winter',
    image: 'https://placehold.co/300x400/8b4513/ffffff?text=Brown+Leather+Boots',
  },
  {
    id: 5,
    name: 'Navy Blazer',
    category: 'Outerwear',
    color: 'Navy',
    season: 'All Seasons',
    image: 'https://placehold.co/300x400/000080/ffffff?text=Navy+Blazer',
  },
  {
    id: 6,
    name: 'Light Blue Shirt',
    category: 'Tops',
    color: 'Light Blue',
    season: 'Spring/Summer',
    image: 'https://placehold.co/300x400/add8e6/000000?text=Light+Blue+Shirt',
  },
  {
    id: 7,
    name: 'Gray Dress Pants',
    category: 'Bottoms',
    color: 'Gray',
    season: 'All Seasons',
    image: 'https://placehold.co/300x400/808080/ffffff?text=Gray+Dress+Pants',
  },
  {
    id: 8,
    name: 'Black Dress Shoes',
    category: 'Footwear',
    color: 'Black',
    season: 'All Seasons',
    image: 'https://placehold.co/300x400/000000/ffffff?text=Black+Dress+Shoes',
  },
];

// Categories for filtering
const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'];
const occasions = ['Casual', 'Business Casual', 'Formal', 'Athletic', 'Party'];
const weatherConditions = ['Hot', 'Mild', 'Cold', 'Rainy', 'Sunny', 'Indoor'];

export default function CreateOutfit() {
  const [clothingItems] = useState(initialClothingItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [outfitName, setOutfitName] = useState('');
  const [occasion, setOccasion] = useState('Casual');
  const [weather, setWeather] = useState('Mild');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter clothing items based on selected category
  const filteredItems = clothingItems.filter(item => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  // Get selected items details
  const selectedItemsDetails = clothingItems.filter(item => selectedItems.includes(item.id));

  // Toggle item selection
  const toggleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Check if outfit is valid (at least one top and one bottom)
  const isOutfitValid = () => {
    const hasTop = selectedItemsDetails.some(item => item.category === 'Tops');
    const hasBottom = selectedItemsDetails.some(item => item.category === 'Bottoms');
    return hasTop && hasBottom && outfitName.trim() !== '';
  };

  // Handle save outfit
  const handleSaveOutfit = () => {
    if (!isOutfitValid()) return;

    setIsSaving(true);

    // Simulate API call to save outfit
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Reset form after successful save
      setTimeout(() => {
        setShowSaveModal(false);
        setSaveSuccess(false);
        setOutfitName('');
        setOccasion('Casual');
        setWeather('Mild');
        setSelectedItems([]);
      }, 1500);
    }, 1500);
  };

  // Get AI recommendations
  const getAIRecommendations = () => {
    // In a real app, this would call an AI service
    // For demo, we'll just select some items
    const recommendedOutfit = [
      // Select a random top
      clothingItems.find(item => item.category === 'Tops')?.id,
      // Select a random bottom
      clothingItems.find(item => item.category === 'Bottoms')?.id,
      // Select a random outerwear
      clothingItems.find(item => item.category === 'Outerwear')?.id,
      // Select a random footwear
      clothingItems.find(item => item.category === 'Footwear')?.id,
    ].filter(Boolean) as number[];

    setSelectedItems(recommendedOutfit);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Create Outfit</h1>
        <div className="flex gap-3">
          <button
            onClick={getAIRecommendations}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Recommend
          </button>
          <button
            onClick={() => setShowSaveModal(true)}
            disabled={!isOutfitValid()}
            className={`px-4 py-2 rounded-md text-white flex items-center gap-2 ${
              isOutfitValid()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-400 cursor-not-allowed'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Outfit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Selected Items Preview */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Selected Items</h2>

          {selectedItems.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Select items from your closet to create an outfit</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedItemsDetails.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                  </div>
                  <button
                    onClick={() => toggleItemSelection(item.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Outfit Summary</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Items:</span> {selectedItems.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Categories:</span> {Array.from(new Set(selectedItemsDetails.map(item => item.category))).join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Colors:</span> {Array.from(new Set(selectedItemsDetails.map(item => item.color))).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Clothing Items Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Select Items from Your Closet</h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItemSelection(item.id)}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedItems.includes(item.id)
                      ? 'border-blue-600 ring-2 ring-blue-600 dark:border-blue-400 dark:ring-blue-400'
                      : 'border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    {selectedItems.includes(item.id) && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        {item.category}
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                        {item.color}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No items found in this category.</p>
                <Link href="/closet" className="mt-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-block">
                  Add items to your closet
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Outfit Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            {!saveSuccess ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Save Outfit</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Outfit Name</label>
                    <input
                      type="text"
                      value={outfitName}
                      onChange={(e) => setOutfitName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="e.g., Casual Friday"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weather</label>
                    <select
                      value={weather}
                      onChange={(e) => setWeather(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      {weatherConditions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setShowSaveModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveOutfit}
                      disabled={!outfitName.trim() || isSaving}
                      className={`px-4 py-2 rounded-md text-white ${
                        !outfitName.trim() || isSaving
                          ? 'bg-blue-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        'Save Outfit'
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Outfit Saved!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Your outfit has been saved successfully.</p>
                <Link
                  href="/outfits"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors inline-block"
                >
                  View All Outfits
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
