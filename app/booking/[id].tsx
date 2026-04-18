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
    <SafeAreaView className="flex-1 bg-white justify-center">
      <View className="items-center p-6 mb-10">
        <View className="bg-muted w-24 h-24 rounded-full items-center justify-center mb-6">
          <Typography variant="h1" className="text-success text-5xl flex items-center pt-2">✓</Typography>
        </View>
        <Typography variant="h2" className="mb-2 text-center">Slot Confirmed!</Typography>
        <Typography variant="body" className="text-center mb-8">
          You are successfully booked for Game {id}. 
          We'll send you a reminder 2 hours before the game.
        </Typography>
        <Button 
          title="Back to Schedule" 
          variant="outline" 
          onPress={() => router.replace('/(player)/my-games')} 
          className="w-full"
        />
      </View>
    </SafeAreaView>
  );
}
