import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Typography } from '../ui/Typography';

const CATEGORIES = [
  { id: '1', name: 'FOOTBALL', icon: '⚽' },
  { id: '2', name: 'TENNIS', icon: '🎾' },
  { id: '3', name: 'BASKETBALL', icon: '🏀' },
  { id: '4', name: 'CRICKET', icon: '🏏' },
  { id: '5', name: 'BADMINTON', icon: '🏸' },
  { id: '6', name: 'SQUASH', icon: '🎾' },
];

export function CategoryScroll() {
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
            className={`mr-4 items-center bg-white/5 px-6 py-4 rounded-3xl border border-white/10 ${index === 0 ? 'bg-primary/20 border-primary/30' : ''}`}
          >
            <Typography className="text-2xl mb-1">{cat.icon}</Typography>
            <Typography variant="caption" bold className={`text-[10px] tracking-widest ${index === 0 ? 'text-primary' : 'text-gray-400'}`}>
              {cat.name}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
