'use client';

import { useState, useEffect } from 'react';
import { analyzeStyle, StyleAnalysis } from '@/services/geminiService';

// Mock data for style insights
const colorData = [
  { name: 'Blue', value: 35 },
  { name: 'Black', value: 25 },
  { name: 'White', value: 20 },
  { name: 'Gray', value: 10 },
  { name: 'Brown', value: 5 },
  { name: 'Green', value: 5 },
];

const categoryData = [
  { name: 'Tops', value: 40 },
  { name: 'Bottoms', value: 25 },
  { name: 'Outerwear', value: 15 },
  { name: 'Footwear', value: 12 },
  { name: 'Accessories', value: 8 },
];

const seasonData = [
  { name: 'All Seasons', value: 30 },
  { name: 'Spring/Summer', value: 25 },
  { name: 'Fall/Winter', value: 25 },
  { name: 'Summer', value: 10 },
  { name: 'Winter', value: 10 },
];

const outfitHistory = [
  { date: '2023-04-15', outfit: 'Casual Day Out', occasion: 'Casual' },
  { date: '2023-04-12', outfit: 'Business Meeting', occasion: 'Formal' },
  { date: '2023-04-10', outfit: 'Weekend Brunch', occasion: 'Smart Casual' },
  { date: '2023-04-08', outfit: 'Dinner Date', occasion: 'Smart Casual' },
  { date: '2023-04-05', outfit: 'Workout Session', occasion: 'Athletic' },
  { date: '2023-04-02', outfit: 'Office Day', occasion: 'Business Casual' },
  { date: '2023-03-30', outfit: 'Casual Friday', occasion: 'Casual' },
  { date: '2023-03-28', outfit: 'Client Presentation', occasion: 'Formal' },
];

const styleRecommendations = [
  {
    id: 1,
    title: 'Add more color variety',
    description: 'Your wardrobe is dominated by blue and black. Consider adding items in warmer tones like red, yellow, or orange to create more diverse outfit options.',
  },
  {
    id: 2,
    title: 'Balance your seasonal items',
    description: 'You have fewer dedicated summer pieces. As summer approaches, consider adding lightweight tops and shorts to your collection.',
  },
  {
    id: 3,
    title: 'Expand your accessories',
    description: 'Accessories make up only 8% of your wardrobe. Adding more accessories like scarves, hats, and jewelry can transform your existing outfits with minimal investment.',
  },
];

// Component for rendering a simple bar chart
const BarChart = ({ data, title, colorClass }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className={`h-2.5 rounded-full ${colorClass}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function StyleInsights() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiAnalysis, setAiAnalysis] = useState<StyleAnalysis | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);

  // Get AI-powered style analysis
  const getAiStyleAnalysis = async () => {
    setIsAiLoading(true);
    setShowAiAnalysis(true);

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

      // Get analysis from Gemini AI
      const analysis = await analyzeStyle(closetItems);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error getting AI style analysis:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Style Insights</h1>

        <button
          onClick={getAiStyleAnalysis}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get AI Style Analysis
        </button>
      </div>

      {/* AI Style Analysis */}
      {showAiAnalysis && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Style Analysis
              </span>
            </h2>
            <button
              onClick={() => setShowAiAnalysis(false)}
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
              <p className="text-gray-600 dark:text-gray-300">Analyzing your style...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few moments</p>
            </div>
          ) : aiAnalysis ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border-l-4 border-purple-600 dark:border-purple-500 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Style Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">Dominant Style</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{aiAnalysis.dominantStyle}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">Versatility Score</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-800 dark:text-white mr-2">{aiAnalysis.versatility}/10</span>
                        <div className="w-full max-w-[200px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="h-2.5 rounded-full bg-purple-600"
                            style={{ width: `${(aiAnalysis.versatility / 10) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">Seasonal Balance</p>
                      <p className="text-lg text-gray-800 dark:text-white">{aiAnalysis.seasonalBalance}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Color Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Your dominant colors are:</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {aiAnalysis.dominantColors.map((color, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 font-medium dark:bg-purple-900 dark:text-purple-200"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">AI Recommendations</h3>
                <ul className="space-y-3">
                  {aiAnalysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No AI analysis available.</p>
              <button
                onClick={getAiStyleAnalysis}
                className="mt-4 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Outfit History
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recommendations'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Style Recommendations
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Wardrobe Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Total Items</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">48</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Most Common Category</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">Tops (40%)</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Most Common Color</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">Blue (35%)</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Style Profile</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Primary Style</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">Business Casual</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Secondary Style</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">Smart Casual</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Style Versatility</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">High</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Last Outfit Created</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">Casual Day Out</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">April 15, 2023</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">Last Item Added</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">Blue Denim Jacket</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">April 10, 2023</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BarChart
              data={colorData}
              title="Color Distribution"
              colorClass="bg-blue-600 dark:bg-blue-500"
            />
            <BarChart
              data={categoryData}
              title="Category Distribution"
              colorClass="bg-green-600 dark:bg-green-500"
            />
            <BarChart
              data={seasonData}
              title="Seasonal Distribution"
              colorClass="bg-purple-600 dark:bg-purple-500"
            />
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Outfit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Occasion
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {outfitHistory.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.outfit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.occasion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {styleRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{recommendation.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{recommendation.description}</p>
            </div>
          ))}

          <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">Get Personalized Recommendations</h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Complete your style profile to receive more tailored recommendations based on your preferences, body type, and style goals.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              Update Style Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
