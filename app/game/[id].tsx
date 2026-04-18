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
    setTimeout(() => {
      setIsProcessing(false);
      router.push({ pathname: `/checkout/${id}`, params: { amount: total } });
    }, 500);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Typography variant="h2" className="mb-2 tracking-tighter uppercase">Slot Details</Typography>
          <Typography variant="body" className="mb-8 text-gray-500 text-xs tracking-widest uppercase">ID: {id}</Typography>
          
          <View className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-4">
                <Typography variant="h3" className="text-gold flex-row items-center uppercase tracking-tight">
                  ✨ Content Add-On
                </Typography>
                <Typography variant="body" className="mt-2 text-gray-400 text-sm italic">
                  Receive 2-4 personalized cinematic action clips post-game to share on social.
                </Typography>
              </View>
              <Switch
                trackColor={{ false: '#333', true: '#1DAA4B' }}
                thumbColor={'#FFFFFF'}
                onValueChange={setIncludeClip}
                value={includeClip}
              />
            </View>
          </View>

          <View className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <Typography variant="h3" className="mb-4 uppercase tracking-tighter text-white/50">Rules & Info</Typography>
            <Typography variant="body" className="text-gray-400 text-sm mb-2">• No spiked shoes on turf.</Typography>
            <Typography variant="body" className="text-gray-400 text-sm mb-2">• Reach 15 mins before kick-off.</Typography>
            <Typography variant="body" className="text-gray-400 text-sm">• Bibs provided by coordinator.</Typography>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom checkout bar */}
      <View className="bg-black/80 p-6 pb-10 border-t border-white/10">
        <View className="flex-row justify-between items-center mb-6">
          <Typography variant="body" className="uppercase tracking-widest text-xs text-gray-400">Total Price</Typography>
          <Typography variant="h2" className="text-white">₹{total}</Typography>
        </View>
        <Button 
          title="PROCEED TO PAY" 
          variant="primary" 
          onPress={handleCheckout} 
          loading={isProcessing} 
        />
      </View>
    </SafeAreaView>
  );
}
