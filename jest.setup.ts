import '@testing-library/jest-native/extend-expect';

// Mock react-native-get-random-values
jest.mock('react-native-get-random-values', () => ({}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock redux-persist
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((_config, reducer) => reducer),
  };
});
