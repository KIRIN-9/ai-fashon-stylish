'use client';

import { useState } from 'react';
import { analyzeStyle, StyleAnalysis } from '@/services/geminiService';

export default function AiStyleAnalysis() {
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
    <div className="mb-12">
      {!showAiAnalysis ? (
        <div className="flex justify-center mb-8">
          <button
            onClick={getAiStyleAnalysis}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Get AI Style Analysis
          </button>
        </div>
      ) : (
        <>
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
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border-l-4 border-purple-600 dark:border-purple-500">
              <div className="p-6">
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
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-gray-800 dark:text-white">{aiAnalysis.versatility}/10</p>
                          <div className="w-full max-w-[150px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
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
                    <div className="flex flex-wrap gap-3">
                      {aiAnalysis.dominantColors.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: color.toLowerCase() }}
                          ></div>
                          <span className="text-gray-800 dark:text-white">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-300">AI Recommendations</h3>
                  <ul className="space-y-3">
                    {aiAnalysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
        </>
      )}
    </div>
  );
}
