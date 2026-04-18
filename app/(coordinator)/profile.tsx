import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';

export default function CoordProfileScreen() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const logout = () => {
    setUser(null);
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-6 flex-1">
        <Typography variant="h2" className="text-white mb-2 tracking-tighter uppercase">Coordinator Profile</Typography>
        <Typography variant="body" className="mb-6 text-gray-500 uppercase text-xs tracking-widest">Verification Status: Verified</Typography>
      </View>
      <View className="p-6 mb-4">
        <Button title="Logout Session" variant="outline" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
