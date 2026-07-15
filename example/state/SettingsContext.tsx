import React, { createContext, useContext, useMemo } from 'react';
import {
  Environment,
  PresentationStyles,
} from '@atomicfi/transact-react-native';
import type {
  PresentationStyleIOS,
  TransactEnvironment,
} from '@atomicfi/transact-react-native';
import { usePersistedState } from './usePersistedState';

export type EnvironmentOption = 'production' | 'sandbox' | 'custom';
export type DarkModeOption = 'system' | 'dark' | 'light';
export type LanguageOption = 'system' | 'en' | 'es' | 'fr';

export interface SettingsState {
  publicToken: string;
  publicTokenLastChange: number | null;
  environment: EnvironmentOption;
  customTransactPath: string;
  customApiPath: string;
  brandColor: string;
  overlayColor: string;
  darkMode: DarkModeOption;
  language: LanguageOption;
  debug: boolean;
  presentFullscreen: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  publicToken: '',
  publicTokenLastChange: null,
  environment: 'sandbox',
  customTransactPath: '',
  customApiPath: '',
  brandColor: '#4a5cff',
  overlayColor: '#1a1a2e',
  darkMode: 'system',
  language: 'system',
  debug: false,
  presentFullscreen: false,
};

export interface DemoTheme {
  brandColor?: string;
  overlayColor?: string;
  dark?: boolean;
}

interface SettingsContextValue {
  settings: SettingsState;
  update: (patch: Partial<SettingsState>) => void;
  setPublicToken: (token: string) => void;
  transactEnvironment: TransactEnvironment;
  apiBase: string;
  theme: DemoTheme;
  language: string | undefined;
  presentationStyleIOS: PresentationStyleIOS;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

const STORAGE_KEY = 'demo_settings';

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = usePersistedState<SettingsState>(
    STORAGE_KEY,
    DEFAULT_SETTINGS
  );

  const value = useMemo<SettingsContextValue>(() => {
    const update = (patch: Partial<SettingsState>) =>
      setSettings((prev) => ({ ...prev, ...patch }));

    const setPublicToken = (token: string) =>
      update({ publicToken: token, publicTokenLastChange: Date.now() });

    const transactEnvironment: TransactEnvironment =
      settings.environment === 'production'
        ? Environment.production
        : settings.environment === 'sandbox'
          ? Environment.sandbox
          : Environment.custom(
              settings.customTransactPath.trim(),
              settings.customApiPath.trim()
            );

    const apiBase =
      settings.environment === 'production'
        ? 'https://api.atomicfi.com'
        : settings.environment === 'sandbox'
          ? 'https://sandbox-api.atomicfi.com'
          : settings.customApiPath.trim();

    const theme: DemoTheme = {
      brandColor: settings.brandColor,
      overlayColor: settings.overlayColor,
      // Leave `dark` undefined for "system" so the SDK follows the OS scheme.
      dark:
        settings.darkMode === 'system'
          ? undefined
          : settings.darkMode === 'dark',
    };

    const language =
      settings.language === 'system' ? undefined : settings.language;

    const presentationStyleIOS = settings.presentFullscreen
      ? PresentationStyles.fullScreen
      : PresentationStyles.formSheet;

    return {
      settings,
      update,
      setPublicToken,
      transactEnvironment,
      apiBase,
      theme,
      language,
      presentationStyleIOS,
    };
  }, [settings, setSettings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}
