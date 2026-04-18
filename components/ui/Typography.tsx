import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'mono';
  bold?: boolean;
  className?: string;
}

export function Typography({ className, variant = 'body', bold, ...props }: TypographyProps) {
  const baseStyle = {
    h1: 'font-heading text-3xl text-black',
    h2: 'font-heading text-2xl text-black',
    h3: 'font-heading text-xl text-black',
    body: 'font-body text-base text-gray-600',
    caption: 'font-body text-sm text-gray-400',
    mono: 'font-mono text-base',
  }[variant];

  return (
    <Text 
      className={`${baseStyle} ${bold ? 'font-bold' : ''} ${className || ''}`} 
      {...props} 
    />
  );
}
