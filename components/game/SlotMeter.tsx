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
    <View className="w-full mt-2">
      <View className="flex-row justify-between mb-1">
        <Typography variant="caption" className={isFull ? 'text-success font-bold' : ''}>
          {isFull ? 'Game Full' : `${slotsFilled}/${slotsTotal} slots filled`}
        </Typography>
      </View>
      <View className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <View 
          className="h-full bg-success rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
}
