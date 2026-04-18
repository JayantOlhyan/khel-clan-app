import React, { useState } from 'react';
import { View, ScrollView, Switch, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Star, Grid3X3, Clock, Waves, Car } from 'lucide-react-native';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

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
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Hero */}
        <View className="h-96 w-full relative">
          <Image 
            source={{ uri: game.imageUrl }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/40" />
          
          <SafeAreaView className="absolute top-0 left-0 right-0 p-4 flex-row justify-between">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="w-12 h-12 rounded-full bg-black/50 items-center justify-center backdrop-blur-md"
            >
              <ChevronLeft color="#fff" size={24} />
            </TouchableOpacity>
            
            <View className="bg-primary px-4 py-2 rounded-full">
              <Typography bold className="text-white text-xs tracking-widest uppercase">Football</Typography>
            </View>
          </SafeAreaView>

          <View className="absolute bottom-6 left-6 right-6">
            <Typography variant="h1" className="text-white text-3xl mb-2">{game.title}</Typography>
            <View className="flex-row items-center">
              <Star color="#1DAA4B" fill="#1DAA4B" size={16} />
              <Typography className="text-white ml-2 font-bold">{game.rating}</Typography>
              <Typography className="text-gray-400 ml-1 text-xs">({game.reviews} reviews)</Typography>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View className="p-6">
          <Typography variant="h3" className="mb-6 uppercase tracking-tighter text-white">Turf Amenities</Typography>
          
          {/* Amenity Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
            {game.amenities.map((item) => {
              const Icon = item.icon;
              return (
                <View key={item.id} className="w-[48%] bg-white/5 p-4 rounded-2xl border border-white/10 flex-row items-center">
                  <View className="bg-primary/20 p-2 rounded-xl mr-3">
                    <Icon size={16} color="#1DAA4B" />
                  </View>
                  <Typography className="text-xs text-white/70 font-bold">{item.label}</Typography>
                </View>
              );
            })}
          </View>

          {/* Special Add-on */}
          <View className="bg-primary/10 border border-primary/30 rounded-[32px] p-6 mb-8">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-4">
                <Typography variant="h3" className="text-primary uppercase tracking-tight mb-1">✨ Content Add-On</Typography>
                <Typography className="text-gray-400 text-[11px] italic leading-relaxed">
                  Receive 2-4 personalized cinematic action clips post-game to share on your socials.
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

          <Typography variant="h3" className="mb-4 uppercase tracking-tighter text-white">Booking Policy</Typography>
          <View className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10">
            <Typography variant="body" className="text-gray-400 text-xs mb-3 italic">• Full refund if cancelled 24 hours before kick-off.</Typography>
            <Typography variant="body" className="text-gray-400 text-xs mb-3 italic">• Mandatory 15-min early arrival for warm-up.</Typography>
            <Typography variant="body" className="text-gray-400 text-xs italic">• BIBs and Footwear rental available at venue.</Typography>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View className="bg-black/80 px-8 py-10 border-t border-white/10 flex-row items-center justify-between">
        <View>
          <Typography className="text-gray-500 text-[10px] uppercase tracking-[2px] mb-1">Total Payment</Typography>
          <Typography variant="h2" className="text-white text-3xl">₹{total}</Typography>
        </View>
        <TouchableOpacity 
          onPress={handleCheckout}
          disabled={isProcessing}
          activeOpacity={0.8}
          className="bg-primary px-10 py-5 rounded-full shadow-lg shadow-primary/40"
        >
          <Typography bold className="text-white tracking-widest uppercase">JOIN NOW</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}
