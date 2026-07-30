import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Award, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Star
} from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';

export default function CoordProfileScreen() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const logout = () => {
    setUser(null);
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View className="pt-3 pb-5 border-b border-white/5 mb-6">
          <Text className="text-gold/80 text-[10px] uppercase font-bold tracking-widest font-body">KhelClan Network</Text>
          <Text className="text-[#FFFFFF] text-xl font-bold tracking-tight uppercase mt-0.5 font-heading">
            Host Profile
          </Text>
        </View>

        {/* Profile Card Summary */}
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6 flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 items-center justify-center relative">
            <User size={30} color="#D4860A" />
            <View className="absolute bottom-0 right-0 bg-[#1D9E75] w-5 h-5 rounded-full border-2 border-[#0A0A0A] items-center justify-center">
              <ShieldCheck size={10} color="#FFFFFF" />
            </View>
          </View>
          
          <View className="ml-4 flex-1">
            <Text className="text-[#FFFFFF] text-base font-bold uppercase tracking-tight font-body">John Doe</Text>
            <View className="flex-row items-center mt-1 bg-success/15 border border-success/20 px-2.5 py-0.5 rounded-full self-start">
              <ShieldCheck size={9} color="#1D9E75" />
              <Text className="text-[#1D9E75] text-[8px] font-bold uppercase tracking-wider ml-1 font-body">VERIFIED CREW</Text>
            </View>
          </View>
        </View>

        {/* Hub Details Section */}
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">Operating Details</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6 gap-4">
          <View className="flex-row items-center">
            <MapPin size={14} color="#D4860A" />
            <View className="ml-3">
              <Text className="text-gray-500 text-[9px] uppercase tracking-wider font-body">Primary Hub</Text>
              <Text className="text-gray-200 text-xs font-bold mt-0.5 font-body">Delhi NCR, India</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Phone size={14} color="#D4860A" />
            <View className="ml-3">
              <Text className="text-gray-500 text-[9px] uppercase tracking-wider font-body">Phone Number</Text>
              <Text className="text-gray-200 text-xs font-bold mt-0.5 font-body">+91 98765 43210</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Star size={14} color="#D4860A" />
            <View className="ml-3">
              <Text className="text-gray-500 text-[9px] uppercase tracking-wider font-body">Host Rating</Text>
              <Text className="text-gray-200 text-xs font-bold mt-0.5 font-body">4.9 ★ (32 matches hosted)</Text>
            </View>
          </View>
        </View>

        {/* Elite Analytics Section */}
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">SLA & Analytics</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8 gap-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Award size={14} color="#1D9E75" />
              <Text className="text-gray-300 text-xs font-semibold uppercase tracking-wide ml-3 font-body">Completion Rate</Text>
            </View>
            <Text className="text-success text-xs font-bold font-mono">100%</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Clock size={14} color="#1D9E75" />
              <Text className="text-gray-300 text-xs font-semibold uppercase tracking-wide ml-3 font-body">Average Clip Upload</Text>
            </View>
            <Text className="text-success text-xs font-bold font-mono">1.2 Hrs</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <TrendingUp size={14} color="#1D9E75" />
              <Text className="text-gray-300 text-xs font-semibold uppercase tracking-wide ml-3 font-body">Payout Frequency</Text>
            </View>
            <Text className="text-success text-xs font-bold font-mono">Instant</Text>
          </View>
        </View>

        {/* Help & Support Items */}
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">Resources</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-2.5 mb-8">
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push('/(coordinator)/handbook')}
            className="flex-row items-center justify-between p-3.5 border-b border-white/5"
          >
            <View className="flex-row items-center">
              <BookOpen size={16} color="#D4860A" />
              <Text className="text-gray-200 text-xs uppercase tracking-wider ml-3.5 font-body">Host Handbook</Text>
            </View>
            <ChevronRight size={14} color="#555" />
          </TouchableOpacity>
 
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => router.push('/(coordinator)/faq')}
            className="flex-row items-center justify-between p-3.5"
          >
            <View className="flex-row items-center">
              <HelpCircle size={16} color="#D4860A" />
              <Text className="text-gray-200 text-xs uppercase tracking-wider ml-3.5 font-body">FAQs & Support</Text>
            </View>
            <ChevronRight size={14} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={logout}
          className="border border-error/40 bg-error/10 rounded-2xl py-4 items-center justify-center flex-row mb-6"
        >
          <LogOut size={16} color="#D85A30" />
          <Text className="text-error text-xs font-bold uppercase tracking-widest ml-2.5 font-body">Logout Session</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
