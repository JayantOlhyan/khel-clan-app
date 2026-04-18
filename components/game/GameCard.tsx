import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { MapPin, Calendar, Clock, User } from 'lucide-react-native';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';
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
    <View className="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10 overflow-hidden relative">
      <View className="absolute top-[-20] right-[-20] w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Header */}
      <View className="flex-row justify-between items-start mb-2 relative">
        <View className="flex-1 mr-2">
          <Typography variant="h3" bold className="text-white uppercase tracking-tight" numberOfLines={1}>{game.title}</Typography>
        </View>
        <View className="bg-primary/20 border border-primary/30 px-3 py-1 rounded-full">
          <Typography variant="mono" bold className="text-primary text-sm">₹{game.price_base}</Typography>
        </View>
      </View>

      {/* Details */}
      <View className="flex-col gap-y-2 mb-4 mt-2 relative">
        <View className="flex-row items-center">
          <Calendar size={14} color="#888" />
          <Typography variant="body" className="ml-2 text-gray-400 text-sm">{dateStr}</Typography>
        </View>
        <View className="flex-row items-center">
          <Clock size={14} color="#888" />
          <Typography variant="body" className="ml-2 text-gray-400 text-sm">{timeStr}</Typography>
        </View>
        <TouchableOpacity onPress={handleMapPress} className="flex-row items-center">
          <MapPin size={14} color="#1DAA4B" />
          <Typography variant="body" className="ml-2 text-primary text-sm underline font-bold">{game.turf_name}</Typography>
        </TouchableOpacity>
        <View className="flex-row items-center">
          <User size={14} color="#888" />
          <Typography variant="body" className="ml-2 text-gray-400 text-sm">Organized by {game.coordinator_name} (⭐ {game.coordinator_rating})</Typography>
        </View>
      </View>

      {/* Slot Meter */}
      <SlotMeter slotsTotal={game.slots_total} slotsFilled={game.slots_filled} />

      {/* Action */}
      <Button 
        title={isFull ? "CLOSED" : "JOIN GAME"} 
        variant={isFull ? "outline" : "primary"}
        className="mt-6"
        disabled={isFull}
        onPress={() => onJoinPress(game.id)}
      />
    </View>
  );
}
