import React from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import { Search, MapPin, Calendar, Clock } from 'lucide-react-native';

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
            <Text className="ml-3 text-black text-sm font-body">Date</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <Clock size={14} color="#1DAA4B" />
            <Text className="ml-3 text-black text-sm font-body">Time</Text>
          </TouchableOpacity>
        </View>

        {/* Search Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          className="bg-primary p-5 rounded-full items-center shadow-lg shadow-primary/40"
        >
          <Text className="text-[#FFFFFF] tracking-widest uppercase font-bold text-sm font-heading">
            Search Available Slots
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
