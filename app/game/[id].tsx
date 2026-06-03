import React, { useState } from 'react';
import { View, ScrollView, Switch, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, Star, Grid3X3, Clock, Waves, Car, ShieldCheck } from 'lucide-react-native';

export default function GameDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [includeClip, setIncludeClip] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for the detailed view
  const game = {
    title: '5v5 Weekend Kickoff',
    location: 'Dribblers Turf, Delhi',
    rating: 4.9,
    reviews: 124,
    price: 230,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    amenities: [
      { id: '1', label: '5 Courts', icon: Grid3X3 },
      { id: '2', label: '22:00 PM', icon: Clock },
      { id: '3', label: 'Shower Area', icon: Waves },
      { id: '4', label: 'Free Parking', icon: Car },
    ]
  };

  const clipPrice = 30;
  const total = game.price + (includeClip ? clipPrice : 0);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push({ pathname: `/checkout/${id}`, params: { amount: total } });
    }, 500);
  };

  return (
    <View className="flex-1 bg-[#0A0A0A] relative">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Sticky Floating Header Bar */}
      <SafeAreaView 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }} 
        className="px-5 pt-3 pb-3 flex-row justify-between items-center" 
        edges={['top']}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/60 items-center justify-center border border-white/10 shadow-lg shadow-black/50"
        >
          <ChevronLeft color="#FFFFFF" size={20} strokeWidth={2.5} />
        </TouchableOpacity>
        
        <View className="bg-success/80 px-3.5 py-1 rounded-full border border-success/30 backdrop-blur-md">
          <Text className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase font-body">Football</Text>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Hero */}
        <View className="h-[360px] w-full relative">
          <Image 
            source={{ uri: game.imageUrl }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/50" />

          <View className="absolute bottom-6 left-6 right-6">
            <Text className="text-[#FFFFFF] text-2xl font-black uppercase tracking-tight font-heading mb-1.5">
              {game.title}
            </Text>
            <View className="flex-row items-center">
              <Star color="#1DAA4B" fill="#1DAA4B" size={14} />
              <Text className="text-[#FFFFFF] ml-1.5 font-bold text-xs font-body">{game.rating}</Text>
              <Text className="text-gray-400 ml-1 text-[11px] font-body">({game.reviews} reviews)</Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="p-6">
          <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest mb-4 font-body">
            Turf Amenities
          </Text>
          
          {/* Amenity Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-3 mb-8">
            {game.amenities.map((item) => {
              const Icon = item.icon;
              return (
                <View key={item.id} className="w-[48%] bg-white/5 p-3.5 rounded-2xl border border-white/10 flex-row items-center">
                  <View className="bg-success/10 p-2 rounded-xl mr-3 border border-success/20">
                    <Icon size={14} color="#1DAA4B" />
                  </View>
                  <Text className="text-xs text-gray-300 font-bold font-body">{item.label}</Text>
                </View>
              );
            })}
          </View>

          {/* Special Add-on */}
          <View className="bg-success/5 border border-success/30 rounded-3xl p-5 mb-8">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-4">
                <Text className="text-success text-xs font-bold uppercase tracking-widest mb-1 font-body">
                  ✨ Content Add-On
                </Text>
                <Text className="text-gray-400 text-[10px] leading-4 font-body">
                  Receive 2-4 personalized cinematic action clips post-game to share on your socials.
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#222', true: '#1DAA4B' }}
                thumbColor={'#FFFFFF'}
                onValueChange={setIncludeClip}
                value={includeClip}
              />
            </View>
          </View>

          <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest mb-4 font-body">
            Booking Policy
          </Text>
          <View className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10 gap-3">
            <View className="flex-row items-start">
              <ShieldCheck size={14} color="#1DAA4B" className="mt-0.5" />
              <Text className="text-gray-400 text-xs ml-2 flex-1 font-body">
                Full refund if cancelled 24 hours before kick-off.
              </Text>
            </View>
            <View className="flex-row items-start">
              <ShieldCheck size={14} color="#1DAA4B" className="mt-0.5" />
              <Text className="text-gray-400 text-xs ml-2 flex-1 font-body">
                Mandatory 15-min early arrival for warm-up.
              </Text>
            </View>
            <View className="flex-row items-start">
              <ShieldCheck size={14} color="#1DAA4B" className="mt-0.5" />
              <Text className="text-gray-400 text-xs ml-2 flex-1 font-body">
                BIBs and Footwear rental available at venue.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View className="bg-black/90 px-6 py-5 border-t border-white/5 flex-row items-center justify-between">
        <View>
          <Text className="text-gray-500 text-[9px] uppercase tracking-[1.5px] font-bold font-body">Total Payment</Text>
          <Text className="text-success text-2xl font-black font-body mt-0.5">₹{total}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={handleCheckout}
          disabled={isProcessing}
          activeOpacity={0.8}
          className="bg-success px-8 py-3.5 rounded-full shadow-lg shadow-success/20"
        >
          <Text className="text-[#FFFFFF] text-xs font-bold tracking-widest uppercase font-body">
            {isProcessing ? 'Processing...' : 'JOIN NOW'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
