import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';
import { useAuthStore, UserRole } from '../../store/authStore';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export default function AuthScreen() {
  const [phone, setPhone] = useState('+91');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'landing' | 'phone' | 'otp' | 'role'>('landing');
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
    <View className="flex-1 bg-black">
      {/* Cinematic Background */}
      <Image 
        source={require('../../assets/images/nanobanana_turf.png')} 
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)', '#000000']}
        className="absolute inset-0"
      />

      <View className={`flex-1 ${step !== 'landing' ? 'bg-black/60' : ''}`}>
        {step === 'landing' && (
          <View className="flex-1 justify-end px-6 pb-20">
            <View className="items-center mb-10">
              <View className="bg-primary/20 p-2 rounded-lg mb-4">
                <Typography variant="h3" className="text-primary font-bold">HOF</Typography>
              </View>
              <Typography variant="h1" className="text-center text-4xl leading-none">
                JOIN YOUR NEAREST{"\n"}
                GAME <Typography variant="h1" className="text-primary">TODAY</Typography>
              </Typography>
              <Typography variant="body" className="text-center mt-4 text-gray-300">
                Connect with fellow players and find your next match
              </Typography>
            </View>
            <Button 
              title="Get Started →" 
              variant="primary" 
              onPress={() => setStep('phone')}
              className="w-full"
            />
          </View>
        )}

        {step === 'phone' && (
          <View className="flex-1 justify-center px-6">
            <Typography variant="h2" className="mb-6">Enter your Phone</Typography>
            <View className="bg-white/10 border border-white/20 rounded-xl p-4 mb-4">
              <TextInput 
                className="text-white font-mono text-lg"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#666"
                placeholder="+91 XXXXX XXXXX"
                autoFocus
              />
            </View>
            <Button title="Continue" variant="primary" onPress={handleSendOtp} />
            <Button title="Back" variant="ghost" onPress={() => setStep('landing')} className="mt-2" />
          </View>
        )}

        {step === 'otp' && (
          <View className="flex-1 justify-center px-6">
            <Typography variant="h2" className="mb-2">Verify OTP</Typography>
            <Typography variant="body" className="mb-6 text-gray-400">Sent to {phone}</Typography>
            <View className="bg-white/10 border border-white/20 rounded-xl p-4 mb-4">
              <TextInput 
                className="text-white font-mono text-2xl tracking-[10px] text-center"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                placeholder="000000"
                placeholderTextColor="#333"
                maxLength={6}
                autoFocus
              />
            </View>
            <Button title="Login" variant="primary" onPress={handleVerifyOtp} />
            <Button title="Resend code" variant="ghost" className="mt-2" />
          </View>
        )}

        {step === 'role' && (
          <View className="flex-1 justify-center px-6">
            <Typography variant="h2" className="text-center mb-8">CHOOSE YOUR ROLE</Typography>
            
            <TouchableOpacity 
              onPress={() => selectRole('player')}
              className="bg-primary/10 border-2 border-primary rounded-2xl p-8 items-center mb-4"
            >
              <Typography variant="h1" className="text-5xl mb-2">🏃</Typography>
              <Typography variant="h2" className="text-primary">PLAYER</Typography>
              <Typography variant="caption" className="text-center mt-1 text-gray-300 italic">I want to book slots and play.</Typography>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => selectRole('coordinator')}
              className="bg-white/5 border-2 border-white/20 rounded-2xl p-8 items-center"
            >
              <Typography variant="h1" className="text-5xl mb-2">📋</Typography>
              <Typography variant="h2">COORDINATOR</Typography>
              <Typography variant="caption" className="text-center mt-1 text-gray-400 italic">I want to manage games & uploads.</Typography>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

