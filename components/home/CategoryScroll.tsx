import React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { useRouter } from 'expo-router';

const CATEGORIES = [
  { id: '7', name: 'PICKLEBALL', icon: '⚡' },
  { id: '1', name: 'FOOTBALL', icon: '⚽' },
  { id: '2', name: 'TENNIS', icon: '🎾' },
  { id: '3', name: 'BASKETBALL', icon: '🏀' },
  { id: '4', name: 'CRICKET', icon: '🏏' },
  { id: '5', name: 'BADMINTON', icon: '🏸' },
  { id: '6', name: 'SQUASH', icon: '🎾' },
];

export function CategoryScroll() {
  const router = useRouter();

  return (
    <View className="py-4">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {CATEGORIES.map((cat, index) => (
          <TouchableOpacity 
            key={cat.id}
            activeOpacity={0.7}
            onPress={() => {
              if (cat.name === 'PICKLEBALL') {
                router.push('/(player)/explore');
              }
            }}
            className={`mr-4 items-center px-6 py-4 rounded-3xl border ${
              cat.name === 'PICKLEBALL'
                ? 'bg-[#CAFC05]/20 border-[#CAFC05]/30'
                : index === 1
                ? 'bg-primary/20 border-primary/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <Text className="text-2xl mb-1 font-body">{cat.icon}</Text>
            <Text 
              className={`text-[10px] tracking-widest font-bold font-body ${
                cat.name === 'PICKLEBALL' ? 'text-[#CAFC05]' : index === 1 ? 'text-success' : 'text-gray-400'
              }`}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
