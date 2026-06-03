import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Button } from '../../components/ui/Button';

export default function BookingConfirmationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A] justify-center">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="items-center p-8 mb-10">
        <View className="bg-success/15 w-24 h-24 rounded-full items-center justify-center mb-8 border border-success/30 shadow-lg shadow-success/10">
          <Text className="text-success text-5xl font-black font-body">✓</Text>
        </View>
        <Text className="text-[#FFFFFF] text-2xl font-black mb-3 text-center tracking-tighter uppercase font-heading">
          Slot Secured
        </Text>
        <Text className="text-center mb-10 text-gray-400 tracking-wide text-xs leading-5 font-body">
          Your reservation is confirmed. {"\n"}
          Host is preparing for kick-off.
        </Text>
        
        <Button 
          title="VIEW MY SCHEDULE" 
          variant="primary" 
          onPress={() => router.replace('/(player)/my-games')} 
          className="w-full"
        />
        
        <Button 
          title="GO TO HOME" 
          variant="ghost" 
          onPress={() => router.replace('/(player)')} 
          className="w-full mt-4"
        />
      </View>
    </SafeAreaView>
  );
}
