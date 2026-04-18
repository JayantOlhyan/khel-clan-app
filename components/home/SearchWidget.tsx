import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Search, MapPin, Calendar, Clock } from 'lucide-react-native';
import { Typography } from '../ui/Typography';

export function SearchWidget() {
  return (
    <View className="px-4 py-2 mt-2">
      <View className="bg-white rounded-3xl p-6 shadow-2xl">
        {/* Activity Search */}
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl mb-3 border border-gray-100">
          <Search size={20} color="#1DAA4B" />
          <TextInput 
            placeholder="What activity?" 
            placeholderTextColor="#999"
            className="ml-3 flex-1 font-body text-black"
          />
        </View>

        {/* Location Row */}
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl mb-3 border border-gray-100">
          <MapPin size={20} color="#1DAA4B" />
          <TextInput 
            placeholder="Location" 
            placeholderTextColor="#999"
            className="ml-3 flex-1 font-body text-black"
          />
        </View>

        {/* Date & Time Row */}
        <View className="flex-row gap-x-3 mb-6">
          <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <Calendar size={18} color="#1DAA4B" />
            <Typography className="ml-3 text-black text-sm">Date</Typography>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <Clock size={14} color="#1DAA4B" />
            <Typography className="ml-3 text-black text-sm">Time</Typography>
          </TouchableOpacity>
        </View>

        {/* Search Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          className="bg-primary p-5 rounded-full items-center shadow-lg shadow-primary/40"
        >
          <Typography variant="h3" bold className="text-white tracking-widest uppercase">
            Search Available Slots
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}
