import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';

export default function CoordOverviewScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4">
        <Typography variant="h2" className="text-primary mb-2 tracking-tighter uppercase">Coordinator Dashboard</Typography>
        <Typography variant="body" className="mb-6 text-gray-500 uppercase text-xs tracking-widest">Performance Summary</Typography>
        
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white/5 p-4 rounded-xl border border-white/10">
             <Typography variant="caption" className="mb-1 uppercase tracking-wider text-[10px]">Games Run</Typography>
             <Typography variant="h2" className="text-primary mt-1">12</Typography>
          </View>
          <View className="flex-1 bg-white/5 p-4 rounded-xl border border-gold/30 shadow-lg shadow-gold/5">
             <Typography variant="caption" className="mb-1 uppercase tracking-wider text-[10px]">Earnings</Typography>
             <Typography variant="h2" className="text-gold mt-1">₹3,000</Typography>
          </View>
        </View>

        <Typography variant="h3" className="mb-4 uppercase tracking-tighter">Pending Actions</Typography>
        <View className="bg-error/10 p-5 rounded-2xl border border-error/20">
           <Typography variant="body" bold className="text-error mb-2 tracking-widest uppercase text-xs">Upload Clips (1 hour left)</Typography>
           <Typography variant="h3" className="text-white text-sm">5v5 Football — Dwarka Sector 12</Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
