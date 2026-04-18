import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useAuthStore, UserRole } from '../../store/authStore';

export default function AuthScreen() {
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp' | 'role'>('phone');
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSendOtp = () => {
    setStep('otp');
  };

  const handleVerifyOtp = () => {
    setStep('role');
  };

  const selectRole = (role: UserRole) => {
    setUser({ uid: 'mock-user', phoneNumber: phone, role });
    if (role === 'player') {
      router.replace('/(player)');
    } else {
      router.replace('/(coordinator)');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="h-72 w-full bg-black relative">
        <Image 
          source={require('../../assets/images/nanobanana_turf.png')} 
          className="absolute w-full h-full opacity-70"
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center pt-8">
           <Typography variant="h1" className="text-white mb-2 text-4xl tracking-tight">⚽ KHEIL CLAN</Typography>
           <Typography variant="body" bold className="text-white mt-1">
             Find your game. Show up. Get your clip.
           </Typography>
        </View>
      </View>

      <View className="flex-1 px-6 justify-center pb-12 mt-4">
        {step === 'phone' && (
          <View className="flex-col gap-4">
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
        )}

        {step === 'otp' && (
          <View className="flex-col gap-4">
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
            <Button title="Verify" onPress={handleVerifyOtp} variant="primary" />
            <Button title="Back" onPress={() => setStep('phone')} variant="ghost" />
          </View>
        )}

        {step === 'role' && (
          <View className="flex-col gap-4">
            <Typography variant="h2" className="text-center mb-2">Who are you?</Typography>
            
            <TouchableOpacity 
              onPress={() => selectRole('player')}
              className="border-2 border-primary rounded-xl p-6 items-center bg-muted"
            >
              <Typography variant="h1" className="mb-2 text-5xl">🏃</Typography>
              <Typography variant="h3" className="text-primary mt-2">I am a Player</Typography>
              <Typography variant="caption" className="text-center mt-1">I want to book slots and play.</Typography>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => selectRole('coordinator')}
              className="border-2 border-gray-200 rounded-xl p-6 items-center bg-white mt-2"
            >
              <Typography variant="h1" className="mb-2 text-5xl">📋</Typography>
              <Typography variant="h3" className="text-black mt-2">I am a Coordinator</Typography>
              <Typography variant="caption" className="text-center mt-1">I want to manage games & uploads.</Typography>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
