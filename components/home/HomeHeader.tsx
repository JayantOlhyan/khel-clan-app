import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { MapPin, Bell, User, ChevronDown } from 'lucide-react-native';

export function HomeHeader() {
  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-black">
      {/* Brand / Logo */}
      <View className="flex-row items-center">
        <View className="bg-white rounded-full p-1 mr-2 shadow-sm" style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={{ width: 32, height: 32, borderRadius: 16 }} 
            resizeMode="contain" 
          />
        </View>
        <Text className="text-[#FFFFFF] font-heading font-black tracking-tighter mr-1 text-2xl uppercase">
          KHELCLAN
        </Text>
      </View>

      {/* Location Selector */}
      <TouchableOpacity className="flex-row items-center bg-white/5 px-3 py-2 rounded-full border border-white/10">
        <MapPin size={14} color="#1DAA4B" />
        <Text className="mx-2 text-[#FFFFFF] font-bold text-xs font-body" numberOfLines={1}>
          Delhi, NCR
        </Text>
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
