import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { GameCard, Game } from '../../components/game/GameCard';
import { HomeHeader } from '../../components/home/HomeHeader';
import { CategoryScroll } from '../../components/home/CategoryScroll';
import { SearchWidget } from '../../components/home/SearchWidget';
import { useRouter } from 'expo-router';

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
        
        <View className="px-5 mt-8">
          <View className="flex-row justify-between items-end mb-6">
            <View>
              <Typography variant="h2" bold className="text-white tracking-tighter uppercase">Upcoming Action</Typography>
              <Typography className="text-gray-500 text-xs tracking-widest uppercase mt-1">Delhi NCR • LIVE NOW</Typography>
            </View>
            <Typography className="text-primary font-bold text-xs uppercase tracking-widest">See All</Typography>
          </View>
          
          {MOCK_GAMES.map(game => (
            <GameCard key={game.id} game={game} onJoinPress={handleJoin} />
          ))}

          <View className="flex-row justify-between items-end mb-6 mt-10">
            <View>
              <Typography variant="h2" bold className="text-white tracking-tighter uppercase">Recommended for You</Typography>
              <Typography className="text-gray-500 text-xs tracking-widest uppercase mt-1">Based on your activity</Typography>
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
