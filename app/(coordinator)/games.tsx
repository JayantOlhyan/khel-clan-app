import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export default function CoordGamesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4 w-full h-full">
        <View className="flex-row justify-between items-center mb-10">
          <Typography variant="h2" className="text-white tracking-tighter uppercase">My Management</Typography>
          <Button title="+ NEW GAME" variant="gold" className="py-2 px-4 shadow-none" />
        </View>

        <View className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-4 opacity-60">
           <Typography variant="h3" className="mb-2 text-white/50 uppercase tracking-tight">7v7 Football — Rohini</Typography>
           <Typography variant="body" bold className="text-success mb-2 uppercase text-xs tracking-widest">Completed</Typography>
           <Typography variant="caption" className="text-gray-500 italic">Clips Uploaded (SLA Met)</Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
