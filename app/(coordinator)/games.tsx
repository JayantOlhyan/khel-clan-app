import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Users
} from 'lucide-react-native';

export default function CoordGamesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const ACTIVE_GAMES = [
    {
      id: 'ag1',
      sport: 'Football',
      title: '5v5 Weekend Match',
      turf: 'Dwarka Sector 12 Turf',
      location: 'Dwarka Sector 12, Delhi',
      date: 'Today, 30 May',
      time: '07:30 AM',
      slots: '10/10 Filled',
      payout: 900,
      slaText: 'Upload clips within 58 mins',
      slaUrgent: true,
    },
    {
      id: 'ag2',
      sport: 'Pickleball',
      title: 'Singles Open Championship',
      turf: 'Azure Courts',
      location: 'GK-2, Delhi NCR',
      date: 'Sunday, 31 May',
      time: '06:00 PM',
      slots: '6/8 Booked',
      payout: 850,
      slaText: 'Scheduled',
      slaUrgent: false,
    }
  ];

  const COMPLETED_GAMES = [
    {
      id: 'cg1',
      title: '7v7 Football Match',
      turf: 'Rohini Sector 8 Turf',
      location: 'Rohini, Delhi',
      date: 'Yesterday, 29 May',
      earnings: 750,
      players: '14 Players',
    },
    {
      id: 'cg2',
      title: 'Pickleball Doubles Camp',
      turf: 'Azure Courts',
      location: 'GK-2, Delhi NCR',
      date: '28 May 2026',
      earnings: 1050,
      players: '12 Players',
    },
    {
      id: 'cg3',
      title: '5v5 Evening Football',
      turf: 'Janakpuri Sports Complex',
      location: 'Janakpuri, Delhi',
      date: '25 May 2026',
      earnings: 1200,
      players: '10 Players',
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      {/* Header */}
      <View className="px-5 pt-3 pb-4 border-b border-white/5 flex-row justify-between items-center bg-[#0A0A0A]">
        <View>
          <Text className="text-gold/80 text-[10px] uppercase font-bold tracking-widest font-body">KhelClan Host</Text>
          <Text className="text-[#FFFFFF] text-xl font-bold tracking-tight uppercase mt-0.5 font-heading">
            My Management
          </Text>
        </View>

        <TouchableOpacity 
          activeOpacity={0.8}
          className="bg-gold px-3.5 py-2 rounded-full flex-row items-center shadow-lg shadow-gold/25"
        >
          <Plus size={14} color="#000000" strokeWidth={3} />
          <Text className="text-black text-[10px] font-black uppercase tracking-wider ml-1 font-body">NEW GAME</Text>
        </TouchableOpacity>
      </View>

      {/* Segmented Control Tabs */}
      <View className="flex-row mx-5 mt-5 p-1 bg-white/5 rounded-2xl border border-white/10">
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => setActiveTab('active')}
          className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'active' ? 'bg-gold' : ''}`}
        >
          <Text className={`text-xs uppercase tracking-wider font-body ${activeTab === 'active' ? 'text-black font-black font-bold' : 'text-gray-400'}`}>
            Active ({ACTIVE_GAMES.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => setActiveTab('completed')}
          className={`flex-1 py-3 rounded-xl items-center ${activeTab === 'completed' ? 'bg-gold' : ''}`}
        >
          <Text className={`text-xs uppercase tracking-wider font-body ${activeTab === 'completed' ? 'text-black font-black font-bold' : 'text-gray-400'}`}>
            Completed ({COMPLETED_GAMES.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 mt-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Render Active tab content */}
        {activeTab === 'active' && ACTIVE_GAMES.map(game => (
          <View key={game.id} className="bg-white/5 rounded-3xl border border-white/10 mb-4 overflow-hidden">
            {/* Top row with sport label and payout */}
            <View className="p-5 pb-3 flex-row justify-between items-center border-b border-white/5">
              <View className="bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                <Text className="text-gold text-[9px] font-bold uppercase tracking-widest font-body">{game.sport}</Text>
              </View>
              <Text className="text-[#FFFFFF] text-sm font-bold font-body">
                Est. Payout: ₹{game.payout}
              </Text>
            </View>

            {/* Core Info */}
            <View className="p-5">
              <Text className="text-[#FFFFFF] uppercase tracking-tight text-base font-bold mb-3 font-heading">
                {game.title}
              </Text>

              <View className="flex-row items-center mb-2 opacity-80">
                <MapPin size={12} color="#D4860A" />
                <Text className="text-gray-400 text-xs ml-2 font-body">{game.turf}</Text>
              </View>

              <View className="flex-row items-center mb-3">
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

              {/* Action Required SLA Block */}
              {game.slaUrgent ? (
                <TouchableOpacity 
                  activeOpacity={0.9}
                  onPress={() => router.push('/(coordinator)/upload')}
                  className="bg-error/10 border border-error/35 p-3.5 rounded-2xl flex-row justify-between items-center mt-3"
                >
                  <View className="flex-row items-center flex-1 mr-2">
                    <AlertCircle size={14} color="#D85A30" />
                    <View className="ml-2.5 flex-1">
                      <Text className="text-error text-[10px] font-bold uppercase tracking-wider font-body">Clip Upload Overdue</Text>
                      <Text className="text-gray-400 text-[9px] mt-0.5 font-body" numberOfLines={1}>{game.slaText}</Text>
                    </View>
                  </View>
                  <View className="bg-error px-3 py-1.5 rounded-xl flex-row items-center">
                    <Video size={10} color="#FFFFFF" />
                    <Text className="text-[#FFFFFF] text-[9px] font-bold uppercase tracking-widest ml-1 font-body">UPLOAD</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View className="bg-white/5 border border-white/5 p-3.5 rounded-2xl flex-row items-center mt-3">
                  <CheckCircle2 size={14} color="#1D9E75" />
                  <Text className="text-success text-[10px] font-bold uppercase tracking-wider ml-2.5 font-body">
                    Match Scheduled • Ready for Action
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* Render Completed tab content */}
        {activeTab === 'completed' && COMPLETED_GAMES.map(game => (
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
                  {game.players}
                </Text>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-[#FFFFFF] text-sm font-bold font-body">
                +₹{game.earnings}
              </Text>
              
              <View className="bg-success/20 px-2 py-0.5 rounded-md border border-success/30 flex-row items-center mt-2.5">
                <ShieldCheck size={8} color="#1D9E75" />
                <Text className="text-[#1D9E75] text-[8px] font-bold uppercase ml-1 tracking-wider font-body">
                  VERIFIED
                </Text>
              </View>
            </View>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}
