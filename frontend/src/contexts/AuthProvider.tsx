import { useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import api from '../services/api';
import { AuthContext, type User, type AuthContextData } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('@MedSchedule:user');
    const storagedToken = localStorage.getItem('@MedSchedule:token');

    if (storagedUser && storagedToken) {
      const parsedUser = JSON.parse(storagedUser);
      
      // O truque para matar o erro de "cascading renders":
      // Colocamos a atualização em uma microtask ou no final da fila de execução.
      // Isso faz com que o React não considere uma atualização síncrona "dentro" do efeito.
      Promise.resolve().then(() => {
        setUser(parsedUser);
      });
    }
  }, []);

  const signIn = useCallback(async (credentials: object) => {
    const response = await api.post('/login', credentials);
    const { user: userData, token } = response.data;

    setUser(userData);

    localStorage.setItem('@MedSchedule:user', JSON.stringify(userData));
    localStorage.setItem('@MedSchedule:token', token);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@MedSchedule:token');
    localStorage.removeItem('@MedSchedule:user');
    setUser(null);
  }, []);

  const value = useMemo<AuthContextData>(() => ({
    signed: !!user,
    user,
    signIn,
    signOut
  }), [user, signIn, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}