// Color palettes for different clothing types
export const colorPalettes = {
  // Basic colors
  black: '#000000',
  white: '#FFFFFF',
  gray: '#808080',
  navy: '#000080',
  blue: '#0000FF',
  lightBlue: '#ADD8E6',
  purple: '#800080',
  red: '#FF0000',
  green: '#008000',
  yellow: '#FFFF00',
  beige: '#F5F5DC',
  brown: '#8B4513',

  // Fashion palettes by style
  casual: {
    primary: '#3B82F6', // Blue
    secondary: '#F3F4F6', // Light gray
    accent: '#EF4444', // Red
    text: '#1F2937', // Dark gray
  },
  formal: {
    primary: '#1E293B', // Dark blue
    secondary: '#F8FAFC', // Off white
    accent: '#7C3AED', // Purple
    text: '#0F172A', // Very dark blue
  },
  business: {
    primary: '#334155', // Slate
    secondary: '#F1F5F9', // Light gray
    accent: '#0EA5E9', // Sky blue
    text: '#0F172A', // Very dark blue
  },
  smartCasual: {
    primary: '#059669', // Green
    secondary: '#ECFDF5', // Light green
    accent: '#8B5CF6', // Purple
    text: '#064E3B', // Dark green
  },
  athletic: {
    primary: '#F97316', // Orange
    secondary: '#FFF7ED', // Light orange
    accent: '#3B82F6', // Blue
    text: '#7C2D12', // Dark orange
  },
  party: {
    primary: '#EC4899', // Pink
    secondary: '#FCE7F3', // Light pink
    accent: '#8B5CF6', // Purple
    text: '#831843', // Dark pink
  },

  // Fashion palettes by category
  tops: {
    primary: '#3B82F6', // Blue
    secondary: '#F3F4F6', // Light gray
    accent: '#EF4444', // Red
    text: '#1F2937', // Dark gray
  },
  bottoms: {
    primary: '#1E293B', // Dark blue
    secondary: '#F8FAFC', // Off white
    accent: '#7C3AED', // Purple
    text: '#0F172A', // Very dark blue
  },
  outerwear: {
    primary: '#334155', // Slate
    secondary: '#F1F5F9', // Light gray
    accent: '#0EA5E9', // Sky blue
    text: '#0F172A', // Very dark blue
  },
  footwear: {
    primary: '#059669', // Green
    secondary: '#ECFDF5', // Light green
    accent: '#8B5CF6', // Purple
    text: '#064E3B', // Dark green
  },
  accessories: {
    primary: '#F97316', // Orange
    secondary: '#FFF7ED', // Light orange
    accent: '#3B82F6', // Blue
    text: '#7C2D12', // Dark orange
  },

  // Fashion palettes by color
  blueItems: {
    primary: '#3B82F6',
    secondary: '#DBEAFE',
    accent: '#1E40AF',
    text: '#1E3A8A',
  },
  blackItems: {
    primary: '#1F2937',
    secondary: '#F9FAFB',
    accent: '#4B5563',
    text: '#F9FAFB',
  },
  whiteItems: {
    primary: '#F9FAFB',
    secondary: '#F3F4F6',
    accent: '#E5E7EB',
    text: '#1F2937',
  },
  redItems: {
    primary: '#EF4444',
    secondary: '#FEE2E2',
    accent: '#B91C1C',
    text: '#7F1D1D',
  },
  greenItems: {
    primary: '#10B981',
    secondary: '#D1FAE5',
    accent: '#047857',
    text: '#064E3B',
  },
  yellowItems: {
    primary: '#F59E0B',
    secondary: '#FEF3C7',
    accent: '#B45309',
    text: '#78350F',
  },
  purpleItems: {
    primary: '#8B5CF6',
    secondary: '#EDE9FE',
    accent: '#6D28D9',
    text: '#4C1D95',
  },
  pinkItems: {
    primary: '#EC4899',
    secondary: '#FCE7F3',
    accent: '#BE185D',
    text: '#831843',
  },
  brownItems: {
    primary: '#92400E',
    secondary: '#FEF3C7',
    accent: '#78350F',
    text: '#FBBF24',
  },
  grayItems: {
    primary: '#6B7280',
    secondary: '#F3F4F6',
    accent: '#374151',
    text: '#F9FAFB',
  },
};

// Function to get a color palette based on clothing type
export function getColorPalette(itemName: string) {
  const itemNameLower = itemName.toLowerCase();

  // Check for style
  if (itemNameLower.includes('casual')) {
    return colorPalettes.casual;
  } else if (itemNameLower.includes('formal') || itemNameLower.includes('suit')) {
    return colorPalettes.formal;
  } else if (itemNameLower.includes('business')) {
    return colorPalettes.business;
  } else if (itemNameLower.includes('smart')) {
    return colorPalettes.smartCasual;
  } else if (itemNameLower.includes('athletic') || itemNameLower.includes('sport')) {
    return colorPalettes.athletic;
  } else if (itemNameLower.includes('party')) {
    return colorPalettes.party;
  }

  // Check for category
  if (itemNameLower.includes('shirt') || itemNameLower.includes('top') || itemNameLower.includes('tee') || itemNameLower.includes('blouse')) {
    return colorPalettes.tops;
  } else if (itemNameLower.includes('pant') || itemNameLower.includes('jean') || itemNameLower.includes('trouser') || itemNameLower.includes('skirt')) {
    return colorPalettes.bottoms;
  } else if (itemNameLower.includes('jacket') || itemNameLower.includes('coat') || itemNameLower.includes('blazer') || itemNameLower.includes('sweater') || itemNameLower.includes('cardigan')) {
    return colorPalettes.outerwear;
  } else if (itemNameLower.includes('shoe') || itemNameLower.includes('boot') || itemNameLower.includes('sneaker') || itemNameLower.includes('footwear')) {
    return colorPalettes.footwear;
  } else if (itemNameLower.includes('accessory') || itemNameLower.includes('watch') || itemNameLower.includes('jewelry') || itemNameLower.includes('hat') || itemNameLower.includes('bag')) {
    return colorPalettes.accessories;
  }

  // Check for color
  if (itemNameLower.includes('blue')) {
    return colorPalettes.blueItems;
  } else if (itemNameLower.includes('black')) {
    return colorPalettes.blackItems;
  } else if (itemNameLower.includes('white')) {
    return colorPalettes.whiteItems;
  } else if (itemNameLower.includes('red')) {
    return colorPalettes.redItems;
  } else if (itemNameLower.includes('green')) {
    return colorPalettes.greenItems;
  } else if (itemNameLower.includes('yellow') || itemNameLower.includes('gold')) {
    return colorPalettes.yellowItems;
  } else if (itemNameLower.includes('purple') || itemNameLower.includes('violet')) {
    return colorPalettes.purpleItems;
  } else if (itemNameLower.includes('pink')) {
    return colorPalettes.pinkItems;
  } else if (itemNameLower.includes('brown') || itemNameLower.includes('tan') || itemNameLower.includes('khaki')) {
    return colorPalettes.brownItems;
  } else if (itemNameLower.includes('gray') || itemNameLower.includes('grey')) {
    return colorPalettes.grayItems;
  }

  // Default to casual
  return colorPalettes.casual;
}

// Function to generate a CSS gradient background for an item
export function generateGradientBackground(itemName: string): string {
  const palette = getColorPalette(itemName);
  return `linear-gradient(135deg, ${palette.primary} 0%, ${palette.accent} 100%)`;
}

// Function to get text color based on background
export function getTextColor(itemName: string): string {
  const palette = getColorPalette(itemName);
  return palette.text;
}

// Function to get a contrasting text color (white or black) based on background color
export function getContrastTextColor(backgroundColor: string): string {
  // Convert hex to RGB
  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}
