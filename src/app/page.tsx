import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: 'url(/images/backgrounds/fashion-bg-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '0.5rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '0.5rem',
          }}
        ></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            AI Fashion Stylist
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
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
              href="/ai-outfit-generator"
              className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-full border border-blue-600 transition-colors"
            >
              AI Outfit Generator
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
              <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/closet/denim-jacket.jpg"
                  alt="Virtual Closet"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Virtual Closet</h3>
              <p className="text-gray-600 dark:text-gray-300">Digitize your wardrobe by uploading photos of your clothing items and organize them by category.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/outfits/business-outfit-1.jpg"
                  alt="AI Recommendations"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">AI Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">Get personalized outfit suggestions based on your style preferences, occasion, and weather.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/images/outfits/smart-casual-1.jpg"
                  alt="Style Insights"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
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
              <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/outfits/casual-outfit-1.jpg"
                  alt="Create Your Profile"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-300">Take our style quiz to help us understand your preferences and fashion goals.</p>
            </div>
            <div className="text-center">
              <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/closet/blue-shirt.jpg"
                  alt="Upload Your Clothes"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Upload Your Clothes</h3>
              <p className="text-gray-600 dark:text-gray-300">Add items from your wardrobe to your virtual closet with photos and details.</p>
            </div>
            <div className="text-center">
              <div className="relative h-40 w-40 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/outfits/business-outfit-2.jpg"
                  alt="Get Recommendations"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Get Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive personalized outfit suggestions tailored to your style, occasion, and weather.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 text-white relative"
        style={{
          backgroundImage: 'url(/images/backgrounds/fashion-bg-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(37, 99, 235, 0.8)',
          }}
        ></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your style?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of users who have elevated their fashion game with our AI Fashion Stylist.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/closet"
              className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition-colors inline-block"
            >
              Explore Your Closet
            </Link>
            <Link
              href="/ai-outfit-generator"
              className="bg-transparent text-white hover:bg-white/10 font-medium py-3 px-8 rounded-full border border-white transition-colors inline-block"
            >
              Try AI Generator
            </Link>
          </div>
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
