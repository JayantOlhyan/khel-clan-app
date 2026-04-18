import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'mono';
  bold?: boolean;
  className?: string;
}

export function Typography({ className, variant = 'body', bold, ...props }: TypographyProps) {
  const baseStyle = {
    h1: 'font-heading text-4xl text-white uppercase tracking-tighter',
    h2: 'font-heading text-2xl text-white uppercase tracking-tight',
    h3: 'font-heading text-xl text-white',
    body: 'font-body text-base text-gray-400',
    caption: 'font-body text-sm text-gray-400',
    mono: 'font-mono text-base text-gray-400',
  }[variant];

  return (
    <Text 
      className={`${baseStyle} ${bold ? 'font-bold' : ''} ${className || ''}`} 
      {...props} 
    />
  );
}
