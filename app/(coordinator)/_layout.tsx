import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, Calendar, UploadCloud, User } from 'lucide-react-native';

export default function CoordinatorLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#D4860A', // Distinct Gold for Coordinator
        tabBarInactiveTintColor: '#888888',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F2F7F4',
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 12,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: 'Manage',
          tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Uploads',
          tabBarIcon: ({ color }) => <UploadCloud color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
