import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, Modal, ScrollView } from 'react-native';
import { MapPin, Bell, User, ChevronDown, Check, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function HomeHeader() {
  const router = useRouter();
  
  // Location States
  const [locModalVisible, setLocModalVisible] = useState(false);
  const [selectedLoc, setSelectedLoc] = useState('Delhi, NCR');
  const cities = ['Delhi, NCR', 'Gurugram', 'Noida', 'Mumbai', 'Bengaluru', 'Pune'];

  // Notification States
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const [unreadNotif, setUnreadNotif] = useState(true);

  const notifications = [
    { id: 1, title: 'Upcoming Match Alert ⚽', desc: '5v5 Weekend Kickoff starts tomorrow at 8:30 AM.', time: '2h ago' },
    { id: 2, title: 'AI Highlight Reel Ready ⚡', desc: 'New clip from your Tennis doubles game has been generated.', time: '1d ago' },
    { id: 3, title: 'Payment Confirmed ✅', desc: 'Successfully booked Azure Courts for May 31.', time: '2d ago' }
  ];

  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-black">
      {/* Brand / Logo */}
      <View className="flex-row items-center">
        <View style={{ width: 38, height: 38 }} className="bg-white rounded-full items-center justify-center mr-2 shadow-sm">
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={{ width: 32, height: 32 }} 
            className="rounded-full" 
            resizeMode="contain" 
          />
        </View>
        <Text className="text-[#FFFFFF] font-heading font-black tracking-tighter mr-1 text-2xl uppercase">
          KHELCLAN
        </Text>
      </View>

      {/* Location Selector */}
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => setLocModalVisible(true)}
        className="flex-row items-center bg-white/5 px-3 py-2 rounded-full border border-white/10"
      >
        <MapPin size={14} color="#1DAA4B" />
        <Text className="mx-2 text-[#FFFFFF] font-bold text-xs font-body" numberOfLines={1}>
          {selectedLoc}
        </Text>
        <ChevronDown size={14} color="#888" />
      </TouchableOpacity>

      {/* Actions */}
      <View className="flex-row items-center">
        {/* Notification Bell */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => {
            setNotifModalVisible(true);
            setUnreadNotif(false);
          }}
          className="mr-3 relative"
        >
          <Bell size={22} color="#fff" />
          {unreadNotif && (
            <View className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full border border-black" />
          )}
        </TouchableOpacity>

        {/* Profile Link */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.push('/(player)/profile')}
          className="w-8 h-8 rounded-full bg-white/10 items-center justify-center border border-white/20"
        >
          <User size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Location Selector Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={locModalVisible}
        onRequestClose={() => setLocModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 }}>
          <View className="bg-white rounded-[32px] p-6 w-full max-w-sm max-h-[400px]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-black font-bold text-lg font-heading">Select Location</Text>
              <TouchableOpacity onPress={() => setLocModalVisible(false)}>
                <X size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cities.map((city) => {
                const isActive = selectedLoc === city;
                return (
                  <TouchableOpacity
                    key={city}
                    onPress={() => {
                      setSelectedLoc(city);
                      setLocModalVisible(false);
                    }}
                    className={`flex-row justify-between items-center py-4 px-4 rounded-2xl mb-2 ${isActive ? 'bg-success/15' : 'bg-gray-50'}`}
                  >
                    <Text className={`font-body text-sm ${isActive ? 'text-success font-bold' : 'text-gray-700'}`}>{city}</Text>
                    {isActive && <Check size={16} color="#1DAA4B" strokeWidth={3} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notifModalVisible}
        onRequestClose={() => setNotifModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View className="bg-white rounded-t-[32px] p-6 max-h-[500px]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-black font-bold text-lg font-heading">Notifications</Text>
              <TouchableOpacity onPress={() => setNotifModalVisible(false)}>
                <X size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {notifications.map((notif) => (
                <View key={notif.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl mb-3">
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="text-black font-bold text-sm font-body">{notif.title}</Text>
                    <Text className="text-gray-400 text-[10px] font-mono">{notif.time}</Text>
                  </View>
                  <Text className="text-gray-500 text-xs font-body leading-4">{notif.desc}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
}
