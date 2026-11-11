import { ref, push, get, update, remove } from 'firebase/database';
import { db } from '../lib/firebase';
import { User } from '../types';

const PATH = 'users';

//show user
export async function getAllUsers(): Promise<User[]> {
  const snap = await get(ref(db, PATH));
  const list: User[] = [];
  snap.forEach((child) => {
    list.push({ key: child.key!, ...child.val() });
  });
  return list;
}

//Add
export async function addUser(data: Omit<User, 'key'>) {
  await push(ref(db, PATH), data);
}

//Fix
export async function updateUser(key: string, data: Omit<User, 'key'>) {
  await update(ref(db, `${PATH}/${key}`), data);
}

//Delete
export async function deleteUser(key: string) {
  await remove(ref(db, `${PATH}/${key}`));
}

//Login
export async function login(email: string, matkhau: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find((u) => u.email === email && u.matkhau === matkhau) ?? null;
}