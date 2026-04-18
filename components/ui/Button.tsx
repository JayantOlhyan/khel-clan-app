import React from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost';
  title: string;
  loading?: boolean;
  className?: string;
}

export function Button({ variant = 'primary', title, loading, className, ...props }: ButtonProps) {
  const bgColors = {
    primary: 'bg-primary',
    gold: 'bg-gold',
    outline: 'border border-primary bg-transparent',
    ghost: 'bg-transparent',
  };

  const textColors = {
    primary: 'text-white',
    gold: 'text-black',
    outline: 'text-primary',
    ghost: 'text-primary',
  };

  return (
    <TouchableOpacity
      className={`rounded-xl py-3 px-6 flex-row items-center justify-center ${bgColors[variant]} ${className || ''}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#1D6A36' : '#FFFFFF'} />
      ) : (
        <Typography variant="body" bold className={textColors[variant]}>
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
}
