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
    <SafeAreaView className="flex-1 bg-muted">
      <View className="p-4 flex-1">
        <Typography variant="h2" className="text-black mb-2">Profile Details</Typography>
        <Typography variant="body" className="mb-6">Coordinator verification active.</Typography>
      </View>
      <View className="p-4 mb-4">
        <Button title="Logout" variant="outline" onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
