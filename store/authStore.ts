import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'player' | 'coordinator';

export interface KheilUser {
  uid: string;
  phoneNumber: string;
  role: UserRole;
}

interface AuthState {
  user: KheilUser | null;
  setUser: (user: KheilUser | null) => void;
}

// Select native browser localStorage on Web to avoid flaky AsyncStorage polyfill lockups
const getStorage = () => {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      return window.localStorage;
    }
  }
  return AsyncStorage;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'khelclan-auth-storage',
      storage: createJSONStorage(() => getStorage() as any),
    }
  )
);
