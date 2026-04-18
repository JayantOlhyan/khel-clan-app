import React, { useState } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [includeClip, setIncludeClip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const basePrice = 230;
  const clipPrice = 30;
  const total = basePrice + (includeClip ? clipPrice : 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate Razorpay processing flow
    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/booking/${id}`);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-muted">
      <ScrollView className="flex-1">
        <View className="bg-white p-4 pb-6 shadow-sm mb-4">
          <Typography variant="h2" className="mb-2">Game Details Overview</Typography>
          <Typography variant="body" className="mb-4">You are viewing details for Game ID: {id}</Typography>
          
          <View className="flex-row items-center justify-between bg-muted p-4 rounded-xl mb-4">
            <View>
              <Typography variant="h3" className="text-gold flex-row items-center">
                ✨ Content Add-On
              </Typography>
              <Typography variant="caption" className="mt-1 max-w-[200px]">
                Receive 2-4 personalized action clips post-game.
              </Typography>
            </View>
            <Switch
              trackColor={{ false: '#888888', true: '#1D6A36' }}
              thumbColor={'#FFFFFF'}
              onValueChange={setIncludeClip}
              value={includeClip}
            />
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom checkout bar */}
      <View className="bg-white p-4 pb-8 border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Typography variant="body">Total Payment</Typography>
          <Typography variant="h2">₹{total}</Typography>
        </View>
        <Button 
          title="Proceed to Pay" 
          variant="gold" 
          onPress={handleCheckout} 
          loading={isProcessing} 
        />
      </View>
    </SafeAreaView>
  );
}
