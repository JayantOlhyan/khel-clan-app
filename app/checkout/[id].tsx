import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Button } from '../../components/ui/Button';

export default function CheckoutScreen() {
  const { id, amount } = useLocalSearchParams();
  const router = useRouter();
  const [method, setMethod] = useState<'upi' | 'card' | 'turf'>('upi');
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
    <SafeAreaView className="flex-1 bg-[#0A0A0A]">
      <Stack.Screen options={{ 
        title: 'PAYMENT', 
        presentation: 'modal',
        headerStyle: { backgroundColor: '#000000' },
        headerTintColor: '#FFFFFF',
      }} />
      <View className="flex-1 p-6">
        <View className="items-center mb-8">
           <Text className="text-gray-500 uppercase tracking-widest text-[10px] mb-2 font-body font-bold">Checkout Securely via</Text>
           <Text className="text-success text-2xl font-black uppercase tracking-tighter font-heading">Razorpay</Text>
        </View>

        <View className="bg-white/5 p-8 rounded-3xl mb-8 items-center border border-white/10">
           <Text className="mb-2 text-gray-400 uppercase text-xs tracking-widest font-body font-bold">Amount to Pay</Text>
           <Text className="text-5xl text-[#FFFFFF] font-black font-heading">₹{amount || '260'}</Text>
           <Text className="mt-4 text-success font-bold tracking-widest uppercase text-[10px] font-body">Secure Transaction</Text>
        </View>

        <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest mb-6 font-body">Choose Method</Text>
        
        <ScrollView className="flex-1 gap-y-4 mb-4" showsVerticalScrollIndicator={false}>
          <TouchableOpacity 
            onPress={() => setMethod('upi')}
            activeOpacity={0.7}
            className={`flex-row items-center p-5 border-2 rounded-2xl mb-3 ${method === 'upi' ? 'border-[#1DAA4B] bg-[#1DAA4B]/10' : 'border-white/10 bg-white/5'}`}
          >
             <Text className="text-3xl mr-6">📱</Text>
             <View>
                <Text className="text-[#FFFFFF] uppercase font-bold tracking-tight text-sm font-body">UPI / GPay</Text>
                <Text className="text-gray-500 text-xs mt-0.5 font-body">Fast & Zero Fees</Text>
             </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setMethod('card')}
            activeOpacity={0.7}
            className={`flex-row items-center p-5 border-2 rounded-2xl mb-3 ${method === 'card' ? 'border-[#1DAA4B] bg-[#1DAA4B]/10' : 'border-white/10 bg-white/5'}`}
          >
             <Text className="text-3xl mr-6">💳</Text>
             <View>
                <Text className="text-[#FFFFFF] uppercase font-bold tracking-tight text-sm font-body">Card Payment</Text>
                <Text className="text-gray-500 text-xs mt-0.5 font-body">Visa, Mastercard, RuPay</Text>
             </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setMethod('turf')}
            activeOpacity={0.7}
            className={`flex-row items-center p-5 border-2 rounded-2xl ${method === 'turf' ? 'border-[#1DAA4B] bg-[#1DAA4B]/10' : 'border-white/10 bg-white/5'}`}
          >
             <Text className="text-3xl mr-6">🏟️</Text>
             <View>
                <Text className="text-[#FFFFFF] uppercase font-bold tracking-tight text-sm font-body">Pay at Turf</Text>
                <Text className="text-gray-500 text-xs mt-0.5 font-body">Cash/UPI at the ground counter</Text>
             </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View className="p-8 border-t border-white/5 bg-black/80">
         <Button 
           title={method === 'turf' ? 'CONFIRM BOOKING' : `PAY ₹${amount || '260'}`} 
           variant="primary" 
           loading={isProcessing}
           onPress={handlePay}
           className="w-full"
         />
         <Text className="text-center mt-6 text-gray-500 tracking-widest uppercase text-[9px] font-body">
            🔒 256-bit Secure Encryption
         </Text>
      </View>
    </SafeAreaView>
  );
}
