module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo|expo-router|@expo/vector-icons|@react-native-community|@react-navigation|firebase|@firebase)'
  ],
};
