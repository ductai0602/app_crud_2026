import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { User } from '../types';

type Props = {
  initial?: User;
  onSubmit: (data: Omit<User, 'key'>) => void;
  onCancel: () => void;
};

export default function UserForm({ initial, onSubmit, onCancel }: Props) {
  const [email, setEmail] = useState(initial?.email ?? '');
  const [matkhau, setMatkhau] = useState(initial?.matkhau ?? '');
  const [hoten, setHoten] = useState(initial?.hoten ?? '');
  const [hinhanh, setHinhanh] = useState(initial?.hinhanh ?? '');
  const [error, setError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    const value = asset.uri.startsWith('data:')
      ? asset.uri
      : `data:image/jpeg;base64,${asset.base64}`;
    setHinhanh(value);
  };

  const submit = () => {
    if (!email.trim() || !matkhau.trim() || !hoten.trim()) {
      setError('Vui lòng nhập đủ email, mật khẩu và họ tên');
      return;
    }
    if (!email.includes('@')) {
      setError('Email không hợp lệ');
      return;
    }
    setError('');
    onSubmit({ email: email.trim(), matkhau, hoten: hoten.trim(), hinhanh });
  };

  return (
    <View style={s.box}>
      <Text style={s.title}>{initial ? 'Sửa người dùng' : 'Thêm người dùng'}</Text>
      <TextInput style={s.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={s.input} placeholder="Mật khẩu" value={matkhau} onChangeText={setMatkhau} />
      <TextInput style={s.input} placeholder="Họ tên" value={hoten} onChangeText={setHoten} />

      <TouchableOpacity style={[s.btn, s.gray]} onPress={pickImage}>
        <Text style={s.btnText}>Chọn hình ảnh</Text>
      </TouchableOpacity>
      {hinhanh ? <Image source={{ uri: hinhanh }} style={s.preview} /> : null}

      {error ? <Text style={s.error}>{error}</Text> : null}

      <View style={s.row}>
        <TouchableOpacity style={[s.btn, s.blue]} onPress={submit}>
          <Text style={s.btnText}>{initial ? 'Cập nhật' : 'Thêm'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, s.gray]} onPress={onCancel}>
          <Text style={s.btnText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  box: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#ddd' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 10 },
  preview: { width: 100, height: 100, borderRadius: 50, marginVertical: 10, alignSelf: 'center' },
  row: { flexDirection: 'row', gap: 10, marginTop: 6 },
  btn: { padding: 10, borderRadius: 6, alignItems: 'center', marginBottom: 6 },
  blue: { backgroundColor: '#2563eb', flex: 1 },
  gray: { backgroundColor: '#6b7280' },
  btnText: { color: '#fff', fontWeight: '600' },
  error: { color: 'red', marginBottom: 6 },
});