import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-muted">
      <View className="p-4">
        <Typography variant="h2" className="text-primary mb-2">Explore Games</Typography>
        <Typography variant="body">Search mapping and filters will go here.</Typography>
      </View>
    </SafeAreaView>
  );
}
