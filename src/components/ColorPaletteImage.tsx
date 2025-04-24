'use client';

import { generateGradientBackground, getContrastTextColor, colorPalettes } from '@/utils/colorPalettes';

interface ColorPaletteImageProps {
  itemName: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function ColorPaletteImage({
  itemName,
  width = 300,
  height = 400,
  className = ''
}: ColorPaletteImageProps) {
  const background = generateGradientBackground(itemName);
  const textColor = getContrastTextColor(background.includes('#')
    ? background.substring(background.indexOf('#'), background.indexOf('#') + 7)
    : colorPalettes.casual.primary);

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        width: width,
        height: height,
        background: background,
        color: textColor,
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)',
        }}
      />
      <div className="text-center p-4 z-10">
        <div className="font-bold text-xl mb-2">{itemName}</div>
        <div className="text-sm opacity-80">Fashion Style</div>
      </div>
    </div>
  );
}
