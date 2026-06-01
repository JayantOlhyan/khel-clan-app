import React from 'react';
import { View, ScrollView, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard, Game } from '../../components/game/GameCard';
import { HomeHeader } from '../../components/home/HomeHeader';
import { CategoryScroll } from '../../components/home/CategoryScroll';
import { SearchWidget } from '../../components/home/SearchWidget';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Dummy implementation representing real-time firestore data later
const MOCK_GAMES: Game[] = [
  {
    id: 'g1',
    sport: 'Football',
    title: '5v5 Weekend Kickoff',
    date_time: new Date(Date.now() + 86400000).toISOString(),
    turf_name: 'Dribblers Turf',
    slots_total: 10,
    slots_filled: 7,
    price_base: 230,
    price_content_addon: 30,
    coordinator_name: 'Rahul',
    coordinator_rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'g2',
    sport: 'Tennis',
    title: 'Pro Singles Championship',
    date_time: new Date(Date.now() + 172800000).toISOString(),
    turf_name: 'Kickoff Arena',
    slots_total: 4,
    slots_filled: 2,
    price_base: 450,
    price_content_addon: 30,
    coordinator_name: 'Amit',
    coordinator_rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1595435064212-44672a1f710c?q=80&w=800&auto=format&fit=crop'
  }
];

export default function HomeScreen() {
  const router = useRouter();

  const handleJoin = (id: string) => {
    router.push(`/game/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['top']}>
      <HomeHeader />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <CategoryScroll />
        <SearchWidget />

        {/* Premium Pickleball Promo Card */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={() => router.push('/(player)/explore')}
          className="mx-5 mt-6 overflow-hidden rounded-3xl border border-[#CAFC05]/20 shadow-xl shadow-[#CAFC05]/5"
        >
          <ImageBackground 
            source={require('../../assets/images/pickleball_welcome.png')} 
            className="w-full h-44 justify-end p-5"
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.9)']}
              className="absolute inset-0"
            />
            <View className="relative z-10">
              <View className="bg-[#CAFC05] px-3 py-0.5 rounded-full align-self-start self-start mb-1.5">
                <Text className="text-black font-bold text-[9px] tracking-widest uppercase font-body">SPECIAL RELEASE</Text>
              </View>
              <Text className="text-[#CAFC05] italic tracking-tighter uppercase text-xl font-heading font-black leading-none">
                LET'S PLAY PICKLEBALL
              </Text>
              <Text className="text-gray-300 text-xs mt-1 font-body">
                Explore popular courts, join camps & book slots instantly.
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        
        <View className="px-5 mt-8">
          <View className="flex-row justify-between items-end mb-6">
            <View>
              <Text className="text-[#FFFFFF] text-xl font-bold tracking-tighter uppercase font-heading">Upcoming Action</Text>
              <Text className="text-gray-500 text-xs tracking-widest uppercase mt-1 font-body">Delhi NCR • LIVE NOW</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(player)/explore')}>
              <Text className="text-success font-bold text-xs uppercase tracking-widest font-body">See All</Text>
            </TouchableOpacity>
          </View>
          
          {MOCK_GAMES.map(game => (
            <GameCard key={game.id} game={game} onJoinPress={handleJoin} />
          ))}

          <View className="flex-row justify-between items-end mb-6 mt-10">
            <View>
              <Text className="text-[#FFFFFF] text-xl font-bold tracking-tighter uppercase font-heading">Recommended for You</Text>
              <Text className="text-gray-500 text-xs tracking-widest uppercase mt-1 font-body">Based on your activity</Text>
            </View>
          </View>

          {/* Placeholder for horizontal scroll recommended games */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10">
             {MOCK_GAMES.map(game => (
                <View key={`rec-${game.id}`} className="mr-4 w-72">
                  <GameCard game={game} onJoinPress={handleJoin} />
                </View>
             ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
