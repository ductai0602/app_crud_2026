import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { User } from '../types';
import { getAllUsers, addUser, updateUser, deleteUser } from '../services/userService';
import { confirmDelete } from '../lib/confirm';
import UserForm from '../components/UserForm';
import UserCard from '../components/UserCard';

type Props = {
  currentUser: User | null;
  onLogout: () => void;
};

export default function HomeScreen({ currentUser, onLogout }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | undefined>();

  const load = async () => {
    setLoading(true);
    try {
      setUsers(await getAllUsers());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const closeForm = () => {
    setShowForm(false);
    setEditing(undefined);
  };

  const handleSubmit = async (data: Omit<User, 'key'>) => {
    if (editing?.key) await updateUser(editing.key, data);
    else await addUser(data);
    closeForm();
    load();
  };

  const handleDelete = async (u: User) => {
    if (await confirmDelete(`Xóa người dùng "${u.hoten}"?`)) {
      await deleteUser(u.key!);
      load();
    }
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={{ padding: 16, paddingTop: 40 }}>
      <Text style={s.title}>Quản lý người dùng (Admin)</Text>

      {/* Thanh thông tin người đăng nhập */}
      <View style={s.profile}>
        {currentUser?.hinhanh ? <Image source={{ uri: currentUser.hinhanh }} style={s.avatar} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={s.name}>
            {currentUser ? `Xin chào, ${currentUser.hoten}` : 'Xin chào, Quản trị viên'}
          </Text>
          {currentUser ? <Text>{currentUser.email}</Text> : null}
        </View>
        <TouchableOpacity style={[s.btn, s.gray]} onPress={onLogout}>
          <Text style={s.btnText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {showForm ? (
        <UserForm
          key={editing?.key ?? 'new'}
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      ) : (
        <TouchableOpacity style={[s.btn, s.blue, { marginBottom: 12 }]} onPress={() => setShowForm(true)}>
          <Text style={s.btnText}>+ Thêm người dùng</Text>
        </TouchableOpacity>
      )}

      <Text style={s.subtitle}>Danh sách người dùng ({users.length})</Text>
      {loading ? <ActivityIndicator size="large" /> : null}
      {!loading && users.length === 0 ? <Text>Chưa có người dùng nào.</Text> : null}

      {users.map((u) => (
        <UserCard
          key={u.key}
          user={u}
          onEdit={() => {
            setEditing(u);
            setShowForm(true);
          }}
          onDelete={() => handleDelete(u)}
        />
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: 
  { flex: 1, backgroundColor: '#f3f4f6' },
  title: 
  { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: 
  { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  profile: 
  { flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#dbeafe', padding: 12, borderRadius: 10, marginBottom: 12, gap: 10 },
  avatar: 
  { width: 50, height: 50, borderRadius: 25 },
  name: 
  { fontWeight: 'bold', fontSize: 16 },
  btn: 
  { padding: 10, borderRadius: 6, alignItems: 'center' },
  blue:
  { backgroundColor: '#2563eb' },
  gray:
  { backgroundColor: '#6b7280' },
  btnText: 
  { color: '#fff', fontWeight: '600' },
});