import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UploadCloud } from 'lucide-react-native';
import { Typography } from '../../components/ui/Typography';

export default function CoordUploadScreen() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 p-6 justify-center">
        <Typography variant="h2" className="text-center mb-2 tracking-tighter uppercase">Content Delivery</Typography>
        <Typography variant="body" className="text-center mb-10 text-gray-500 text-xs tracking-widest uppercase">720P HD Resolution Required</Typography>
        
        <TouchableOpacity 
          activeOpacity={0.7}
          className="border-2 border-dashed border-primary/30 bg-white/5 items-center justify-center h-80 rounded-3xl"
        >
           <UploadCloud size={64} color="#1DAA4B" />
           <Typography variant="h3" className="text-primary mt-6 tracking-widest uppercase">Select Clips</Typography>
           <Typography variant="caption" className="mt-4 text-center w-64 text-gray-500 italic px-4">
              Upload raw footage within 24 hours to ensure player satisfaction.
           </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
