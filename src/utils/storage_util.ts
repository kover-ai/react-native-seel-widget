import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageValue = {
  True: '1',
  False: '0',
} as const;

export const AsyncStorageKey = {
  OptedIn: 'SeelWFPWidget.OptedIn',
};

function logSetError(key: string, error: unknown) {
  console.error('Failed to set [', key, '] error:', error);
}

function logGetError(key: string, error: unknown) {
  console.error('Failed to get [', key, '] error:', error);
}

export const writeOptedIn = async (value: boolean): Promise<void> => {
  const key = AsyncStorageKey.OptedIn;
  try {
    await AsyncStorage.setItem(
      key,
      value ? StorageValue.True : StorageValue.False
    );
  } catch (error) {
    logSetError(key, error);
    throw error;
  }
};

export const readOptedIn = async (): Promise<boolean> => {
  const key = AsyncStorageKey.OptedIn;
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null && value !== '' && value !== StorageValue.False;
  } catch (error) {
    logGetError(key, error);
    return false;
  }
};
