'use client';
import dynamic from 'next/dynamic';

const ThemeProvider = dynamic(
  () =>
    import('@/advance-chat/components/ThemeProvider').then(
      (mod) => mod.ThemeProvider
    ),
  { ssr: false }
);
export const ConfigThemeProvider = ThemeProvider;
