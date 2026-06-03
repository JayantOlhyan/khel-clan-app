import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, Modal, ScrollView } from 'react-native';
import { Search, MapPin, Calendar, Clock, Check, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function SearchWidget() {
  const router = useRouter();
  const [activity, setActivity] = useState('');
  const [location, setLocation] = useState('');
  
  // Date Picker States
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Date');
  const datesList = ['Today, May 30', 'Tomorrow, May 31', 'Monday, Jun 1', 'Tuesday, Jun 2', 'Wednesday, Jun 3'];

  // Time Picker States
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('Time');
  const timesList = ['07:30 AM', '10:00 AM', '03:00 PM', '05:00 PM', '07:00 PM'];

  const handleSearch = () => {
    // Navigate to exploration page and pass the search query
    router.push({
      pathname: '/(player)/explore',
      params: { 
        search: activity || location,
        date: selectedDate !== 'Date' ? selectedDate : undefined,
        time: selectedTime !== 'Time' ? selectedTime : undefined
      }
    });
  };

  return (
    <View className="px-4 py-2 mt-2">
      <View className="bg-white rounded-3xl p-6 shadow-2xl">
        {/* Activity Search */}
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl mb-3 border border-gray-100">
          <Search size={20} color="#1DAA4B" />
          <TextInput 
            placeholder="What activity?" 
            placeholderTextColor="#999"
            value={activity}
            onChangeText={setActivity}
            className="ml-3 flex-1 font-body text-black outline-none"
          />
          {activity.length > 0 && (
            <TouchableOpacity onPress={() => setActivity('')}>
              <X size={16} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>

        {/* Location Row */}
        <View className="flex-row items-center bg-gray-50 p-4 rounded-2xl mb-3 border border-gray-100">
          <MapPin size={20} color="#1DAA4B" />
          <TextInput 
            placeholder="Location" 
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
            className="ml-3 flex-1 font-body text-black outline-none"
          />
          {location.length > 0 && (
            <TouchableOpacity onPress={() => setLocation('')}>
              <X size={16} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>

        {/* Date & Time Row */}
        <View className="flex-row gap-x-3 mb-6">
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setDateModalVisible(true)}
            className="flex-1 flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100"
          >
            <Calendar size={18} color="#1DAA4B" />
            <Text className={`ml-3 text-sm font-body ${selectedDate === 'Date' ? 'text-gray-400' : 'text-black font-bold'}`}>
              {selectedDate}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => setTimeModalVisible(true)}
            className="flex-1 flex-row items-center bg-gray-50 p-4 rounded-2xl border border-gray-100"
          >
            <Clock size={14} color="#1DAA4B" />
            <Text className={`ml-3 text-sm font-body ${selectedTime === 'Time' ? 'text-gray-400' : 'text-black font-bold'}`}>
              {selectedTime}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Button */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={handleSearch}
          className="bg-primary p-5 rounded-full items-center shadow-lg shadow-primary/40"
        >
          <Text className="text-[#FFFFFF] tracking-widest uppercase font-bold text-sm font-heading">
            Search Available Slots
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sleek Mock Date Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={dateModalVisible}
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View className="bg-white rounded-t-[32px] p-6 max-h-[400px]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-black font-bold text-lg font-heading">Select Date</Text>
              <TouchableOpacity onPress={() => setDateModalVisible(false)}>
                <X size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {datesList.map((date) => {
                const isActive = selectedDate === date;
                return (
                  <TouchableOpacity
                    key={date}
                    onPress={() => {
                      setSelectedDate(date);
                      setDateModalVisible(false);
                    }}
                    className={`flex-row justify-between items-center py-4 px-4 rounded-2xl mb-2 ${isActive ? 'bg-success/15' : 'bg-gray-50'}`}
                  >
                    <Text className={`font-body text-sm ${isActive ? 'text-success font-bold' : 'text-gray-700'}`}>{date}</Text>
                    {isActive && <Check size={16} color="#1DAA4B" strokeWidth={3} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Sleek Mock Time Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={timeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View className="bg-white rounded-t-[32px] p-6 max-h-[400px]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-black font-bold text-lg font-heading">Select Time</Text>
              <TouchableOpacity onPress={() => setTimeModalVisible(false)}>
                <X size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {timesList.map((time) => {
                const isActive = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    onPress={() => {
                      setSelectedTime(time);
                      setTimeModalVisible(false);
                    }}
                    className={`flex-row justify-between items-center py-4 px-4 rounded-2xl mb-2 ${isActive ? 'bg-success/15' : 'bg-gray-50'}`}
                  >
                    <Text className={`font-body text-sm ${isActive ? 'text-success font-bold' : 'text-gray-700'}`}>{time}</Text>
                    {isActive && <Check size={16} color="#1DAA4B" strokeWidth={3} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
}
