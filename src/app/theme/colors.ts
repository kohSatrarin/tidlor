export type ColorPalette = {
  background: string;
  surface: string;
  primary: string;
  primaryText: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  error: string;
  errorLight: string;
  placeholder: string;
  inputBackground: string;
  cardBackground: string;
};

export const lightColors: ColorPalette = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  primary: '#2563EB',
  primaryText: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  textDisabled: '#9CA3AF',
  border: '#E5E7EB',
  error: '#DC2626',
  errorLight: '#FEF2F2',
  placeholder: '#9CA3AF',
  inputBackground: '#F9FAFB',
  cardBackground: '#FFFFFF',
};

export const darkColors: ColorPalette = {
  background: '#111827',
  surface: '#1F2937',
  primary: '#3B82F6',
  primaryText: '#FFFFFF',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textDisabled: '#6B7280',
  border: '#374151',
  error: '#F87171',
  errorLight: '#450A0A',
  placeholder: '#6B7280',
  inputBackground: '#1F2937',
  cardBackground: '#1F2937',
};
