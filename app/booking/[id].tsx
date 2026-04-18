import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export default function BookingConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-black justify-center">
      <View className="items-center p-8 mb-10">
        <View className="bg-primary/20 w-32 h-32 rounded-full items-center justify-center mb-8 border border-primary/30 shadow-2xl shadow-primary/50">
          <Typography variant="h1" className="text-primary text-6xl">✓</Typography>
        </View>
        <Typography variant="h2" className="mb-4 text-center tracking-tighter uppercase text-3xl">Slot Secured</Typography>
        <Typography variant="body" className="text-center mb-12 text-gray-400 tracking-wide">
          Your reservation for Game {id} is confirmed. {"\n"}
          Prepare for kick-off.
        </Typography>
        <Button 
          title="VIEW MY SCHEDULE" 
          variant="primary" 
          onPress={() => router.replace('/(player)/my-games')} 
          className="w-full"
        />
        <Button 
          title="GO HOME" 
          variant="ghost" 
          onPress={() => router.replace('/(player)')} 
          className="w-full mt-4"
        />
      </View>
    </SafeAreaView>
  );
}
