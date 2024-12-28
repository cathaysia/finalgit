'use client';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { shadTheme } from './shad-Theme';

export function MuiThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme().resolvedTheme || 'light';
  const darkTheme = useMemo(() => {
    return shadTheme(theme === 'light' ? 'light' : 'dark');
  }, [theme]);
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}
