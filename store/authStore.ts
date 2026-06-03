import { create } from 'zustand';

export type UserRole = 'player' | 'coordinator';

interface KheilUser {
  uid: string;
  phoneNumber: string;
  role: UserRole;
}

interface AuthState {
  user: KheilUser | null;
  isLoading: boolean;
  setUser: (user: KheilUser | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));
