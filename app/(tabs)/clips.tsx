import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';

export default function ClipsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-muted">
      <ScrollView className="p-4">
        <Typography variant="h2" className="text-primary mb-2">My Clips</Typography>
        <Typography variant="body">Post-game content and highlights.</Typography>
      </ScrollView>
    </SafeAreaView>
  );
}
