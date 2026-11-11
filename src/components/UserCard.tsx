import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types';

type Props = { user: User; onEdit: () => void; onDelete: () => void };

export default function UserCard({ user, onEdit, onDelete }: Props) {
  return (
    <View style={s.card}>
      {user.hinhanh ? (
        <Image source={{ uri: user.hinhanh }} style={s.avatar} />
      ) : (
        <View style={[s.avatar, s.empty]}><Text>?</Text></View>
      )}
      <View style={s.info}>
        <Text style={s.name}>{user.hoten}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Mật khẩu: {user.matkhau}</Text>
      </View>
      <View>
        <TouchableOpacity style={[s.btn, s.blue]} onPress={onEdit}>
          <Text style={s.btnText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, s.red]} onPress={onDelete}>
          <Text style={s.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  empty: { backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  btn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 6, marginBottom: 6, alignItems: 'center' },
  blue: { backgroundColor: '#2563eb' },
  red: { backgroundColor: '#dc2626' },
  btnText: { color: '#fff', fontWeight: '600' },
});