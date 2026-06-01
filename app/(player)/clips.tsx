import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Play, 
  Share2, 
  Sparkles, 
  Flame, 
  Award, 
  TrendingUp, 
  Heart,
  MessageSquare
} from 'lucide-react-native';

const HIGHLIGHTS = [
  {
    id: 'h1',
    title: 'Stunning Football Volley Goal',
    match: '5v5 Weekend Kickoff • Delhi',
    views: '1.2k views',
    duration: '0:15',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    likes: '143',
    comments: '24'
  },
  {
    id: 'h2',
    title: 'Incredible Pickleball Rally Rally',
    match: 'Singles Open • Azure Courts',
    views: '840 views',
    duration: '0:22',
    thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
    likes: '96',
    comments: '12'
  }
];

export default function ClipsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View className="pt-3 pb-5 border-b border-white/5 mb-6">
          <Text className="text-success text-[10px] uppercase font-bold tracking-widest font-body">Match Highlights</Text>
          <Text className="text-[#FFFFFF] text-xl font-bold tracking-tight uppercase mt-0.5 font-heading">
            My Clips
          </Text>
          <Text className="text-gray-500 text-xs mt-1 font-body">Generated automatically from your game footage uploads.</Text>
        </View>

        {/* AI Highlight Banner */}
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8 flex-row items-center relative overflow-hidden">
          <View className="absolute right-0 bottom-0 opacity-10">
            <Flame size={120} color="#1DAA4B" />
          </View>
          <View className="flex-1 pr-4 z-10">
            <View className="flex-row items-center mb-1">
              <Sparkles size={14} color="#CAFC05" />
              <Text className="text-[#CAFC05] text-[9px] font-bold uppercase tracking-widest ml-1.5 font-body">AI CLIPS AVAILABLE</Text>
            </View>
            <Text className="text-[#FFFFFF] text-sm font-bold uppercase tracking-tight font-heading">
              New Highlights Ready!
            </Text>
            <Text className="text-gray-400 text-[10px] mt-1 font-body">
              Your match yesterday has 2 generated highlight reels.
            </Text>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.8}
            className="bg-success px-4 py-2.5 rounded-2xl shadow-md shadow-success/20 z-10"
          >
            <Text className="text-[#FFFFFF] text-[9px] font-bold uppercase tracking-widest font-body">VIEW NOW</Text>
          </TouchableOpacity>
        </View>

        {/* Highlight Grid / List */}
        <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest mb-4 font-body">My Highlight Reels</Text>

        {HIGHLIGHTS.length === 0 ? (
          <View className="py-20 items-center justify-center">
            <Play size={48} color="#444" />
            <Text className="text-gray-500 mt-4 text-sm font-body">Post-game action clips will appear here.</Text>
          </View>
        ) : (
          HIGHLIGHTS.map(clip => (
            <View key={clip.id} className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-6">
              {/* Thumbnail Container */}
              <View className="h-48 w-full bg-white/10 relative">
                <Image source={{ uri: clip.thumbnail }} className="w-full h-full" resizeMode="cover" />
                
                {/* Floating overlays */}
                <View className="absolute inset-0 items-center justify-center bg-black/30">
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    className="w-14 h-14 bg-success rounded-full items-center justify-center shadow-lg shadow-success/25"
                  >
                    <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
                  </TouchableOpacity>
                </View>

                {/* Duration Badge */}
                <View className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded-md">
                  <Text className="text-[#FFFFFF] text-[10px] font-bold font-mono">{clip.duration}</Text>
                </View>
              </View>

              {/* Title & Metadata */}
              <View className="p-4">
                <Text className="text-[#FFFFFF] text-sm font-bold uppercase tracking-tight font-body">
                  {clip.title}
                </Text>
                <Text className="text-gray-500 text-[10px] uppercase font-bold mt-1 tracking-wider font-body">
                  {clip.match}
                </Text>

                {/* Engagement row */}
                <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-white/5">
                  <View className="flex-row items-center">
                    {/* Likes */}
                    <View className="flex-row items-center mr-4">
                      <Heart size={14} color="#D85A30" fill="#D85A30" />
                      <Text className="text-gray-400 text-[10px] font-bold ml-1 font-body">{clip.likes}</Text>
                    </View>
                    {/* Comments */}
                    <View className="flex-row items-center">
                      <MessageSquare size={14} color="#888" />
                      <Text className="text-gray-400 text-[10px] font-bold ml-1 font-body">{clip.comments}</Text>
                    </View>
                  </View>

                  <TouchableOpacity className="flex-row items-center bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                    <Share2 size={11} color="#1DAA4B" />
                    <Text className="text-success text-[9px] font-bold uppercase ml-1.5 tracking-wider font-body">SHARE REEL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
