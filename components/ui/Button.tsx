import React from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableOpacityProps, Text } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost';
  title: string;
  loading?: boolean;
  className?: string;
}

export function Button({ variant = 'primary', title, loading, className, ...props }: ButtonProps) {
  const bgColors = {
    primary: 'bg-primary shadow-lg shadow-primary/20',
    gold: 'bg-[#D4860A] shadow-lg shadow-[#D4860A]/20',
    outline: 'border-2 border-primary bg-transparent',
    ghost: 'bg-transparent',
  };

  const textColors = {
    primary: 'text-[#FFFFFF]',
    gold: 'text-[#000000]',
    outline: 'text-success',
    ghost: 'text-success',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`rounded-xl py-4 px-6 flex-row items-center justify-center ${bgColors[variant]} ${className || ''}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#1DAA4B' : '#FFFFFF'} />
      ) : (
        <Text className={`${textColors[variant]} uppercase tracking-widest text-sm font-bold font-body`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
