import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Dribbble, 
  Award, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Activity,
  Heart,
  Smartphone
} from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);
  
  const [isInstallable, setIsInstallable] = React.useState(false);

  React.useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const checkInstallability = () => {
      setIsInstallable(!!(window as any).deferredPrompt);
    };

    checkInstallability();

    window.addEventListener('app-installable', checkInstallability);
    window.addEventListener('app-installed', checkInstallability);

    return () => {
      window.removeEventListener('app-installable', checkInstallability);
      window.removeEventListener('app-installed', checkInstallability);
    };
  }, []);

  const handleInstall = async () => {
    const promptEvent = (window as any).deferredPrompt;
    if (!promptEvent) return;
    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    (window as any).deferredPrompt = null;
    setIsInstallable(false);
  };

  const logout = () => {
    setUser(null);
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header */}
        <View className="pt-3 pb-5 border-b border-white/5 mb-6">
          <Text className="text-success text-[10px] uppercase font-bold tracking-widest font-body">Athlete Profile</Text>
          <Text className="text-[#FFFFFF] text-xl font-bold tracking-tight uppercase mt-0.5 font-heading">
            My Profile
          </Text>
        </View>

        {/* Profile Card Summary */}
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6 flex-row items-center">
          <View className="w-16 h-16 rounded-full bg-success/15 border border-success/30 items-center justify-center relative">
            <User size={30} color="#1D9E75" />
            <View className="absolute bottom-0 right-0 bg-[#1D9E75] w-5 h-5 rounded-full border-2 border-[#0A0A0A] items-center justify-center">
              <ShieldCheck size={10} color="#FFFFFF" />
            </View>
          </View>
          
          <View className="ml-4 flex-1">
            <Text className="text-[#FFFFFF] text-base font-bold uppercase tracking-tight font-body">Jack</Text>
            <View className="flex-row items-center mt-1 bg-success/15 border border-success/20 px-2.5 py-0.5 rounded-full self-start">
              <Activity size={9} color="#1D9E75" />
              <Text className="text-[#1D9E75] text-[8px] font-bold uppercase tracking-wider ml-1 font-body">MEMBER ID: #KC0122</Text>
            </View>
          </View>
        </View>

        {/* Hub Details Section */}
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">Player Stats</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-6 gap-4">
          <View className="flex-row items-center">
            <MapPin size={14} color="#1D9E75" />
            <View className="ml-3">
              <Text className="text-gray-500 text-[9px] uppercase tracking-wider font-body">Preferred Hub</Text>
              <Text className="text-gray-200 text-xs font-bold mt-0.5 font-body">Delhi NCR, India</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Heart size={14} color="#1D9E75" />
            <View className="ml-3">
              <Text className="text-gray-500 text-[9px] uppercase tracking-wider font-body">Favorite Sports</Text>
              <Text className="text-gray-200 text-xs font-bold mt-0.5 font-body">Pickleball, Football</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <Award size={14} color="#1D9E75" />
            <View className="ml-3">
              <Text className="text-gray-500 text-[9px] uppercase tracking-wider font-body">Skill Level</Text>
              <Text className="text-gray-200 text-xs font-bold mt-0.5 font-body">Pro Athlete Partner</Text>
            </View>
          </View>
        </View>

        {/* Analytics Section */}
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">Performance Records</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-8 gap-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Award size={14} color="#CAFC05" />
              <Text className="text-gray-300 text-xs font-semibold uppercase tracking-wide ml-3 font-body">Matches Played</Text>
            </View>
            <Text className="text-[#CAFC05] text-xs font-bold font-mono">24 Games</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Clock size={14} color="#CAFC05" />
              <Text className="text-gray-300 text-xs font-semibold uppercase tracking-wide ml-3 font-body">Avg Playtime / Wk</Text>
            </View>
            <Text className="text-[#CAFC05] text-xs font-bold font-mono">4.5 Hrs</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <TrendingUp size={14} color="#CAFC05" />
              <Text className="text-gray-300 text-xs font-semibold uppercase tracking-wide ml-3 font-body">Generated Reels</Text>
            </View>
            <Text className="text-[#CAFC05] text-xs font-bold font-mono">8 Clips</Text>
          </View>
        </View>

        {/* Resources & Handbooks */}
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">Account Guidelines</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-2.5 mb-8">
          <TouchableOpacity className="flex-row items-center justify-between p-3.5 border-b border-white/5">
            <View className="flex-row items-center">
              <BookOpen size={16} color="#1D9E75" />
              <Text className="text-gray-200 text-xs uppercase tracking-wider ml-3.5 font-body">Player Rulebook</Text>
            </View>
            <ChevronRight size={14} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-3.5">
            <View className="flex-row items-center">
              <HelpCircle size={16} color="#1D9E75" />
              <Text className="text-gray-200 text-xs uppercase tracking-wider ml-3.5 font-body">Help & Support Hub</Text>
            </View>
            <ChevronRight size={14} color="#555" />
          </TouchableOpacity>
        </View>

        {/* PWA Install Trigger */}
        {isInstallable && (
          <>
            <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-2.5 font-body">Application</Text>
            <View className="bg-white/5 border border-white/10 rounded-3xl p-2.5 mb-8">
              <TouchableOpacity onPress={handleInstall} className="flex-row items-center justify-between p-3.5">
                <View className="flex-row items-center">
                  <Smartphone size={16} color="#CAFC05" />
                  <Text className="text-gray-200 text-xs uppercase tracking-wider ml-3.5 font-body">Install KhelClan App</Text>
                </View>
                <ChevronRight size={14} color="#555" />
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Logout Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={logout}
          className="border border-error/40 bg-error/10 rounded-2xl py-4 items-center justify-center flex-row mb-6"
        >
          <LogOut size={16} color="#D85A30" />
          <Text className="text-error text-xs uppercase tracking-widest ml-2.5 font-body">Logout Session</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
