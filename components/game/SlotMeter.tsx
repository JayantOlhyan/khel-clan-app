import React from 'react';
import { View } from 'react-native';
import { Typography } from '../ui/Typography';

interface SlotMeterProps {
  slotsTotal: number;
  slotsFilled: number;
}

export function SlotMeter({ slotsTotal, slotsFilled }: SlotMeterProps) {
  const percentage = Math.min((slotsFilled / slotsTotal) * 100, 100);
  const isFull = slotsFilled >= slotsTotal;

  return (
    <View className="w-full mt-2 relative">
      <View className="flex-row justify-between mb-2">
        <Typography variant="caption" bold className={isFull ? 'text-error uppercase' : 'text-gray-400 uppercase'}>
          {isFull ? 'FULLY BOOKED' : `${slotsTotal - slotsFilled} SLOTS LEFT`}
        </Typography>
        <Typography variant="caption" className="text-gray-500">{slotsFilled}/{slotsTotal}</Typography>
      </View>
      <View className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <View 
          className={`h-full rounded-full ${isFull ? 'bg-error' : 'bg-primary'}`} 
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
}
