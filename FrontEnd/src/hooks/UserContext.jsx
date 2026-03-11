import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const storedUser = localStorage.getItem('devburguer:userData');

    if (!storedUser) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/session-verify');
      setUserInfo(data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('devburguer:userData');
        setUserInfo(null);
      }
    } finally {
      setLoading(false);
    }
  }

  function putUserData(user) {
    setUserInfo(user);
    localStorage.setItem('devburguer:userData', JSON.stringify(user));
  }

  function logout() {
    setUserInfo(null);
    localStorage.removeItem('devburguer:userData');
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, loading, putUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
