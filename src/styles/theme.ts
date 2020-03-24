import { theme, DefaultTheme } from '@chakra-ui/core';

export const defaultTheme: DefaultTheme = {
  ...theme,
  fonts: {
    heading: 'Montserrat',
    body: 'system-ui, sans-serif',
    mono: 'Menlo, monospace'
  }
};