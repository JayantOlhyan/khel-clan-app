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
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ title: 'Razorpay Checkout', presentation: 'modal' }} />
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
           <Typography variant="body" className="text-gray-400 uppercase tracking-widest text-xs mb-2">Merchant Name</Typography>
           <Typography variant="h2" className="text-primary tracking-tight">Kheil Clan Sports</Typography>
        </View>

        <View className="bg-muted p-6 rounded-2xl mb-8 items-center border border-gray-200">
           <Typography variant="body" className="mb-1 text-gray-600">Total Payable Amount</Typography>
           <Typography variant="h1" className="text-5xl text-black">₹{amount || '260'}</Typography>
           <Typography variant="caption" className="mt-2 text-success">Includes all taxes and fees</Typography>
        </View>

        <Typography variant="h3" className="mb-4">Select Payment Method</Typography>
        
        <View className="flex-col gap-3">
          <TouchableOpacity 
            onPress={() => setMethod('upi')}
            className={`flex-row items-center p-4 border rounded-xl ${method === 'upi' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
          >
             <Typography variant="h2" className="mr-4">📱</Typography>
             <View>
                <Typography variant="h3" className="text-black">UPI</Typography>
                <Typography variant="caption">Pay via GPay, PhonePe, Paytm</Typography>
             </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setMethod('card')}
            className={`flex-row items-center p-4 border rounded-xl ${method === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
          >
             <Typography variant="h2" className="mr-4">💳</Typography>
             <View>
                <Typography variant="h3" className="text-black">Credit / Debit Card</Typography>
                <Typography variant="caption">Visa, Mastercard, RuPay</Typography>
             </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-6 border-t border-gray-200 bg-white">
         <Typography variant="caption" className="text-center mb-4 flex-row justify-center items-center">
            🔒 Secured by Razorpay
         </Typography>
         <Button 
           title={`Pay ₹${amount || '260'}`} 
           variant="primary" 
           loading={isProcessing}
           onPress={handlePay}
           className="w-full"
         />
      </View>
    </SafeAreaView>
  );
}
