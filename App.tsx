import React, { useState } from 'react';
import { User } from './src/types';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  if (!loggedIn) {
    return (
      <LoginScreen
        onSuccess={(u) => {
          setCurrentUser(u);
          setLoggedIn(true);
        }}
      />
    );
  }

  return (
    <HomeScreen
      currentUser={currentUser}
      onLogout={() => {
        setCurrentUser(null);
        setLoggedIn(false);
      }}
    />
  );
}