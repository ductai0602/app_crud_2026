import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types';
import { login } from '../services/userService';

type Props = { onSuccess: (u: User | null) => void };

export default function LoginScreen({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [matkhau, setMatkhau] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');

    // Để trống cả 2 ô: vào thẳng
    if (!email.trim() && !matkhau) {
      onSuccess(null);
      return;
    }

    setLoading(true);
    try {
      const user = await login(email.trim(), matkhau);
      if (user) onSuccess(user);
      else setError('Sai email hoặc mật khẩu');
    } catch (e) {
      setError('Không kết nối được cơ sở dữ liệu');
    }
    setLoading(false);
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Đăng nhập</Text>
      <Text style={s.hint}>Đăng nhập để xem thông tin người dùng</Text>

      <TextInput
        style={s.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={s.input}
        placeholder="Mật khẩu"
        value={matkhau}
        onChangeText={setMatkhau}
        secureTextEntry
        onSubmitEditing={handleLogin}
      />

      {error ? <Text style={s.error}>{error}</Text> : null}

      <TouchableOpacity style={[s.btn, s.blue]} onPress={handleLogin} disabled={loading}>
        <Text style={s.btnText}>{loading ? 'Đang kiểm tra...' : 'Đăng nhập'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f3f4f6' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 6, textAlign: 'center' },
  hint: { textAlign: 'center', color: '#6b7280', marginBottom: 16 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10 },
  btn: { padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 4 },
  blue: { backgroundColor: '#2563eb' },
  btnText: { color: '#fff', fontWeight: '600' },
  error: { color: 'red', marginBottom: 8 },
});