import { Alert, Platform } from 'react-native';

export function confirmDelete(message: string): Promise<boolean> {
  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(message));
  }
  return new Promise((resolve) => {
    Alert.alert('Xác nhận', message, [
      { text: 'Hủy', style: 'cancel', onPress: () => resolve(false) },
      { text: 'Xóa', style: 'destructive', onPress: () => resolve(true) },
    ]);
  });
}