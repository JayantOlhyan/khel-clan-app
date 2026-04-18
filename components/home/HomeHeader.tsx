import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { MapPin, Bell, User, ChevronDown } from 'lucide-react-native';
import { Typography } from '../ui/Typography';

export function HomeHeader() {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-black">
      {/* Brand / Logo */}
      <View className="flex-row items-center">
        <Typography variant="h2" bold className="text-primary tracking-tighter mr-1 text-3xl">ACTION</Typography>
        <View className="bg-primary w-2 h-2 rounded-full mt-2" />
      </View>

      {/* Location Selector */}
      <TouchableOpacity className="flex-row items-center bg-white/5 px-3 py-2 rounded-full border border-white/10">
        <MapPin size={14} color="#1DAA4B" />
        <Typography variant="caption" className="mx-2 text-white font-bold" numberOfLines={1}>Delhi, NCR</Typography>
        <ChevronDown size={14} color="#888" />
      </TouchableOpacity>

      {/* Actions */}
      <View className="flex-row items-center">
        <TouchableOpacity className="mr-3 relative">
          <Bell size={22} color="#fff" />
          <View className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border border-black" />
        </TouchableOpacity>
        <TouchableOpacity className="w-8 h-8 rounded-full bg-white/10 items-center justify-center border border-white/20">
          <User size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
