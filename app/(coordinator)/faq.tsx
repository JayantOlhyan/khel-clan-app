import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { 
  ChevronLeft, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Check, 
  MessageSquare, 
  Phone,
  Mail
} from 'lucide-react-native';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQScreen() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  // Support Form State
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formError, setFormError] = useState('');

  const faqs: FAQItem[] = [
    {
      question: 'When do I receive my hosting commission?',
      answer: 'Commissions are calculated automatically upon match completion and verification of the footage upload. Payouts are sent directly to your linked UPI address within 2-4 hours.'
    },
    {
      question: 'What should I do if a player gets injured?',
      answer: 'Ensure player safety first. Administer first aid using your KhelClan medical kit. For major injuries, pause the match immediately, call emergency services if required, and notify KhelClan Ops Hotline.'
    },
    {
      question: 'The footage upload is failing or stuck. Help!',
      answer: 'Check your internet connection speed. Ensure the file is MP4 or MOV and under 500MB. If it remains stuck, try clear caching the app or send the raw files directly to KhelClan Ops via Google Drive.'
    },
    {
      question: 'What if opposing players start arguing?',
      answer: 'Blow your whistle to pause play. Ask the team captains to step in and calm their players. Remind them of the KhelClan Code of Conduct. If any player remains toxic or violent, remove them from the match.'
    },
    {
      question: 'Can I reschedule a match due to heavy rain?',
      answer: 'Yes. If the turf coordinator declares the court unsafe due to rain or lightning, capture a quick picture/video of the court and submit a reschedule request via the KhelClan Ops Hotline.'
    }
  ];

  const handleFAQPress = (idx: number) => {
    setExpandedFAQ(expandedFAQ === idx ? null : idx);
  };

  const handleSupportSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      setFormError('Please fill in both the subject and description.');
      return;
    }
    
    setFormError('');
    setIsSubmitting(true);
    
    // Simulate API request to raise a support ticket
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTicketId(`KC-SUP-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubject('');
      setMessage('');
      
      // Auto reset success screen after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
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
          <HelpCircle color="#D4860A" size={16} className="mr-2" />
          <Text className="text-[#FFFFFF] font-heading font-black tracking-tight text-base uppercase">
            FAQs & Support
          </Text>
        </View>
        
        <View className="w-10 h-10" /> {/* Spacer */}
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* FAQs Section */}
        <Text className="text-gray-400 text-xs uppercase font-bold tracking-widest mt-6 mb-3.5 font-body">Frequently Asked Questions</Text>
        <View className="gap-3.5">
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFAQ === idx;
            return (
              <View 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleFAQPress(idx)}
                  className="p-4 flex-row justify-between items-center"
                >
                  <Text className="text-gray-200 text-sm font-bold font-body flex-1 pr-4">
                    {faq.question}
                  </Text>
                  {isExpanded ? (
                    <ChevronUp size={14} color="#888" />
                  ) : (
                    <ChevronDown size={14} color="#888" />
                  )}
                </TouchableOpacity>

                {isExpanded && (
                  <View className="px-4 pb-4 border-t border-white/5 pt-3 bg-[#121212]/30">
                    <Text className="text-gray-400 text-xs leading-5 font-body">
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Support System Section */}
        <Text className="text-gray-400 text-xs uppercase font-bold tracking-widest mt-8 mb-3.5 font-body">Contact Operations Helpdesk</Text>
        
        {submitSuccess ? (
          <View className="bg-success/5 border border-success/35 rounded-3xl p-6 items-center text-center py-8">
            <View className="bg-success/20 p-3 rounded-full border border-success/30 mb-3.5">
              <Check color="#1D9E75" size={24} strokeWidth={3} />
            </View>
            <Text className="text-success tracking-wider uppercase text-sm font-bold font-heading">Ticket Created!</Text>
            <Text className="text-gray-300 text-xs font-bold font-mono mt-1">{ticketId}</Text>
            <Text className="text-gray-500 text-xs text-center mt-2.5 px-4 leading-5 font-body">
              Your support query has been logged in our queue. KhelClan Ops will respond to you via phone or SMS within 30 minutes.
            </Text>
            
            <TouchableOpacity 
              onPress={() => setSubmitSuccess(false)}
              className="mt-5 bg-white/5 border border-white/10 px-5 py-2 rounded-xl"
            >
              <Text className="text-gray-300 text-xs uppercase tracking-wider font-bold font-body">Raise Another Query</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="bg-white/5 border border-white/10 rounded-3xl p-5">
            <Text className="text-gray-400 text-xs leading-5 mb-4 font-body">
              Have a question not listed above? Raise a support ticket directly to our KhelClan Operations team:
            </Text>

            {formError ? (
              <Text className="text-error text-xs mb-3 font-semibold font-body uppercase">{formError}</Text>
            ) : null}

            {/* Subject Input */}
            <Text className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1.5 font-body">Subject</Text>
            <TextInput
              placeholder="e.g. Payout Delay, Venue Dispute"
              placeholderTextColor="#555"
              value={subject}
              onChangeText={setSubject}
              className="bg-[#121212]/80 border border-white/5 rounded-xl p-3.5 text-sm text-[#FFFFFF] font-body mb-4 outline-none"
            />

            {/* Description Input */}
            <Text className="text-gray-500 text-xs uppercase font-bold tracking-widest mb-1.5 font-body">Description</Text>
            <TextInput
              placeholder="Describe the issue in detail..."
              placeholderTextColor="#555"
              multiline
              numberOfLines={6}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
              style={{ height: 100 }}
              className="bg-[#121212]/80 border border-white/5 rounded-xl p-3.5 text-sm text-[#FFFFFF] font-body mb-5 outline-none"
            />

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={isSubmitting}
              onPress={handleSupportSubmit}
              className="w-full bg-[#D4860A] py-4 rounded-full items-center justify-center flex-row shadow-lg shadow-[#D4860A]/20"
            >
              {isSubmitting ? (
                <ActivityIndicator color="#0A0A0A" size="small" />
              ) : (
                <>
                  <Send size={14} color="#0A0A0A" />
                  <Text className="text-[#0A0A0A] text-xs font-bold uppercase tracking-widest ml-2.5 font-body">
                    Submit Support Ticket
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Alternate Contact Options */}
        <Text className="text-gray-400 text-xs uppercase font-bold tracking-widest mt-8 mb-3 font-body">Emergency Contact Info</Text>
        <View className="bg-white/5 border border-white/10 rounded-3xl p-4 gap-3.5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MessageSquare size={14} color="#1D9E75" />
              <Text className="text-gray-300 text-sm font-semibold uppercase tracking-wide ml-3 font-body">WhatsApp Live Chat</Text>
            </View>
            <Text className="text-success text-sm font-bold font-mono">+91 98888 77777</Text>
          </View>

          <View className="flex-row items-center justify-between border-t border-white/5 pt-3.5">
            <View className="flex-row items-center">
              <Mail size={14} color="#D4860A" />
              <Text className="text-gray-300 text-sm font-semibold uppercase tracking-wide ml-3 font-body">Ops Email Support</Text>
            </View>
            <Text className="text-gold text-sm font-bold font-mono">ops@khelclan.com</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
