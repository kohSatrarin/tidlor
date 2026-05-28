import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, type ColorPalette } from './colors';
import { spacing, radius, fontSizes, fontWeights, lineHeights } from './tokens';

export type AppTheme = {
  colors: ColorPalette;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
  lineHeights: typeof lineHeights;
  isDark: boolean;
};

const ThemeContext = createContext<AppTheme | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const theme: AppTheme = {
    colors: isDark ? darkColors : lightColors,
    spacing,
    radius,
    fontSizes,
    fontWeights,
    lineHeights,
    isDark,
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): AppTheme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}
