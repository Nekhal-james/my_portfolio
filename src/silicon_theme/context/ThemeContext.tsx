import React from 'react';

export type ThemeMode = 'obsidian' | 'critical' | 'happy' | 'flower' | 'day' | 'dev';

export const ThemeContext = React.createContext<{ theme: ThemeMode }>({ theme: 'obsidian' });
