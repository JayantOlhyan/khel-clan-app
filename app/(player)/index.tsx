import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { GameCard, Game } from '../../components/game/GameCard';
import { useRouter } from 'expo-router';

// Dummy implementation representing real-time firestore data later
const MOCK_GAMES: Game[] = [
  {
    id: 'g1',
    sport: 'Football',
    title: '5v5 Football — Dwarka Sector 12',
    date_time: new Date(Date.now() + 86400000).toISOString(),
    turf_name: 'Dribblers Turf',
    slots_total: 10,
    slots_filled: 7,
    price_base: 230,
    price_content_addon: 30,
    coordinator_name: 'Rahul',
    coordinator_rating: 4.8
  },
  {
    id: 'g2',
    sport: 'Football',
    title: '7v7 Football — Rohini',
    date_time: new Date(Date.now() + 172800000).toISOString(),
    turf_name: 'Kickoff Arena',
    slots_total: 14,
    slots_filled: 14,
    price_base: 250,
    price_content_addon: 30,
    coordinator_name: 'Amit',
    coordinator_rating: 4.9
  }
];

export default function HomeScreen() {
  const router = useRouter();

  const handleJoin = (id: string) => {
    router.push(`/game/${id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="px-4 pt-4">
        <Typography variant="h2" className="mb-1 text-primary tracking-tighter">LIVE GAMES</Typography>
        <Typography variant="body" className="mb-6 text-gray-500 uppercase text-xs tracking-widest">Delhi NCR • Near You</Typography>
        
        {MOCK_GAMES.map(game => (
          <GameCard key={game.id} game={game} onJoinPress={handleJoin} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
