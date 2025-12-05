import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import { palette } from '@styles/theme';

export default function RootLayout() {
  return (
    <ThemeProvider theme={{ palette }}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
