'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AiStyleAdvice from '@/components/AiStyleAdvice';

export default function StyleQuizResults() {
  // const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Mock style profile data - in a real app, this would come from a database or state management
  const styleProfile = {
    styleType: 'Smart Casual',
    bodyType: 'Athletic',
    colorPreferences: ['Navy', 'Gray', 'White', 'Burgundy'],
    avoidItems: ['Skinny jeans', 'Oversized hoodies']
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your Style Profile Results</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Based on your quiz answers, we&apos;ve created a personalized style profile for you.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your style profile...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Style Profile Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-20 h-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Your Style Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Style Preferences</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white">Style Type:</span>
                      <p className="text-gray-600 dark:text-gray-300">{styleProfile.styleType}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white">Body Type:</span>
                      <p className="text-gray-600 dark:text-gray-300">{styleProfile.bodyType}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Color & Item Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Preferred Colors:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {styleProfile.colorPreferences.map((color, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm dark:bg-blue-900 dark:text-blue-200">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800 dark:text-white">Items to Avoid:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {styleProfile.avoidItems.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm dark:bg-red-900 dark:text-red-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Style Advice */}
          <AiStyleAdvice preferences={styleProfile} />

          {/* Next Steps */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">What&apos;s Next?</h3>
            <p className="text-blue-700 dark:text-blue-300 mb-6 max-w-2xl mx-auto">
              Now that we understand your style preferences, you can start building your virtual closet and get personalized outfit recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/closet"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                Build Your Closet
              </Link>
              <Link
                href="/outfits"
                className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-6 py-3 rounded-md transition-colors dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                View Outfit Recommendations
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
