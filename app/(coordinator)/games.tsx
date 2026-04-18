import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { Button } from '../../components/ui/Button';

export default function CoordGamesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-muted">
      <ScrollView className="p-4 w-full h-full">
        <View className="flex-row justify-between items-center mb-6">
          <Typography variant="h2" className="text-black">My Games</Typography>
          <Button title="+ Create" variant="gold" className="py-2 px-4" />
        </View>

        <View className="bg-white p-4 rounded-xl border border-gray-200 mb-4 opacity-50">
           <Typography variant="h3" className="mb-1">7v7 Football — Rohini</Typography>
           <Typography variant="body" className="text-success mb-2">Completed</Typography>
           <Typography variant="caption">Clips Uploaded On Time</Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
