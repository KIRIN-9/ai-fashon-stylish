'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function NavbarWithAI() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-md dark:from-purple-900 dark:to-blue-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white flex items-center">
              <span className="mr-2">✨</span>
              <span className="font-serif tracking-wide">AI Fashion Stylist</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/closet" className="text-white/90 hover:text-white font-medium transition-colors relative group">
              <span>My Closet</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/outfits" className="text-white/90 hover:text-white font-medium transition-colors relative group">
              <span>Outfit Ideas</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/insights" className="text-white/90 hover:text-white font-medium transition-colors relative group">
              <span>Style Insights</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/style-quiz" className="text-white/90 hover:text-white font-medium transition-colors relative group">
              <span>Style Quiz</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/ai-outfit-generator"
              className="flex items-center gap-1 bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-purple-50 transition-colors font-medium shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Generator
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white/80 focus:outline-none"
              aria-label="toggle menu"
            >
              {!isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4">
            <div className="flex flex-col space-y-4 py-2">
              <Link
                href="/closet"
                className="text-white hover:text-white/80 font-medium transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">👕</span>
                My Closet
              </Link>
              <Link
                href="/outfits"
                className="text-white hover:text-white/80 font-medium transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">👔</span>
                Outfit Ideas
              </Link>
              <Link
                href="/insights"
                className="text-white hover:text-white/80 font-medium transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">📊</span>
                Style Insights
              </Link>
              <Link
                href="/style-quiz"
                className="text-white hover:text-white/80 font-medium transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-2">✨</span>
                Style Quiz
              </Link>
              <Link
                href="/ai-outfit-generator"
                className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-full font-medium mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Generator
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
