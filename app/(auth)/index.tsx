import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';

export default function AuthScreen() {
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSendOtp = () => {
    // Stub implementation
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    // Stub implementation
    setUser({ uid: 'mock-user', phoneNumber: phone } as any);
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <View className="items-center mb-10">
        <Typography variant="h1" className="text-primary mb-2">⚽ KHEIL CLAN</Typography>
        <Typography variant="body" className="text-center">Find your game. Show up. Get your clip.</Typography>
      </View>

      {step === 'phone' ? (
        <View className="space-y-4 flex-col gap-4">
          <Typography variant="h3">Login or Sign up</Typography>
          <TextInput 
            className="border border-gray-200 rounded-xl p-4 font-mono text-base"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Enter Phone Number"
          />
          <Button title="Send OTP" onPress={handleSendOtp} variant="primary" />
        </View>
      ) : (
        <View className="space-y-4 flex-col gap-4">
          <Typography variant="h3">Verify OTP</Typography>
          <Typography variant="body">Sent to {phone}</Typography>
          <TextInput 
            className="border border-gray-200 rounded-xl p-4 font-mono text-base tracking-widest text-center"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            placeholder="000000"
            maxLength={6}
          />
          <Button title="Verify & Login" onPress={handleVerifyOtp} variant="primary" />
          <Button title="Back" onPress={() => setStep('phone')} variant="ghost" />
        </View>
      )}
    </View>
  );
}
