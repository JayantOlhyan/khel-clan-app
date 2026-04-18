import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="p-4">
        <Typography variant="h2" className="text-primary mb-2 tracking-tighter uppercase">Profile</Typography>
        <Typography variant="body" className="text-gray-500">Member ID: #KC0122</Typography>
      </ScrollView>
    </SafeAreaView>
  );
}
