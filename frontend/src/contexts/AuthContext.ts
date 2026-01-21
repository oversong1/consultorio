import { createContext } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextData {
  user: User | null;
  signed: boolean;
  signIn(credentials: object): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);