'use client';

import { useState } from 'react';
import Image from 'next/image';

// Mock user data
const initialUserData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://placehold.co/150x150/e2e8f0/1e293b?text=AJ',
  styleProfile: {
    styleType: 'Smart Casual',
    colorPalette: 'Neutrals with occasional pops of color',
    primaryDressCode: 'Business Casual',
    bodyType: 'Athletic',
    preferences: [
      'Comfortable yet professional attire',
      'Minimalist accessories',
      'Versatile pieces that can be dressed up or down',
    ],
  },
  stats: {
    itemsInCloset: 48,
    outfitsSaved: 12,
    styleQuizCompleted: true,
    memberSince: 'March 2023',
  },
};

export default function Profile() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setEditedData({
        ...editedData,
        [section]: {
          ...editedData[section as keyof typeof editedData],
          [field]: value,
        },
      });
    } else {
      setEditedData({
        ...editedData,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">My Profile</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 bg-gray-50 dark:bg-gray-700 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
              <Image
                src={userData.avatar}
                alt={userData.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{userData.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{userData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                  {userData.styleProfile.styleType}
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-300">
                  {userData.styleProfile.primaryDressCode}
                </span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-300">
                  {userData.styleProfile.bodyType}
                </span>
              </div>
            </div>
            <div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6 sm:p-8">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                      <input
                        type="text"
                        name="avatar"
                        value={editedData.avatar}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Style Profile</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Style Type</label>
                      <input
                        type="text"
                        name="styleProfile.styleType"
                        value={editedData.styleProfile.styleType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color Palette</label>
                      <input
                        type="text"
                        name="styleProfile.colorPalette"
                        value={editedData.styleProfile.colorPalette}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Dress Code</label>
                      <input
                        type="text"
                        name="styleProfile.primaryDressCode"
                        value={editedData.styleProfile.primaryDressCode}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Body Type</label>
                      <input
                        type="text"
                        name="styleProfile.bodyType"
                        value={editedData.styleProfile.bodyType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Style Profile</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Style Type</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white">{userData.styleProfile.styleType}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Color Palette</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white">{userData.styleProfile.colorPalette}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Dress Code</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white">{userData.styleProfile.primaryDressCode}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Body Type</dt>
                        <dd className="mt-1 text-gray-900 dark:text-white">{userData.styleProfile.bodyType}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Style Preferences</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    {userData.styleProfile.preferences.map((preference, index) => (
                      <li key={index}>{preference}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Account Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userData.stats.itemsInCloset}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Items in Closet</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userData.stats.outfitsSaved}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Outfits Saved</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {userData.stats.styleQuizCompleted ? 'Yes' : 'No'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Style Quiz</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userData.stats.memberSince}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
