import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export default function CheckoutScreen() {
  const { id, amount } = useLocalSearchParams();
  const router = useRouter();
  const [method, setMethod] = useState<'upi' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate Razorpay processing via webhook delay
    setTimeout(() => {
      setIsProcessing(false);
      router.replace(`/booking/${id}`);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Stack.Screen options={{ 
        title: 'PAYMENT', 
        presentation: 'modal',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }} />
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
           <Typography variant="body" className="text-gray-500 uppercase tracking-widest text-[10px] mb-2">Checkout Securely via</Typography>
           <Typography variant="h2" className="text-primary tracking-tighter uppercase">Razorpay</Typography>
        </View>

        <View className="bg-white/5 p-8 rounded-3xl mb-8 items-center border border-white/10">
           <Typography variant="body" className="mb-2 text-gray-400 uppercase text-xs tracking-widest">Amount to Pay</Typography>
           <Typography variant="h1" className="text-5xl text-white">₹{amount || '260'}</Typography>
           <Typography variant="caption" className="mt-4 text-primary font-bold tracking-widest uppercase text-[10px]">Secure Transaction</Typography>
        </View>

        <Typography variant="h3" className="mb-6 uppercase tracking-tighter">Choose Method</Typography>
        
        <View className="flex-col gap-4">
          <TouchableOpacity 
            onPress={() => setMethod('upi')}
            activeOpacity={0.7}
            className={`flex-row items-center p-5 border-2 rounded-2xl ${method === 'upi' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5'}`}
          >
             <Typography variant="h2" className="mr-6">📱</Typography>
             <View>
                <Typography variant="h3" className="text-white uppercase tracking-tight">UPI / GPay</Typography>
                <Typography variant="caption" className="text-gray-500">Fast & Zero Fees</Typography>
             </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setMethod('card')}
            activeOpacity={0.7}
            className={`flex-row items-center p-5 border-2 rounded-2xl ${method === 'card' ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5'}`}
          >
             <Typography variant="h2" className="mr-6">💳</Typography>
             <View>
                <Typography variant="h3" className="text-white uppercase tracking-tight">Card Payment</Typography>
                <Typography variant="caption" className="text-gray-500">Visa, Mastercard, RuPay</Typography>
             </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-8 border-t border-white/10 bg-black/80">
         <Button 
           title={`PAY ₹${amount || '260'}`} 
           variant="primary" 
           loading={isProcessing}
           onPress={handlePay}
           className="w-full"
         />
         <Typography variant="caption" className="text-center mt-6 text-gray-500 tracking-widest uppercase text-[9px]">
            🔒 256-bit Secure Encryption
         </Typography>
      </View>
    </SafeAreaView>
  );
}
