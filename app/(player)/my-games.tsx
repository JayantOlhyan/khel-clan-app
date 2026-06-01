import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Video, 
  ChevronRight, 
  Sparkles,
  Users
} from 'lucide-react-native';

export default function MyGamesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const UPCOMING_ATTENDANCE = [
    {
      id: 'up1',
      sport: 'Football',
      title: '5v5 Weekend Kickoff',
      turf: 'Dribblers Turf',
      location: 'Dwarka Sector 12, Delhi',
      date: 'Tomorrow, 31 May',
      time: '08:30 AM',
      host: 'Rahul (4.8 ★)',
      slots: '7/10 Booked',
      status: 'CONFIRMED'
    }
  ];

  const PAST_PLAY_HISTORY = [
    {
      id: 'ph1',
      title: 'Pickleball Singles Open',
      turf: 'Azure Courts',
      location: 'GK-2, Delhi NCR',
      date: '28 May 2026',
      duration: '1 Hr Match',
      host: 'Amit (4.9 ★)',
      footage: 'Footage Ready'
    },
    {
      id: 'ph2',
      title: '7v7 Football Challenge',
      turf: 'Dribblers Turf',
      location: 'Dwarka Sector 12, Delhi',
      date: '24 May 2026',
      duration: '1.5 Hr Match',
      host: 'Rahul (4.8 ★)',
      footage: 'Footage Ready'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      {/* Header */}
      <View className="px-5 pt-3 pb-5 border-b border-white/5 bg-[#0A0A0A]">
        <Text className="text-success text-[10px] uppercase font-bold tracking-widest font-body">My Clan Activities</Text>
        <Text className="text-[#FFFFFF] text-xl font-bold tracking-tight uppercase mt-0.5 font-heading">
          Attendance
        </Text>
        <Text className="text-gray-500 text-xs mt-1 font-body">Check details and join codes of your match reservations.</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row mx-5 mt-5 p-1 bg-white/5 rounded-2xl border border-white/10">
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => setActiveTab('upcoming')}
          className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'upcoming' ? 'bg-success/20 border border-success/30' : ''}`}
        >
          <Text className={`text-xs uppercase tracking-wider font-body font-bold ${activeTab === 'upcoming' ? 'text-success' : 'text-gray-400'}`}>
            Upcoming ({UPCOMING_ATTENDANCE.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => setActiveTab('past')}
          className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'past' ? 'bg-success/20 border border-success/30' : ''}`}
        >
          <Text className={`text-xs uppercase tracking-wider font-body font-bold ${activeTab === 'past' ? 'text-success' : 'text-gray-400'}`}>
            Past Play ({PAST_PLAY_HISTORY.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 mt-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Render Upcoming Attendance */}
        {activeTab === 'upcoming' && (
          UPCOMING_ATTENDANCE.length === 0 ? (
            <View className="py-20 items-center justify-center">
              <Calendar size={48} color="#444" />
              <Text className="text-gray-400 mt-4 text-sm font-body">No scheduled games found.</Text>
            </View>
          ) : (
            UPCOMING_ATTENDANCE.map(game => (
              <View key={game.id} className="bg-white/5 rounded-3xl border border-white/10 p-5 overflow-hidden">
                {/* Status Ticket Header */}
                <View className="flex-row justify-between items-center mb-4 border-b border-white/5 pb-3">
                  <View className="bg-success/15 px-3 py-1 rounded-full border border-success/20">
                    <Text className="text-success text-[9px] font-bold uppercase tracking-widest font-body">{game.sport}</Text>
                  </View>
                  <View className="bg-success/10 border border-success/25 px-2.5 py-0.5 rounded-full flex-row items-center">
                    <Text className="text-success text-[9px] font-bold uppercase tracking-wider font-body">{game.status}</Text>
                  </View>
                </View>

                {/* Match Title */}
                <Text className="text-[#FFFFFF] uppercase tracking-tight text-base font-bold mb-3 font-heading">
                  {game.title}
                </Text>

                <View className="flex-row items-center mb-2.5 opacity-80">
                  <MapPin size={12} color="#1DAA4B" />
                  <Text className="text-gray-400 text-xs ml-2 font-body">{game.turf} • {game.location}</Text>
                </View>

                {/* Tags Grid */}
                <View className="flex-row items-center mb-4">
                  <View className="flex-row items-center bg-white/5 px-2.5 py-1 rounded-lg mr-3">
                    <Calendar size={11} color="#888" />
                    <Text className="text-[9px] text-gray-400 ml-1.5 uppercase font-semibold font-body">{game.date}</Text>
                  </View>
                  <View className="flex-row items-center bg-white/5 px-2.5 py-1 rounded-lg mr-3">
                    <Clock size={11} color="#888" />
                    <Text className="text-[9px] text-gray-400 ml-1.5 uppercase font-semibold font-body">{game.time}</Text>
                  </View>
                  <View className="flex-row items-center bg-white/5 px-2.5 py-1 rounded-lg">
                    <Users size={11} color="#888" />
                    <Text className="text-[9px] text-gray-400 ml-1.5 uppercase font-semibold font-body">{game.slots}</Text>
                  </View>
                </View>

                {/* Checkin / Ticket code block */}
                <View className="bg-white/5 border border-white/5 p-4 rounded-2xl mt-2 flex-row justify-between items-center">
                  <View>
                    <Text className="text-gray-500 text-[8px] uppercase tracking-wider font-body">Match Host</Text>
                    <Text className="text-gray-300 text-xs font-bold font-body mt-0.5">{game.host}</Text>
                  </View>
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    className="bg-success px-4 py-2 rounded-xl flex-row items-center shadow-lg shadow-success/20"
                  >
                    <Text className="text-[#FFFFFF] text-[10px] font-bold uppercase tracking-widest font-body">VIEW TICKET</Text>
                    <ChevronRight size={10} color="#FFFFFF" className="ml-1" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )
        )}

        {/* Render Past History */}
        {activeTab === 'past' && (
          PAST_PLAY_HISTORY.length === 0 ? (
            <View className="py-20 items-center justify-center">
              <Calendar size={48} color="#444" />
              <Text className="text-gray-400 mt-4 text-sm font-body">No past play history found.</Text>
            </View>
          ) : (
            PAST_PLAY_HISTORY.map(game => (
              <View 
                key={game.id}
                className="bg-white/5 p-4 rounded-3xl border border-white/10 flex-row justify-between items-center mb-3"
              >
                <View className="flex-1 pr-3">
                  <Text className="text-[#FFFFFF] text-sm font-bold uppercase tracking-tight font-body" numberOfLines={1}>
                    {game.title}
                  </Text>
                  
                  <View className="flex-row items-center opacity-70 mt-1">
                    <MapPin size={10} color="#888" />
                    <Text className="text-gray-400 text-[10px] ml-1 font-body" numberOfLines={1}>
                      {game.turf}
                    </Text>
                  </View>
                  
                  <View className="flex-row items-center mt-2.5">
                    <Text className="text-gray-500 text-[9px] uppercase font-semibold font-body">
                      {game.date}
                    </Text>
                    <View className="w-1.5 h-1.5 rounded-full bg-white/10 mx-2" />
                    <Text className="text-gray-500 text-[9px] uppercase font-semibold font-body">
                      {game.duration}
                    </Text>
                  </View>
                </View>

                {/* Highlights Action Badge */}
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => router.push('/(player)/clips')}
                  className="bg-success/15 border border-success/35 rounded-xl px-3 py-2 items-center flex-row"
                >
                  <Video size={12} color="#1D9E75" />
                  <Text className="text-[#1D9E75] text-[9px] font-bold uppercase ml-1.5 tracking-wider font-body">
                    REELS
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
