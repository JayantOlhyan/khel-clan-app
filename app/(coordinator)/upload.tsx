import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UploadCloud } from 'lucide-react-native';
import { Typography } from '../../components/ui/Typography';

export default function CoordUploadScreen() {
  return (
    <SafeAreaView className="flex-1 bg-muted">
      <View className="flex-1 p-4 justify-center">
        <Typography variant="h2" className="text-center mb-2">Clip Uploads</Typography>
        <Typography variant="body" className="text-center mb-8">Drop your action clips here for processing.</Typography>
        
        <TouchableOpacity className="border-2 border-dashed border-primary/50 bg-white items-center justify-center h-64 rounded-xl shadow-sm">
           <UploadCloud size={48} color="#1D6A36" />
           <Typography variant="h3" className="text-primary mt-4">Select Files</Typography>
           <Typography variant="caption" className="mt-2 text-center w-64">Minimum 720p resolution required to satisfy player SLA.</Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
