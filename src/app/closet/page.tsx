'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock data for clothing items
const initialClothingItems = [
  {
    id: 1,
    name: 'Blue Denim Jacket',
    category: 'Outerwear',
    color: 'Blue',
    season: 'Spring/Fall',
    image: '/images/closet/denim-jacket.jpg',
  },
  {
    id: 2,
    name: 'White T-Shirt',
    category: 'Tops',
    color: 'White',
    season: 'All Seasons',
    image: '/images/closet/white-tshirt.jpg',
  },
  {
    id: 3,
    name: 'Black Jeans',
    category: 'Bottoms',
    color: 'Black',
    season: 'All Seasons',
    image: '/images/closet/black-jeans.jpg',
  },
  {
    id: 4,
    name: 'Brown Leather Boots',
    category: 'Footwear',
    color: 'Brown',
    season: 'Fall/Winter',
    image: '/images/closet/leather-boots.jpg',
  },
];

// Categories for filtering
const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'];
const seasons = ['All', 'Spring', 'Summer', 'Fall', 'Winter', 'All Seasons'];
const colors = ['All', 'Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Brown', 'Gray'];

export default function Closet() {
  const [clothingItems, setClothingItems] = useState(initialClothingItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Tops',
    color: 'Black',
    season: 'All Seasons',
    image: '',
  });

  // Filter clothing items based on selected filters
  const filteredItems = clothingItems.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const seasonMatch = selectedSeason === 'All' || item.season.includes(selectedSeason);
    const colorMatch = selectedColor === 'All' || item.color === selectedColor;
    return categoryMatch && seasonMatch && colorMatch;
  });

  // Handle adding a new item
  const handleAddItem = () => {
    const newId = clothingItems.length > 0 ? Math.max(...clothingItems.map(item => item.id)) + 1 : 1;
    const itemToAdd = {
      ...newItem,
      id: newId,
      image: newItem.image || `https://placehold.co/300x400/cccccc/000000?text=${encodeURIComponent(newItem.name)}`,
    };

    setClothingItems([...clothingItems, itemToAdd]);
    setNewItem({
      name: '',
      category: 'Tops',
      color: 'Black',
      season: 'All Seasons',
      image: '',
    });
    setShowAddItemModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">My Virtual Closet</h1>
        <button
          onClick={() => setShowAddItemModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Add New Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {seasons.map((season) => (
                <option key={season} value={season}>
                  {season}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clothing Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-64 w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{item.name}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                    {item.category}
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
                    {item.color}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-300">
                    {item.season}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No items found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSeason('All');
                setSelectedColor('All');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Add New Item</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., Blue Denim Jacket"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                <select
                  value={newItem.color}
                  onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {colors.slice(1).map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Season</label>
                <select
                  value={newItem.season}
                  onChange={(e) => setNewItem({ ...newItem, season: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {seasons.slice(1).map((season) => (
                    <option key={season} value={season}>
                      {season}
                    </option>
                  ))}
                  <option value="All Seasons">All Seasons</option>
                  <option value="Spring/Fall">Spring/Fall</option>
                  <option value="Fall/Winter">Fall/Winter</option>
                  <option value="Spring/Summer">Spring/Summer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL (optional)</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddItemModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  disabled={!newItem.name}
                  className={`px-4 py-2 rounded-md text-white ${
                    newItem.name
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-blue-400 cursor-not-allowed'
                  }`}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
