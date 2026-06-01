import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  ArrowUpRight, 
  Activity, 
  MapPin, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  PlusCircle, 
  Sparkles, 
  ShieldCheck,
  Video,
  DollarSign
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CoordOverviewScreen() {
  const router = useRouter();

  // Mock data for recent matches
  const RECENT_GAMES = [
    {
      id: 'rg1',
      title: '7v7 Football Match',
      location: 'Rohini Sector 8, Delhi',
      date: 'Yesterday, 29 May',
      earnings: 750,
      status: 'VERIFIED',
    },
    {
      id: 'rg2',
      title: 'Pickleball Doubles Camp',
      location: 'Azure Courts, GK-2',
      date: '28 May 2026',
      earnings: 1050,
      status: 'VERIFIED',
    },
    {
      id: 'rg3',
      title: '5v5 Evening Football',
      location: 'Janakpuri Sports Complex',
      date: '25 May 2026',
      earnings: 1200,
      status: 'VERIFIED',
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      {/* Top Premium Sticky Header Banner */}
      <View className="px-5 pt-3 pb-4 border-b border-white/5 flex-row justify-between items-center bg-[#0A0A0A]">
        <View>
          <Text className="text-gold/80 text-[10px] uppercase font-bold tracking-widest font-body">KhelClan Crew</Text>
          <View className="flex-row items-center mt-0.5">
            <Text className="text-[#FFFFFF] text-xl font-bold tracking-tight uppercase font-heading">
              Host Dashboard
            </Text>
            <View className="ml-2 bg-success/20 px-2 py-0.5 rounded-full border border-success/30 flex-row items-center">
              <View className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] mr-1 animate-pulse" />
              <Text className="text-[#1D9E75] text-[8px] font-bold tracking-widest uppercase font-body">ACTIVE</Text>
            </View>
          </View>
        </View>
        
        {/* Elite Badge */}
        <View className="flex-row items-center bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <Award size={13} color="#D4860A" />
          <Text className="text-[#FFFFFF] text-[10px] ml-1.5 font-bold tracking-wider font-body">ELITE HOST</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Welcome Section */}
        <View className="mt-5 mb-6">
          <View className="flex-row items-center">
            <Text className="text-gray-400 text-sm font-body">Welcome back, </Text>
            <Text className="text-[#FFFFFF] text-sm font-bold font-body">John Doe 👋</Text>
          </View>
          <Text className="text-gray-500 text-xs mt-1 font-body">Here is your host status and pending activities for today.</Text>
        </View>

        {/* High-Fidelity Performance Metrics Section */}
        <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest mb-3 font-body">Performance Metrics</Text>
        
        <View className="flex-row gap-4 mb-6">
          {/* Games Hosted Card */}
          <View className="flex-1 bg-white/5 p-4 rounded-3xl border border-white/10 relative overflow-hidden">
            <View className="absolute -right-4 -bottom-4 opacity-10">
              <Activity size={80} color="#FFFFFF" />
            </View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-wider font-body">Games Run</Text>
              <View className="bg-primary/20 p-1.5 rounded-lg border border-primary/30">
                <Activity size={12} color="#1DAA4B" />
              </View>
            </View>
            <Text className="text-[#FFFFFF] text-3xl font-bold tracking-tighter mt-1 font-heading">12</Text>
            <Text className="text-success text-[9px] font-bold uppercase mt-2 tracking-wide font-body">
              100% SLA MET
            </Text>
          </View>

          {/* Monthly Earnings Card */}
          <TouchableOpacity 
            activeOpacity={0.9}
            className="flex-1 rounded-3xl relative overflow-hidden border border-gold/30"
          >
            <LinearGradient
              colors={['rgba(212, 134, 10, 0.15)', 'rgba(0,0,0,0)']}
              style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <View className="absolute -right-4 -bottom-4 opacity-10">
              <DollarSign size={80} color="#D4860A" />
            </View>
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gold/90 text-[10px] uppercase font-bold tracking-wider font-body">Earnings</Text>
                <View className="bg-gold/20 p-1.5 rounded-lg border border-gold/30">
                  <ArrowUpRight size={12} color="#D4860A" />
                </View>
              </View>
              <Text className="text-gold text-3xl font-bold tracking-tighter mt-1 font-heading">₹3,000</Text>
              <Text className="text-gray-400 text-[9px] mt-2 tracking-wide uppercase font-semibold font-body">
                +₹1,200 This Week
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quality Rating Mini-Banner */}
        <View className="bg-white/5 border border-white/10 rounded-2xl p-3.5 mb-8 flex-row justify-between items-center">
          <View className="flex-row items-center flex-1 pr-3">
            <Sparkles size={16} color="#D4860A" />
            <View className="ml-3 flex-1">
              <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-wider font-body">Highly Rated Host</Text>
              <Text className="text-gray-500 text-[10px] mt-0.5 font-body" numberOfLines={1}>Your players love your hospitality and punctuality!</Text>
            </View>
          </View>
          <View className="flex-row items-center bg-gold/15 border border-gold/20 px-2 py-1 rounded-xl">
            <Text className="text-gold text-xs font-bold font-body">4.9</Text>
            <Text className="text-gold text-[10px] ml-0.5 font-body">★</Text>
          </View>
        </View>

        {/* PENDING ACTIONS (Urgently Actionable Alert) */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest font-body">Urgent Action Required</Text>
            <View className="bg-error/20 px-2.5 py-0.5 rounded-full border border-error/30 flex-row items-center font-body">
              <AlertCircle size={10} color="#D85A30" />
              <Text className="text-error text-[8px] font-bold uppercase tracking-widest ml-1 font-mono">1 ALERT</Text>
            </View>
          </View>

          {/* Elevated Alert Card with countdown ticker */}
          <TouchableOpacity 
            activeOpacity={0.95}
            onPress={() => router.push('/(coordinator)/upload')}
            className="rounded-3xl border border-error/35 overflow-hidden"
          >
            <LinearGradient
              colors={['rgba(216, 90, 48, 0.15)', 'rgba(0,0,0,0.85)']}
              className="p-5"
            >
              <View className="flex-row justify-between items-center mb-3">
                <View className="bg-error/20 border border-error/30 px-2.5 py-0.5 rounded-full flex-row items-center">
                  <Video size={10} color="#D85A30" />
                  <Text className="text-error text-[9px] font-bold uppercase tracking-widest ml-1 font-body">CONTENT UPLOAD</Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={12} color="#D85A30" />
                  <Text className="text-error text-[10px] font-bold font-mono uppercase ml-1 tracking-widest">58m LEFT</Text>
                </View>
              </View>

              <Text className="text-[#FFFFFF] uppercase tracking-tight text-lg font-bold mb-2 font-heading">
                5v5 Football Dwarka
              </Text>

              <View className="flex-row items-center mb-4 opacity-80">
                <MapPin size={12} color="#888" />
                <Text className="text-gray-400 text-xs ml-1.5 font-body" numberOfLines={1}>
                  Dwarka Sector 12 Turf • Delhi NCR
                </Text>
              </View>

              {/* Progress bar representing time left */}
              <View className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-5">
                <View className="h-full bg-error rounded-full w-[85%]" />
              </View>

              <View className="flex-row justify-between items-center bg-white/5 px-4 py-3 rounded-2xl border border-white/5">
                <View>
                  <Text className="text-gray-400 text-[9px] uppercase tracking-wider font-body">Estimated Payout</Text>
                  <Text className="text-[#FFFFFF] text-sm font-bold mt-0.5 font-body">₹900.00</Text>
                </View>
                <View className="bg-error px-4 py-2 rounded-xl flex-row items-center shadow-lg shadow-error/20">
                  <Text className="text-[#FFFFFF] text-[10px] font-bold uppercase tracking-widest font-body">UPLOAD CLIPS</Text>
                  <ChevronRight size={10} color="#FFFFFF" className="ml-1" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* RECENT MATCHES & PAYOUTS SECTION */}
        <View className="mb-4">
          <View className="flex-row justify-between items-end mb-4">
            <View>
              <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest font-body">Recent Activities</Text>
              <Text className="text-gray-500 text-[10px] mt-0.5 font-body">Your recently successfully managed matches</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(coordinator)/games')}>
              <Text className="text-gold font-bold text-xs uppercase tracking-widest font-body">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Render List of Recent Activities */}
          {RECENT_GAMES.map((game, idx) => (
            <View 
              key={game.id}
              className="bg-white/5 p-4 rounded-2xl border border-white/10 flex-row justify-between items-center mb-3"
            >
              <View className="flex-1 pr-3">
                <View className="flex-row items-center mb-1">
                  <Text className="text-[#FFFFFF] text-sm font-bold uppercase tracking-tight font-body" numberOfLines={1}>
                    {game.title}
                  </Text>
                </View>
                <View className="flex-row items-center opacity-70">
                  <MapPin size={10} color="#888" />
                  <Text className="text-gray-400 text-[10px] ml-1 font-body" numberOfLines={1}>
                    {game.location}
                  </Text>
                </View>
                <Text className="text-gray-500 text-[9px] mt-1.5 uppercase font-medium font-body">
                  {game.date}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-[#FFFFFF] text-sm font-bold font-body">
                  +₹{game.earnings}
                </Text>
                <View className="bg-success/20 px-2 py-0.5 rounded-md border border-success/30 flex-row items-center mt-2">
                  <ShieldCheck size={8} color="#1D9E75" />
                  <Text className="text-[#1D9E75] text-[8px] font-bold uppercase ml-1 tracking-wider font-body">
                    {game.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
