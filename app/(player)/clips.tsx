import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';

export default function ClipsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4">
        <Typography variant="h2" className="text-primary mb-2 tracking-tighter uppercase">MY CLIPS</Typography>
        <Typography variant="body" className="text-gray-500">Post-game action clips will appear here.</Typography>
      </ScrollView>
    </SafeAreaView>
  );
}
