import { config } from 'dotenv';
import { ExpoConfig, ConfigContext } from 'expo/config';

config({ path: '.env.local' });

export default ({ config: defaultConfig }: ConfigContext): ExpoConfig => ({
  ...defaultConfig,
  name: 'FitCenter',
  slug: 'fitcenter',
  scheme: 'fitcenter',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#111827',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#111827',
    },
    package: 'com.fitcenter.mobile',
  },
  web: {
    bundler: 'metro',
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-build-properties',
      {
        ios: {
          useFrameworks: 'static',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  },
});
