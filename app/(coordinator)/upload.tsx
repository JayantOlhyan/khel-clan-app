import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  UploadCloud, 
  Video, 
  ChevronDown, 
  HelpCircle,
  FileVideo, 
  Sparkles,
  Scissors,
  Check
} from 'lucide-react-native';

export default function CoordUploadScreen() {
  const [selectedGame, setSelectedGame] = useState('5v5 Football — Dwarka (Today)');
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success'>('idle');

  const handleSelectPress = () => {
    // Mock upload success toggle
    if (uploadStatus === 'idle') {
      setUploadStatus('success');
    } else {
      setUploadStatus('idle');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View className="pt-3 pb-5 border-b border-white/5 mb-6">
          <Text className="text-gold/80 text-[10px] uppercase font-bold tracking-widest font-body">Clan Footage Portal</Text>
          <Text className="text-[#FFFFFF] text-xl font-bold tracking-tight uppercase mt-0.5 font-heading">
            Content Delivery
          </Text>
          <Text className="text-gray-500 text-xs mt-1 font-body">Submit high-definition highlights within 24 hours of matching.</Text>
        </View>

        {/* Selected Match Picker Trigger */}
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">Uploading clips for</Text>
        <TouchableOpacity 
          activeOpacity={0.8}
          className="bg-white/5 border border-white/10 rounded-2xl p-4 flex-row justify-between items-center mb-6"
        >
          <View className="flex-row items-center">
            <Video size={16} color="#D4860A" />
            <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-wider ml-3 font-body">
              {selectedGame}
            </Text>
          </View>
          <ChevronDown size={14} color="#888" />
        </TouchableOpacity>

        {/* Beautiful Guidelines Card */}
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8">
          <View className="flex-row items-center mb-4">
            <Sparkles size={16} color="#D4860A" />
            <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest ml-2.5 font-body">
              Footage Guidelines
            </Text>
          </View>

          <View className="gap-3">
            <View className="flex-row items-start">
              <View className="bg-gold/15 p-1.5 rounded-lg border border-gold/20 mt-0.5">
                <Scissors size={10} color="#D4860A" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-gray-200 text-xs font-bold uppercase tracking-wide font-body">Trim Dead Times</Text>
                <Text className="text-gray-500 text-[10px] mt-0.5 font-body">Cut out pauses between plays. Deliver pure actions.</Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="bg-gold/15 p-1.5 rounded-lg border border-gold/20 mt-0.5">
                <FileVideo size={10} color="#D4860A" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-gray-200 text-xs font-bold uppercase tracking-wide font-body">720p HD Required</Text>
                <Text className="text-gray-500 text-[10px] mt-0.5 font-body">High contrast, steady landscape shooting is best.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Upload Container */}
        {uploadStatus === 'idle' ? (
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={handleSelectPress}
            className="border-2 border-dashed border-gold/30 bg-white/5 items-center justify-center py-14 rounded-3xl mb-4"
          >
            <View className="bg-gold/10 p-5 rounded-full border border-gold/25 mb-4">
              <UploadCloud size={40} color="#D4860A" />
            </View>
            <Text className="text-[#FFFFFF] tracking-wider uppercase text-sm font-bold font-heading">Select Raw Clips</Text>
            <Text className="mt-1 text-gray-500 text-[10px] uppercase font-bold tracking-widest font-body">
              MP4, MOV up to 500MB
            </Text>
            <Text className="mt-4 text-center w-64 text-gray-400 text-[11px] italic px-4 leading-4 font-body">
              "Footage ensures player satisfaction and fuels player highlight reels!"
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="bg-success/5 border border-success/30 rounded-3xl p-6 items-center text-center py-10">
            <View className="bg-success/20 p-5 rounded-full border border-success/30 mb-4">
              <Check color="#1D9E75" size={40} strokeWidth={3} />
            </View>
            <Text className="text-success tracking-wider uppercase text-sm font-bold font-heading">Upload Successful!</Text>
            <Text className="text-gray-400 text-xs text-center mt-2 px-5 leading-5 font-body">
              Your clips for <Text className="text-gold font-bold">{selectedGame}</Text> have been uploaded and are processing for highlight generation.
            </Text>

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => setUploadStatus('idle')}
              className="mt-6 bg-white/5 border border-white/10 px-6 py-2.5 rounded-xl"
            >
              <Text className="text-gray-300 text-xs uppercase tracking-wider font-bold font-body">Upload More</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="flex-row items-center justify-center mt-4">
          <HelpCircle size={12} color="#555" />
          <Text className="text-gray-600 text-[10px] uppercase font-bold ml-1.5 tracking-wider font-body">
            Having trouble? Contact Support
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
