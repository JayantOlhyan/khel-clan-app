import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-4">
        <Typography variant="h2" className="text-primary mb-2 tracking-tighter uppercase">Explore</Typography>
        <Typography variant="body" className="text-gray-500">Search and Filter coming soon</Typography>
      </View>
    </SafeAreaView>
  );
}
