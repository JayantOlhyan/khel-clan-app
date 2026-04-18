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
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200">
      {/* Header */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-2">
          <Typography variant="h3" className="mb-1 text-black" numberOfLines={1}>⚽ {game.title}</Typography>
        </View>
        <View className="bg-muted px-2 py-1 rounded">
          <Typography variant="mono" bold className="text-primary">₹{game.price_base}</Typography>
        </View>
      </View>

      {/* Details */}
      <View className="flex-col gap-y-2 mb-3 mt-1">
        <View className="flex-row items-center">
          <Calendar size={16} color="#4A4A4A" />
          <Typography variant="body" className="ml-2">{dateStr}</Typography>
        </View>
        <View className="flex-row items-center">
          <Clock size={16} color="#4A4A4A" />
          <Typography variant="body" className="ml-2">{timeStr}</Typography>
        </View>
        <TouchableOpacity onPress={handleMapPress} className="flex-row items-center">
          <MapPin size={16} color="#1D6A36" />
          <Typography variant="body" className="ml-2 text-primary underline">{game.turf_name}</Typography>
        </TouchableOpacity>
        <View className="flex-row items-center">
          <User size={16} color="#4A4A4A" />
          <Typography variant="body" className="ml-2">By {game.coordinator_name} (⭐ {game.coordinator_rating})</Typography>
        </View>
      </View>

      {/* Slot Meter */}
      <SlotMeter slotsTotal={game.slots_total} slotsFilled={game.slots_filled} />

      {/* Action */}
      <Button 
        title={isFull ? "Game Full" : "Join Game"} 
        variant={isFull ? "outline" : "gold"}
        className="mt-4"
        disabled={isFull}
        onPress={() => onJoinPress(game.id)}
      />
    </View>
  );
}
