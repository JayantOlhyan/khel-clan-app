import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { 
  ChevronLeft, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Clock, 
  Video, 
  AlertOctagon,
  Users,
  Award,
  Smartphone,
  PhoneCall
} from 'lucide-react-native';

interface HandbookSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  iconColor: string;
  bgColor: string;
  borderColor: string;
  rules: { title: string; desc: string }[];
}

export default function HostHandbookScreen() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>('conduct');

  const handbookData: HandbookSection[] = [
    {
      id: 'conduct',
      title: 'Code of Conduct',
      description: 'Host behavior standards, professional representation, and player hospitality rules.',
      icon: Users,
      iconColor: '#1D9E75', // success green
      bgColor: 'rgba(29, 158, 117, 0.1)',
      borderColor: 'rgba(29, 158, 117, 0.2)',
      rules: [
        { title: 'Inclusivity First', desc: 'Welcome all players regardless of skill level. Maintain an encouraging and friendly environment.' },
        { title: 'KhelClan Representation', desc: 'Wear official KhelClan merchandise. Present yourself professionally as the match commissioner.' },
        { title: 'Fair Play Enforcement', desc: 'Actively resolve arguments. Encourage respect between opposing teams and stop toxic behaviour immediately.' }
      ]
    },
    {
      id: 'match',
      title: 'Match Execution SLA',
      description: 'Step-by-step duties for match setups, player check-in, and turf rules.',
      icon: Clock,
      iconColor: '#D4860A', // gold
      bgColor: 'rgba(212, 134, 10, 0.1)',
      borderColor: 'rgba(212, 134, 10, 0.2)',
      rules: [
        { title: '15-Minute Rule', desc: 'Arrive at the turf exactly 15 minutes before the match starts to prepare BIBs, cones, and balls.' },
        { title: 'QR Code Verification', desc: 'Check in every player by scanning their digital match pass QR code on their ticket before they enter the turf.' },
        { title: 'Equipment Management', desc: 'Count and hand out BIBs. Ensure all gear is gathered and accounted for after the match finishes.' }
      ]
    },
    {
      id: 'footage',
      title: 'Footage Delivery SLA',
      description: 'Requirements for recording matches, trimming dead time, and uploading files.',
      icon: Video,
      iconColor: '#D85A30', // error orange
      bgColor: 'rgba(216, 90, 48, 0.1)',
      borderColor: 'rgba(216, 90, 48, 0.2)',
      rules: [
        { title: 'High Definition Video', desc: 'Record in 720p minimum, 30FPS or higher. Use steady horizontal landscape mode.' },
        { title: 'Optimal Camera Angles', desc: 'Position the tripod at a high-angle, center-court position to capture maximum action.' },
        { title: 'Trim Dead Times', desc: 'Crop long pauses, arguments, and breaks. Deliver high-action clips only.' },
        { title: '24-Hour Upload Deadline', desc: 'Upload raw match footage within 24 hours of match completion to ensure player highlight reels are ready on time.' }
      ]
    },
    {
      id: 'disputes',
      title: 'Disputes & Emergencies',
      description: 'Handling turf conflicts, medical emergencies, weather delays, and booking issues.',
      icon: AlertOctagon,
      iconColor: '#D83030', // red
      bgColor: 'rgba(216, 48, 48, 0.1)',
      borderColor: 'rgba(216, 48, 48, 0.2)',
      rules: [
        { title: 'First Aid Protocol', desc: 'Always keep the KhelClan first-aid kit close. Administer ice packs and bandages for minor sprains immediately.' },
        { title: 'Severe Weather Delays', desc: 'If heavy rain or lightning makes the turf unsafe, pause play and contact KhelClan Ops for slot rescheduling.' },
        { title: 'Slot Double Bookings', desc: 'If the turf venue disputes KhelClan booking rights, present the digital booking voucher or call Venue Hotline.' }
      ]
    }
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View className="px-5 pt-2 pb-4 border-b border-white/5 flex-row justify-between items-center bg-[#0A0A0A]">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/5 items-center justify-center border border-white/10"
        >
          <ChevronLeft color="#FFFFFF" size={20} strokeWidth={2.5} />
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          <BookOpen color="#D4860A" size={16} className="mr-2" />
          <Text className="text-[#FFFFFF] font-heading font-black tracking-tight text-base uppercase">
            Host Handbook
          </Text>
        </View>
        
        <View className="w-10 h-10" /> {/* Spacer */}
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Intro */}
        <View className="my-6">
          <Text className="text-gray-400 text-sm font-body leading-6">
            As a KhelClan Match Host, you represent our brand on the ground. Use this handbook to ensure top-tier player satisfaction and smooth match execution.
          </Text>
        </View>

        {/* Sections */}
        <View className="gap-4">
          {handbookData.map((section) => {
            const isExpanded = expandedSection === section.id;
            const Icon = section.icon;

            return (
              <View 
                key={section.id} 
                style={{ borderColor: section.borderColor }}
                className="bg-white/5 border rounded-3xl overflow-hidden"
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleSection(section.id)}
                  className="p-5 flex-row justify-between items-center"
                >
                  <View className="flex-row items-center flex-1 pr-4">
                    <View 
                      style={{ backgroundColor: section.bgColor, borderColor: section.borderColor }}
                      className="p-3 rounded-2xl border mr-4"
                    >
                      <Icon size={20} color={section.iconColor} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-[#FFFFFF] text-base font-bold uppercase tracking-wide font-heading">
                        {section.title}
                      </Text>
                      <Text className="text-gray-500 text-xs mt-1.5 font-body" numberOfLines={2}>
                        {section.description}
                      </Text>
                    </View>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={16} color="#888" />
                  ) : (
                    <ChevronDown size={16} color="#888" />
                  )}
                </TouchableOpacity>

                {isExpanded && (
                  <View className="px-5 pb-5 border-t border-white/5 pt-4 bg-[#121212]/30">
                    <View className="gap-4">
                      {section.rules.map((rule, idx) => (
                        <View key={idx} className="flex-row items-start">
                          <View className="bg-white/10 px-2 py-0.5 rounded-md mt-0.5 mr-3">
                            <Text className="text-gray-400 text-xs font-mono font-bold">
                              {(idx + 1).toString().padStart(2, '0')}
                            </Text>
                          </View>
                          <View className="flex-1">
                            <Text className="text-gray-200 text-sm font-bold font-body">
                              {rule.title}
                            </Text>
                            <Text className="text-gray-500 text-xs mt-1.5 font-body leading-5">
                              {rule.desc}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Resources Panel */}
        <Text className="text-gray-400 text-xs uppercase font-bold tracking-widest mt-8 mb-2.5 font-body">Quick Resources</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-5 gap-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <PhoneCall size={14} color="#1D9E75" />
              <Text className="text-gray-300 text-sm font-semibold uppercase tracking-wide ml-3 font-body">On-field Ops Hotline</Text>
            </View>
            <Text className="text-success text-sm font-bold font-mono">+91 9999 88888</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Award size={14} color="#D4860A" />
              <Text className="text-gray-300 text-sm font-semibold uppercase tracking-wide ml-3 font-body">Host Commissions SLA</Text>
            </View>
            <Text className="text-gold text-sm font-bold font-mono">₹400 / match</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
