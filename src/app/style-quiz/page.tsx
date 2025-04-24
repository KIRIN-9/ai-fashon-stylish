'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Quiz questions
const quizQuestions = [
  {
    id: 1,
    question: 'How would you describe your personal style?',
    options: [
      { id: 'a', text: 'Classic and timeless', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Classic' },
      { id: 'b', text: 'Casual and comfortable', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Casual' },
      { id: 'c', text: 'Trendy and fashion-forward', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Trendy' },
      { id: 'd', text: 'Minimalist and sleek', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Minimalist' },
      { id: 'e', text: 'Eclectic and unique', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Eclectic' },
    ],
  },
  {
    id: 2,
    question: 'What colors do you prefer to wear?',
    options: [
      { id: 'a', text: 'Neutrals (black, white, gray, beige)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Neutrals' },
      { id: 'b', text: 'Earth tones (brown, olive, rust)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Earth+Tones' },
      { id: 'c', text: 'Bold and bright colors', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Bold+Colors' },
      { id: 'd', text: 'Pastels and soft colors', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Pastels' },
      { id: 'e', text: 'Jewel tones (emerald, sapphire, ruby)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Jewel+Tones' },
    ],
  },
  {
    id: 3,
    question: 'What is your most common dress code?',
    options: [
      { id: 'a', text: 'Business formal', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Business+Formal' },
      { id: 'b', text: 'Business casual', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Business+Casual' },
      { id: 'c', text: 'Smart casual', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Smart+Casual' },
      { id: 'd', text: 'Casual', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Casual' },
      { id: 'e', text: 'Athletic/Activewear', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Athletic' },
    ],
  },
  {
    id: 4,
    question: 'What is your budget for clothing items?',
    options: [
      { id: 'a', text: 'Budget-conscious (under $50 per item)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Budget' },
      { id: 'b', text: 'Mid-range ($50-$100 per item)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Mid-range' },
      { id: 'c', text: 'Premium ($100-$200 per item)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Premium' },
      { id: 'd', text: 'Luxury ($200+ per item)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Luxury' },
      { id: 'e', text: 'Mixed (varies by item type)', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Mixed' },
    ],
  },
  {
    id: 5,
    question: 'What are your fashion goals?',
    options: [
      { id: 'a', text: 'Build a versatile capsule wardrobe', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Capsule+Wardrobe' },
      { id: 'b', text: 'Stay current with trends', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Trendy' },
      { id: 'c', text: 'Develop a signature style', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Signature+Style' },
      { id: 'd', text: 'Dress better for my body type', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Body+Type' },
      { id: 'e', text: 'Simplify my daily outfit choices', image: 'https://placehold.co/300x200/e2e8f0/1e293b?text=Simplify' },
    ],
  },
];

export default function StyleQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      // Simulate API call to process results
      setTimeout(() => {
        setLoading(false);
        setShowResults(true);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    router.push('/profile');
  };

  // Calculate progress percentage
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {!showResults ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Style Profile Quiz</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Answer these questions to help us understand your style preferences and create personalized outfit recommendations.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Question */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              {currentQuestion + 1}. {quizQuestions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.id)}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                    answers[quizQuestions[currentQuestion].id] === option.id
                      ? 'border-blue-600 ring-2 ring-blue-600 dark:border-blue-400 dark:ring-blue-400'
                      : 'border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={option.image}
                      alt={option.text}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-gray-800 dark:text-white">{option.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-md ${
                currentQuestion === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[quizQuestions[currentQuestion].id]}
              className={`px-6 py-2 rounded-md ${
                !answers[quizQuestions[currentQuestion].id]
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Analyzing your style preferences...</p>
            </div>
          ) : (
            <>
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your Style Profile is Complete!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Based on your answers, we&apos;ve created a personalized style profile for you. You&apos;ll now receive outfit recommendations tailored to your preferences.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Style Summary</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Style Type:</strong> {answers[1] === 'a' ? 'Classic' : answers[1] === 'b' ? 'Casual' : answers[1] === 'c' ? 'Trendy' : answers[1] === 'd' ? 'Minimalist' : 'Eclectic'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Color Palette:</strong> {answers[2] === 'a' ? 'Neutrals' : answers[2] === 'b' ? 'Earth Tones' : answers[2] === 'c' ? 'Bold Colors' : answers[2] === 'd' ? 'Pastels' : 'Jewel Tones'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Primary Dress Code:</strong> {answers[3] === 'a' ? 'Business Formal' : answers[3] === 'b' ? 'Business Casual' : answers[3] === 'c' ? 'Smart Casual' : answers[3] === 'd' ? 'Casual' : 'Athletic'}
                    </span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleFinish}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
              >
                View Your Profile
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
