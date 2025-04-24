'use client';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'purple';
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'blue',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16'
  };
  
  const colorClasses = {
    blue: 'border-blue-600',
    purple: 'border-purple-600'
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`animate-spin rounded-full border-t-2 border-b-2 ${colorClasses[color]} ${sizeClasses[size]} mb-4`}
      ></div>
      {text && (
        <p className="text-gray-600 dark:text-gray-300">{text}</p>
      )}
    </div>
  );
}
