import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ChevronLeft, ChevronRight, Star, MapPin, Calendar, Clock, Phone, MessageSquare, AlertTriangle, ShieldCheck, Check, X } from 'lucide-react-native';

export default function TicketDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Extraction of pass data with fallbacks
  const ticketId = (Array.isArray(params.id) ? params.id[0] : params.id) || 'up1';
  const title = params.title || '5v5 Weekend Kickoff';
  const hostName = params.host || 'Rahul (4.8 ★)';
  const turf = params.turf || 'Dribblers Turf';
  const location = params.location || 'Dwarka Sector 12, Delhi';
  const date = params.date || 'Tomorrow, 31 May';
  const time = params.time || '08:30 AM';

  // State controls
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Cancellation timelines details with premium dark mode colors
  const timelines = {
    early: { label: '12+ Hrs Before Kick-off', refund: '100%', payout: '₹230 Refunded', desc: 'Full refund to original payment source.', color: '#1D9E75', bgColor: 'rgba(29, 158, 117, 0.15)', borderColor: 'rgba(29, 158, 117, 0.3)' },
    mid: { label: '6+ Hrs Before Kick-off', refund: '80%', payout: '₹184 Refunded', desc: '80% refund to original payment source.', color: '#D4860A', bgColor: 'rgba(212, 134, 10, 0.15)', borderColor: 'rgba(212, 134, 10, 0.3)' },
    late: { label: '30 Mins Before Kick-off', refund: '50%', payout: '₹115 Refunded', desc: '50% refund to original payment source.', color: '#D85A30', bgColor: 'rgba(216, 90, 48, 0.15)', borderColor: 'rgba(216, 90, 48, 0.3)' },
    none: { label: 'Under 30 Mins / Kick-off', refund: '0%', payout: '₹0 Refunded', desc: 'No refund. Late cancellation window is closed.', color: '#888888', bgColor: 'rgba(136, 136, 136, 0.1)', borderColor: 'rgba(136, 136, 136, 0.2)' },
  };

  // Get raw kickoff time and parse calculations
  const getCalculationDetails = React.useMemo(() => {
    const now = new Date();
    // Default fallback: kickoff is tomorrow at 8:30 AM
    let kickoffDateObj = new Date(now.getTime() + 16 * 60 * 60 * 1000); 
    if (params.kickoffTime) {
      kickoffDateObj = new Date(params.kickoffTime as string);
    }
    
    const diffMs = kickoffDateObj.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    let activeKey: 'early' | 'mid' | 'late' | 'none' = 'early';
    if (diffHours >= 12) {
      activeKey = 'early';
    } else if (diffHours >= 6) {
      activeKey = 'mid';
    } else if (diffHours >= 0.5) {
      activeKey = 'late';
    } else {
      activeKey = 'none';
    }

    // Format remaining time nicely
    let timeRemainingText = '';
    if (diffMs < 0) {
      timeRemainingText = 'Started';
    } else {
      const h = Math.floor(diffHours);
      const m = Math.floor((diffHours - h) * 60);
      if (h > 0) {
        timeRemainingText = `${h}h ${m}m left`;
      } else {
        timeRemainingText = `${m}m left`;
      }
    }

    return {
      kickoffDateObj,
      diffHours,
      activeKey,
      timeRemainingText,
      now
    };
  }, [params.kickoffTime]);

  const { activeKey, timeRemainingText, kickoffDateObj, now } = getCalculationDetails;

  const handleCancelAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCancelSuccess(true);
      setTimeout(() => {
        setCancelSuccess(false);
        setCancelModalVisible(false);
        // Direct route back to player screen
        router.replace('/(player)/my-games');
      }, 2000);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Floating Header */}
      <View className="px-5 pt-2 pb-4 border-b border-white/5 flex-row justify-between items-center bg-[#0A0A0A]">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/5 items-center justify-center border border-white/10"
        >
          <ChevronLeft color="#FFFFFF" size={20} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text className="text-[#FFFFFF] font-heading font-black tracking-tight text-base uppercase">
          Match Ticket
        </Text>
        <View className="w-10 h-10" /> {/* Spacer */}
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Visual Sport Ticket Layout */}
        <View className="bg-white/5 border border-white/10 rounded-3xl mt-6 relative overflow-hidden shadow-2xl shadow-success/5">
          {/* Decorative Ticket Side Cuts (Classic Tear Off Ticket Style) */}
          <View style={styles.leftCut} />
          <View style={styles.rightCut} />

          {/* Ticket Header */}
          <View className="p-6 border-b border-white/10 border-dashed">
            <View className="bg-success/20 px-3 py-1 rounded-full border border-success/30 self-start mb-4">
              <Text className="text-success text-[9px] font-bold uppercase tracking-widest font-body">MATCH PASS</Text>
            </View>
            <Text className="text-[#FFFFFF] text-2xl font-black tracking-tight font-heading uppercase">{title}</Text>
            <View className="flex-row items-center mt-2">
              <MapPin size={12} color="#1DAA4B" />
              <Text className="text-gray-400 text-xs ml-2 font-body" numberOfLines={1}>{turf} • {location}</Text>
            </View>
          </View>

          {/* Ticket Details */}
          <View className="p-6 border-b border-white/10 border-dashed gap-4">
            <View className="flex-row justify-between">
              <View className="flex-1 pr-2">
                <Text className="text-gray-500 text-[8px] uppercase tracking-widest font-body font-bold">Match Date</Text>
                <View className="flex-row items-center mt-1">
                  <Calendar size={13} color="#D4860A" />
                  <Text className="text-[#FFFFFF] text-xs font-bold font-body ml-2">{date}</Text>
                </View>
              </View>
              <View className="flex-1 pl-2">
                <Text className="text-gray-500 text-[8px] uppercase tracking-widest font-body font-bold">Kick-off Time</Text>
                <View className="flex-row items-center mt-1">
                  <Clock size={13} color="#D4860A" />
                  <Text className="text-[#FFFFFF] text-xs font-bold font-body ml-2">{time}</Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between">
              <View className="flex-1 pr-2">
                <Text className="text-gray-500 text-[8px] uppercase tracking-widest font-body font-bold">Assigned Host</Text>
                <View className="flex-row items-center mt-1">
                  <Star size={13} color="#1DAA4B" fill="#1DAA4B" />
                  <Text className="text-[#FFFFFF] text-xs font-bold font-body ml-2" numberOfLines={1}>{hostName}</Text>
                </View>
              </View>
              <View className="flex-grow-0 flex-row items-center mt-2.5">
                <TouchableOpacity className="bg-white/5 border border-white/10 p-1.5 rounded-lg mr-2">
                  <MessageSquare size={13} color="#D4860A" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white/5 border border-white/10 p-1.5 rounded-lg">
                  <Phone size={13} color="#1DAA4B" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Ticket Join Pass Code & QR */}
          <View className="p-6 items-center">
            <Text className="text-gray-500 text-[9px] uppercase tracking-widest font-body font-bold mb-4">Secure Pass Code</Text>
            
            {/* Visual Custom Mock QR Code */}
            <View className="bg-white p-3 rounded-2xl mb-4 shadow-lg shadow-black/40">
              <View className="w-32 h-32 flex-row flex-wrap justify-between" style={{ gap: 2 }}>
                {Array.from({ length: 64 }).map((_, idx) => {
                  const isBlack = (idx % 2 === 0 && idx % 3 !== 0) || idx % 7 === 0 || (idx > 10 && idx < 20) || idx % 11 === 0 || idx > 50;
                  return (
                    <View 
                      key={idx}
                      style={{
                        width: '11%',
                        aspectRatio: 1,
                        backgroundColor: isBlack ? '#000000' : '#FFFFFF',
                        borderRadius: idx % 13 === 0 ? 2 : 0
                      }}
                    />
                  );
                })}
              </View>
            </View>

            <Text className="text-success text-sm font-bold font-mono tracking-widest uppercase">
              #KC-TICK-{ticketId.toUpperCase()}
            </Text>
            <Text className="text-gray-500 text-[9px] uppercase font-semibold font-body mt-1">
              Present QR to Coordinator at the Turf
            </Text>
          </View>
        </View>

        {/* Cancellation Timelines Section */}
        <View className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-6">
          <View className="flex-row items-center mb-4">
            <AlertTriangle size={16} color="#D85A30" />
            <Text className="text-[#FFFFFF] text-xs font-bold uppercase tracking-widest ml-2.5 font-body">
              Cancellation Timelines
            </Text>
          </View>
          
          <Text className="text-gray-400 text-[11px] leading-4 mb-5 font-body">
            Refund ratios are strictly calculated based on the match kick-off window:
          </Text>

          <View className="gap-3.5">
            {/* 12 Hrs Option */}
            <View className="flex-row items-start pb-3.5 border-b border-white/5">
              <View className="bg-success/15 border border-success/20 p-2 rounded-xl">
                <Text className="text-success text-xs font-bold font-mono">100%</Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[#FFFFFF] text-xs font-bold font-body">12+ Hours Before Match</Text>
                <Text className="text-gray-500 text-[10px] mt-0.5 font-body">Full refund of your total ticket booking value.</Text>
              </View>
            </View>

            {/* 6 Hrs Option */}
            <View className="flex-row items-start pb-3.5 border-b border-white/5">
              <View className="bg-[#D4860A]/15 border border-[#D4860A]/20 p-2 rounded-xl">
                <Text className="text-[#D4860A] text-xs font-bold font-mono">80%</Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[#FFFFFF] text-xs font-bold font-body">6+ Hours Before Match</Text>
                <Text className="text-gray-500 text-[10px] mt-0.5 font-body">80% refund. 20% retained as coordinator SLA slot fee.</Text>
              </View>
            </View>

            {/* 30 Mins Option */}
            <View className="flex-row items-start">
              <View className="bg-error/15 border border-error/20 p-2 rounded-xl">
                <Text className="text-error text-xs font-bold font-mono">50%</Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-[#FFFFFF] text-xs font-bold font-body">30 Mins Before Match</Text>
                <Text className="text-gray-500 text-[10px] mt-0.5 font-body">50% refund. Late cancellations have low slot fulfillment.</Text>
              </View>
            </View>
          </View>

          {/* Action Trigger Button */}
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setCancelModalVisible(true)}
            className="border border-error/40 bg-error/10 rounded-2xl py-3.5 items-center justify-center flex-row mt-6"
          >
            <AlertTriangle size={14} color="#D85A30" />
            <Text className="text-error text-xs font-bold uppercase tracking-widest ml-2 font-body">Cancel Reservation</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Cancellation Interactive Simulation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' }}>
          <View className="bg-[#0A0A0A] rounded-t-[32px] p-6 max-h-[580px] border-t border-white/10">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#FFFFFF] font-bold text-lg font-heading uppercase tracking-tight">Cancel Booking</Text>
              <TouchableOpacity 
                onPress={() => setCancelModalVisible(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 items-center justify-center"
              >
                <X size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {cancelSuccess ? (
              <View className="items-center py-10">
                <View className="bg-success/20 p-4 rounded-full border border-success/30 mb-4">
                  <Check color="#1D9E75" size={40} strokeWidth={3} />
                </View>
                <Text className="text-success font-bold text-base font-heading">Reservation Cancelled!</Text>
                <Text className="text-gray-400 text-xs text-center mt-2 px-6 font-body leading-5">
                  Your cancellation request has been verified. A refund of <Text className="font-bold text-[#FFFFFF]">{timelines[activeKey]?.payout || '₹0'}</Text> has been initiated securely.
                </Text>
              </View>
            ) : (
              <View>
                <Text className="text-gray-400 text-xs font-body mb-4 leading-5">
                  Refund details are calculated automatically based on the current time difference relative to the match kickoff:
                </Text>

                {/* Calculation Info Card */}
                <View className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-gray-500 text-[8px] uppercase font-bold tracking-widest font-body">Current Time</Text>
                    <Text className="text-[#FFFFFF] text-xs font-bold font-body mt-1">
                      {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </Text>
                  </View>
                  <View className="px-2">
                    <ChevronRight size={14} color="#555" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-500 text-[8px] uppercase font-bold tracking-widest font-body">Kick-off Time</Text>
                    <Text className="text-[#FFFFFF] text-xs font-bold font-body mt-1">
                      {kickoffDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </Text>
                  </View>
                  <View className="bg-success/10 border border-success/30 px-3 py-1.5 rounded-xl ml-2">
                    <Text className="text-success text-[10px] font-mono font-bold tracking-wide">{timeRemainingText}</Text>
                  </View>
                </View>

                {/* Auto Calculated Cancellation Timeline Grid */}
                <View className="gap-3 mb-6">
                  {Object.entries(timelines).map(([key, item]) => {
                    const isActive = activeKey === key;
                    return (
                      <View
                        key={key}
                        style={{
                          borderColor: isActive ? item.color : 'rgba(255,255,255,0.05)',
                          backgroundColor: isActive ? item.bgColor : 'rgba(255,255,255,0.02)',
                          borderWidth: isActive ? 2 : 1,
                        }}
                        className="p-4 rounded-2xl flex-row justify-between items-center"
                      >
                        <View className="flex-1 pr-2">
                          <View className="flex-row items-center">
                            <Text 
                              style={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }}
                              className="font-bold text-xs uppercase font-body"
                            >
                              {item.label}
                            </Text>
                            {isActive && (
                              <View 
                                style={{ backgroundColor: item.color }} 
                                className="ml-2 px-1.5 py-0.5 rounded"
                              >
                                <Text className="text-[#0A0A0A] text-[8px] font-extrabold font-body">
                                  ACTIVE
                                </Text>
                              </View>
                            )}
                          </View>
                          <Text 
                            style={{ color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}
                            className="text-[10px] mt-1 font-body"
                          >
                            {item.desc}
                          </Text>
                        </View>
                        <View className="items-end">
                          <Text 
                            style={{ color: isActive ? item.color : 'rgba(255,255,255,0.3)' }}
                            className="font-mono text-sm font-bold"
                          >
                            {item.refund}
                          </Text>
                          <Text 
                            style={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)' }}
                            className="text-[8px] uppercase tracking-wider font-semibold font-body mt-1"
                          >
                            {item.payout}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>

                {/* Confirm Cancel Button */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  disabled={isProcessing || activeKey === 'none'}
                  onPress={handleCancelAction}
                  style={{
                    backgroundColor: activeKey === 'none' ? 'rgba(255, 255, 255, 0.05)' : '#D85A30'
                  }}
                  className="p-4 rounded-full items-center justify-center flex-row shadow-lg shadow-error/20"
                >
                  <Text 
                    style={{
                      color: activeKey === 'none' ? 'rgba(255, 255, 255, 0.3)' : '#FFFFFF'
                    }}
                    className="text-xs font-bold tracking-widest uppercase font-body"
                  >
                    {isProcessing 
                      ? 'PROCESSING...' 
                      : activeKey === 'none'
                        ? 'CANCELLATION BLOCKED'
                        : `CONFIRM CANCEL (${timelines[activeKey]?.refund} REFUND)`
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  leftCut: {
    position: 'absolute',
    left: -12,
    top: 140, // Centered near the dashed divide
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0A0A0A', // matches the background color to create a cut effect
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.1)',
    zIndex: 10
  },
  rightCut: {
    position: 'absolute',
    right: -12,
    top: 140,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0A0A0A',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.1)',
    zIndex: 10
  }
});
