import React from 'react';
import { View, TouchableOpacity, Linking, Image, Text } from 'react-native';
import { MapPin, Calendar, Clock, Star } from 'lucide-react-native';
import { SlotMeter } from './SlotMeter';

export interface Game {
  id: string;
  sport: string;
  title: string;
  date_time: string;
  turf_name: string;
  turf_address?: string;
  slots_total: number;
  slots_filled: number;
  price_base: number;
  price_content_addon: number;
  coordinator_name: string;
  coordinator_rating: number;
  image_url?: string;
}

interface GameCardProps {
  game: Game;
  onJoinPress: (gameId: string) => void;
}

export function GameCard({ game, onJoinPress }: GameCardProps) {
  const isFull = game.slots_filled >= game.slots_total;

  const handleMapPress = () => {
    if (game.turf_name) {
      const query = encodeURIComponent(game.turf_name + (game.turf_address ? ` ${game.turf_address}` : ''));
      Linking.openURL(`https://maps.google.com/?q=${query}`);
    }
  };

  const parsedDate = new Date(game.date_time);
  const dateStr = parsedDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  const timeStr = parsedDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={() => onJoinPress(game.id)}
      className="bg-white/5 rounded-[32px] mb-6 border border-white/10 overflow-hidden"
    >
      {/* Hero Image Section */}
      <View className="relative h-48 w-full bg-white/10">
        {game.image_url ? (
          <Image source={{ uri: game.image_url }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center bg-primary/20">
             <Text className="text-white/20 opacity-30 text-3xl font-heading uppercase">{game.sport}</Text>
          </View>
        )}
        
        {/* Overlays */}
        <View className="absolute top-4 left-4 bg-success px-3 py-1 rounded-full">
          <Text className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase font-body">{game.sport}</Text>
        </View>

        <View className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md flex-row items-center">
          <Star size={10} color="#1DAA4B" fill="#1DAA4B" />
          <Text className="text-[#FFFFFF] text-[10px] ml-1 font-bold font-body">{game.coordinator_rating}</Text>
        </View>

        <View className="absolute bottom-4 right-4 bg-black/60 px-3 py-1.5 rounded-2xl backdrop-blur-md border border-white/10">
          <Text className="text-success text-xs font-bold font-body">₹{game.price_base}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View className="p-5">
        <Text className="text-[#FFFFFF] text-lg font-bold uppercase tracking-tight mb-3 font-heading" numberOfLines={1}>
          {game.title}
        </Text>

        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center bg-white/5 px-2.5 py-1 rounded-lg mr-3">
             <Calendar size={12} color="#888" />
             <Text className="text-[10px] text-gray-400 ml-1.5 uppercase tracking-widest font-body">{dateStr}</Text>
          </View>
          <View className="flex-row items-center bg-white/5 px-2.5 py-1 rounded-lg">
             <Clock size={12} color="#888" />
             <Text className="text-[10px] text-gray-400 ml-1.5 uppercase tracking-widest font-body">{timeStr}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleMapPress} className="flex-row items-center mb-4">
          <MapPin size={14} color="#1DAA4B" />
          <Text className="ml-2 text-white/50 text-xs tracking-tight font-body" numberOfLines={1}>
             {game.turf_name} • Delhi, NCR
          </Text>
        </TouchableOpacity>

        <SlotMeter slotsTotal={game.slots_total} slotsFilled={game.slots_filled} />

        {!isFull && (
          <View className="mt-4 flex-row justify-between items-center">
             <Text className="text-[10px] uppercase tracking-widest text-gray-500 font-body">Host: {game.coordinator_name}</Text>
             <View className="bg-success/15 px-4 py-1.5 rounded-full border border-success/20">
                <Text className="text-success text-[10px] font-bold tracking-widest font-body">TAP TO JOIN</Text>
             </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
