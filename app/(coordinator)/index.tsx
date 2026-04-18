import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';

export default function CoordOverviewScreen() {
  return (
    <SafeAreaView className="flex-1 bg-muted">
      <ScrollView className="p-4">
        <Typography variant="h2" className="text-black mb-2">Coordinator Dashboard</Typography>
        <Typography variant="body" className="mb-6">Welcome back. Here's your summary.</Typography>
        
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white p-4 rounded-xl border border-gray-200">
             <Typography variant="caption" className="mb-1">Games Run</Typography>
             <Typography variant="h2" className="text-primary mt-1">12</Typography>
          </View>
          <View className="flex-1 bg-white p-4 rounded-xl border border-gray-200 shadow-sm border-gold/50">
             <Typography variant="caption" className="mb-1">Total Earnings</Typography>
             <Typography variant="h2" className="text-gold mt-1">₹3,000</Typography>
          </View>
        </View>

        <Typography variant="h3" className="mb-2 mt-4">Pending Actions</Typography>
        <View className="bg-white p-4 rounded-xl border border-error">
           <Typography variant="body" bold className="text-error mb-1">Upload Clips (1 hour left)</Typography>
           <Typography variant="caption">5v5 Football — Dwarka Sector 12</Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
