import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
// In a production app, you would store this in environment variables
const API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface OutfitRecommendation {
  name: string;
  description: string;
  items: string[];
  occasion: string;
  weather: string;
  styleNotes: string;
}

export interface StyleAnalysis {
  dominantColors: string[];
  dominantStyle: string;
  versatility: number;
  seasonalBalance: string;
  recommendations: string[];
}

/**
 * Get outfit recommendations based on user preferences and closet items
 */
export async function getOutfitRecommendations(
  closetItems: any[],
  preferences: {
    occasion?: string;
    weather?: string;
    stylePreference?: string;
  }
): Promise<OutfitRecommendation[]> {
  try {
    // Create a prompt for Gemini
    const prompt = `
      As an AI fashion stylist, create 3 outfit recommendations based on the following closet items and preferences:
      
      Closet Items:
      ${closetItems.map(item => `- ${item.name} (${item.category}, ${item.color}, ${item.season})`).join('\n')}
      
      Preferences:
      - Occasion: ${preferences.occasion || 'Any'}
      - Weather: ${preferences.weather || 'Any'}
      - Style Preference: ${preferences.stylePreference || 'Any'}
      
      For each outfit, provide:
      1. A name for the outfit
      2. A brief description
      3. The specific items from the closet to use
      4. Suitable occasion
      5. Suitable weather
      6. Style notes or tips
      
      Format the response as a JSON array of objects with the following structure:
      [
        {
          "name": "Outfit Name",
          "description": "Brief description",
          "items": ["Item 1", "Item 2", "Item 3"],
          "occasion": "Suitable occasion",
          "weather": "Suitable weather",
          "styleNotes": "Style notes or tips"
        }
      ]
    `;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    // Find JSON in the response (in case Gemini adds extra text)
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Failed to parse Gemini response');
    }
    
    const recommendations = JSON.parse(jsonMatch[0]) as OutfitRecommendation[];
    return recommendations;
  } catch (error) {
    console.error('Error getting outfit recommendations:', error);
    
    // Return mock data in case of error
    return [
      {
        name: 'Casual Day Out',
        description: 'A comfortable yet stylish outfit perfect for running errands or meeting friends for coffee.',
        items: ['Blue Denim Jacket', 'White T-Shirt', 'Black Jeans', 'White Sneakers'],
        occasion: 'Casual',
        weather: 'Mild',
        styleNotes: 'Roll up the jacket sleeves for a more relaxed look. Add a simple necklace to elevate the outfit.'
      },
      {
        name: 'Business Meeting',
        description: 'A professional outfit that conveys confidence and competence.',
        items: ['Navy Blazer', 'Light Blue Shirt', 'Gray Dress Pants', 'Black Dress Shoes'],
        occasion: 'Formal',
        weather: 'Indoor',
        styleNotes: 'Ensure the shirt is well-ironed. A simple watch would complement this outfit nicely.'
      }
    ];
  }
}

/**
 * Analyze the user's style based on their closet items
 */
export async function analyzeStyle(closetItems: any[]): Promise<StyleAnalysis> {
  try {
    // Create a prompt for Gemini
    const prompt = `
      As an AI fashion stylist, analyze the following closet items and provide a style analysis:
      
      Closet Items:
      ${closetItems.map(item => `- ${item.name} (${item.category}, ${item.color}, ${item.season})`).join('\n')}
      
      Provide:
      1. The dominant colors in the wardrobe (top 3)
      2. The dominant style (e.g., casual, formal, bohemian, etc.)
      3. Versatility score (1-10, where 10 is extremely versatile)
      4. Seasonal balance assessment
      5. 3-5 recommendations to improve the wardrobe
      
      Format the response as a JSON object with the following structure:
      {
        "dominantColors": ["Color 1", "Color 2", "Color 3"],
        "dominantStyle": "Style name",
        "versatility": 7,
        "seasonalBalance": "Description of seasonal balance",
        "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
      }
    `;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    // Find JSON in the response (in case Gemini adds extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse Gemini response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]) as StyleAnalysis;
    return analysis;
  } catch (error) {
    console.error('Error analyzing style:', error);
    
    // Return mock data in case of error
    return {
      dominantColors: ['Blue', 'Black', 'White'],
      dominantStyle: 'Business Casual',
      versatility: 7,
      seasonalBalance: 'Your wardrobe is well-balanced for spring and fall, but could use more summer and winter pieces.',
      recommendations: [
        'Add more colorful accessories to brighten up your outfits',
        'Consider adding more lightweight summer pieces',
        'Incorporate more layering pieces for winter versatility',
        'Add a few statement pieces to elevate your everyday looks',
        'Consider adding more patterns to your predominantly solid-color wardrobe'
      ]
    };
  }
}

/**
 * Get personalized style advice based on user preferences and body type
 */
export async function getStyleAdvice(
  preferences: {
    styleType?: string;
    bodyType?: string;
    colorPreferences?: string[];
    avoidItems?: string[];
  }
): Promise<string> {
  try {
    // Create a prompt for Gemini
    const prompt = `
      As an AI fashion stylist, provide personalized style advice based on the following preferences:
      
      Preferences:
      - Style Type: ${preferences.styleType || 'Not specified'}
      - Body Type: ${preferences.bodyType || 'Not specified'}
      - Color Preferences: ${preferences.colorPreferences?.join(', ') || 'Not specified'}
      - Items to Avoid: ${preferences.avoidItems?.join(', ') || 'None'}
      
      Provide detailed advice on:
      1. Clothing silhouettes that flatter the body type
      2. Color combinations that work well with the preferences
      3. Key pieces to invest in for the preferred style
      4. Styling tips specific to the preferences
      
      Format the response as a detailed paragraph of advice.
    `;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting style advice:', error);
    
    // Return mock data in case of error
    return `
      Based on your preferences for a business casual style and athletic body type, focus on well-fitted clothing that highlights your shoulders and tapers at the waist. Structured blazers, slim-fit shirts, and straight-leg pants will complement your physique nicely. Your preference for neutral colors provides a versatile foundation; try incorporating occasional pops of color through accessories or a statement piece. Invest in quality basics like a navy blazer, well-fitted white shirts, and versatile trousers that can be mixed and matched. For a more polished look, pay attention to proper fit—especially around the shoulders and waist—and consider having key pieces tailored. Layering will add dimension to your outfits while maintaining a professional appearance.
    `;
  }
}
