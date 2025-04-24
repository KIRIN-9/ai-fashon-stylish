import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
            AI Fashion Stylist
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your personal AI stylist that helps you look your best every day with personalized outfit recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/style-quiz"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors"
            >
              Take Style Quiz
            </Link>
            <Link
              href="/about"
              className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-full border border-blue-600 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-400 dark:border-blue-400"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Virtual Closet</h3>
              <p className="text-gray-600 dark:text-gray-300">Digitize your wardrobe by uploading photos of your clothing items and organize them by category.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">AI Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">Get personalized outfit suggestions based on your style preferences, occasion, and weather.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Style Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">Gain insights into your style preferences with analytics on colors, categories, and seasonal trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">Take our style quiz to help us understand your preferences and fashion goals.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Upload Your Clothes</h3>
              <p className="text-gray-600 dark:text-gray-300">Add items from your wardrobe to your virtual closet with photos and details.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive personalized outfit suggestions tailored to your style, occasion, and weather.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your style?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who have elevated their fashion game with our AI Fashion Stylist.</p>
          <Link
            href="/closet"
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-colors inline-block"
          >
            Explore Your Closet
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">AI Fashion Stylist</h3>
              <p className="text-gray-400 max-w-md">Your personal AI stylist that helps you look your best every day.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Features</h4>
                <ul className="space-y-2">
                  <li><Link href="/features/virtual-closet" className="text-gray-400 hover:text-white transition-colors">Virtual Closet</Link></li>
                  <li><Link href="/features/outfit-recommendations" className="text-gray-400 hover:text-white transition-colors">Outfit Recommendations</Link></li>
                  <li><Link href="/features/style-insights" className="text-gray-400 hover:text-white transition-colors">Style Insights</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Explore</h4>
                <ul className="space-y-2">
                  <li><Link href="/closet" className="text-gray-400 hover:text-white transition-colors">My Closet</Link></li>
                  <li><Link href="/outfits" className="text-gray-400 hover:text-white transition-colors">Outfit Recommendations</Link></li>
                  <li><Link href="/insights" className="text-gray-400 hover:text-white transition-colors">Style Insights</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Fashion Stylist. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
